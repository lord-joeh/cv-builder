import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { CVData } from "@/lib/schema";

export async function POST(req: NextRequest) {
  try {
    const data: CVData = await req.json();

    // 1. Generate the raw HTML string using the parsed data
    const htmlContent = generateHTML(data);

    // 2. Launch headless Puppeteer browser
    // Note: --no-sandbox is often required for VPS/Docker environments
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    // 3. Set the content and wait for Tailwind CDN to load
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    // 4. Emulate print media style for exact color rendering
    await page.emulateMediaType("print");

    // 5. Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0.5in", bottom: "0.5in", left: "0.5in", right: "0.5in" },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>", // Empty header
      // Automatically generates "Page X of Y" matching the template style
      footerTemplate: `
        <div style="width: 100%; font-size: 10px; padding-right: 0.5in; text-align: right; color: #374151; font-family: sans-serif;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();

    // 6. Return the PDF as a downloadable binary stream
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${data.personalInfo.fullName.replace(/\s+/g, "_")}_CV.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}

/**
 * Constructs the standalone HTML document injected with Tailwind CSS
 * and formatted to match the lord_styles_cv.pdf template exactly.
 */
function generateHTML(data: CVData): string {
  // Helper to split text area descriptions into bullet points
  const toBullets = (text: string) => {
    if (!text) return "";
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => `<li>${line.trim()}</li>`)
      .join("");
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.fullName} - CV</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .page-break-avoid { page-break-inside: avoid; break-inside: avoid; }
        .section-header { font-size: 0.875rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #111827; border-bottom: 1px solid #9CA3AF; padding-bottom: 0.125rem; margin-bottom: 0.75rem; }
      </style>
    </head>
    <body class="bg-white text-gray-800 text-sm leading-relaxed max-w-4xl mx-auto">

      <!-- HEADER -->
      <header class="text-center mb-5">
        <h1 class="text-2xl font-bold tracking-wide uppercase text-gray-900">${data.personalInfo.fullName}</h1>
        <p class="text-xs font-semibold tracking-widest text-gray-600 uppercase mt-0.5">${data.personalInfo.role}</p>
        <div class="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1.5">
          <span>${data.personalInfo.location}</span>
          <span>&bull;</span>
          <span>${data.personalInfo.phone}</span>
          <span>&bull;</span>
          <span>${data.personalInfo.email}</span>
          ${data.personalInfo.github ? `<span>&bull;</span><a href="https://${data.personalInfo.github}" class="text-gray-600">${data.personalInfo.github}</a>` : ""}
          ${data.personalInfo.linkedin ? `<span>&bull;</span><a href="https://${data.personalInfo.linkedin}" class="text-gray-600">${data.personalInfo.linkedin}</a>` : ""}
          ${data.personalInfo.portfolio ? `<span>&bull;</span><a href="https://${data.personalInfo.portfolio}" class="text-gray-600">${data.personalInfo.portfolio}</a>` : ""}

        </div>
      </header>

      <!-- SUMMARY -->
      ${data.personalInfo.summary ? `<p class="text-justify mb-5 text-gray-700 text-[13px]">${data.personalInfo.summary}</p>` : ""}

      <!-- TECHNICAL SKILLS -->
      <section class="mb-5 page-break-avoid">
        <h2 class="section-header">Technical Skills</h2>
        <div class="space-y-0.5 text-[13px]">
          ${data.technicalSkills.languages ? `<p><strong class="font-semibold text-gray-900">Languages:</strong> ${data.technicalSkills.languages}</p>` : ""}
          ${data.technicalSkills.frameworks ? `<p><strong class="font-semibold text-gray-900">Frameworks:</strong> ${data.technicalSkills.frameworks}</p>` : ""}
          ${data.technicalSkills.databases ? `<p><strong class="font-semibold text-gray-900">Databases & ORMs:</strong> ${data.technicalSkills.databases}</p>` : ""}
          ${data.technicalSkills.devops ? `<p><strong class="font-semibold text-gray-900">DevOps & Infra:</strong> ${data.technicalSkills.devops}</p>` : ""}
        </div>
      </section>

      <!-- PROFESSIONAL EXPERIENCE -->
      ${
        data.experience.length > 0
          ? `
      <section class="mb-5">
        <h2 class="section-header">Professional Experience</h2>
        <div class="space-y-4">
          ${data.experience
            .map(
              (exp) => `
            <div class="page-break-avoid">
              <div class="flex justify-between font-semibold text-gray-900 text-[13.5px]">
                <span>${exp.company}</span>
                <span>${exp.duration}</span>
              </div>
              <div class="italic text-gray-700 text-[13px] mb-1">${exp.role}</div>
              <ul class="list-disc pl-5 space-y-0.5 text-gray-700 text-[13px]">
                ${toBullets(exp.description)}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>
      `
          : ""
      }

      <!-- KEY ENGINEERING PROJECTS -->
      ${
        data.projects.length > 0
          ? `
      <section class="mb-5">
        <h2 class="section-header">Key Engineering Projects</h2>
        <div class="space-y-4">
          ${data.projects
            .map(
              (proj) => `
            <div class="page-break-avoid">
              <div class="flex justify-between font-semibold text-gray-900 text-[13.5px]">
                <span>${proj.name} - <span class="font-normal italic">${proj.tagline}</span></span>
                <span>${proj.date}</span>
              </div>
              <div class="text-gray-700 text-[13px] mb-1 font-medium">Technologies: ${proj.technologies}</div>
              <ul class="list-disc pl-5 space-y-0.5 text-gray-700 text-[13px]">
                ${toBullets(proj.description)}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>
      `
          : ""
      }

      <!-- EDUCATION -->
      ${
        data.education.length > 0
          ? `
      <section class="mb-5 page-break-avoid">
        <h2 class="section-header">Education</h2>
        <div class="space-y-3">
          ${data.education
            .map(
              (edu) => `
            <div>
              <div class="flex justify-between font-semibold text-gray-900 text-[13.5px]">
                <span>${edu.institution}</span>
                <span>${edu.location}</span>
              </div>
              <div class="flex justify-between text-gray-700 text-[13px] mb-1">
                <span>${edu.degree}</span>
                <span>${edu.duration}</span>
              </div>
              <ul class="list-disc pl-5 space-y-0.5 text-gray-700 text-[13px]">
                ${toBullets(edu.description)}
              </ul>
            </div>
          `,
            )
            .join("")}
        </div>
      </section>
      `
          : ""
      }

    </body>
    </html>
  `;
}
