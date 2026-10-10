import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
// Removed static import of pdf-parse
import { cvSchema } from "@/lib/schema";

import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Basic IP extraction (works with standard reverse proxies)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const limitResult = rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

    if (!limitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": limitResult.remaining.toString(),
            "X-RateLimit-Reset": limitResult.resetAt.toString()
          }
        }
      );
    }
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Add polyfills for pdfjs-dist in Next.js Server environments
    if (typeof globalThis.DOMMatrix === "undefined") {
      Object.assign(globalThis, { DOMMatrix: class DOMMatrix {} });
    }
    if (typeof globalThis.ImageData === "undefined") {
      Object.assign(globalThis, { ImageData: class ImageData {} });
    }
    if (typeof globalThis.Path2D === "undefined") {
      Object.assign(globalThis, { Path2D: class Path2D {} });
    }

    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    const textResult = await parser.getText();
    const text = textResult.text;

    if (!text || text.trim() === "") {
      return NextResponse.json(
        {
          error:
            "Could not extract text from the PDF. It may be empty or an image-based PDF without OCR.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const gemini_model = process.env.GEMINI_MODEL;
    if (!apiKey || !gemini_model) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY or GEMINI_MODEL is not set in environment variables.",
        },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are an expert CV parser. I will provide you with the extracted text from a user's CV (PDF).
      Your task is to extract the relevant information and structure it strictly into the provided JSON format.

      The required JSON format is based on this TypeScript schema:
      {
        personalInfo: {
          fullName: string,
          role: string,
          location: string,
          phone: string,
          email: string,
          github: string,
          linkedin: string,
          portfolio: string,
          summary: string,
        },
        technicalSkills: {
          languages: string,
          frameworks: string,
          databases: string,
          devops: string,
        },
        experience: [{ company: string, role: string, duration: string, description: string }],
        projects: [{ name: string, tagline: string, technologies: string, date: string, description: string }],
        education: [{ institution: string, degree: string, duration: string, location: string, description: string }],
        sectionOrder: ["summary", "technicalSkills", "experience", "projects", "education"] // Rearrange this array based on the logical flow of the CV
      }

      Return ONLY valid JSON that conforms to the schema. Do not include markdown code blocks (like \`\`\`json) or any other text.
      If a field cannot be found, leave it as an empty string ("") or an empty array ([]).
      Combine descriptions into bullet points separated by newlines where appropriate. Do NOT include actual bullet characters (like '-', '*', or '•') at the start of the lines, just the raw text.

      CV Text:
      """
      ${text}
      """
    `;

    const response = await ai.models.generateContent({
      model: gemini_model!,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonString = response.text;

    // Clean up if it returned markdown
    if (jsonString && jsonString.startsWith("\`\`\`json")) {
      jsonString = jsonString
        .replace(/^\`\`\`json\n/, "")
        .replace(/\n\`\`\`$/, "");
    }

    if (!jsonString) {
      throw new Error("Failed to generate JSON from Gemini");
    }

    const parsedData = JSON.parse(jsonString);

    // Optional: Validate with Zod before returning (strips extra fields)
    const validatedData = cvSchema.parse(parsedData);

    return NextResponse.json(validatedData);
  } catch (error: unknown) {
    console.error("PDF Parsing Error:", error);
    const errorMessage = "An unexpected error occurred while processing the CV. Please try again.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
