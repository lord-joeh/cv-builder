"use client";

import { useState, useRef } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import { CVData } from "@/lib/schema";
import Header from "@/components/workspace/Header";
import EmptyStateHero from "@/components/workspace/EmptyStateHero";
import ParsingOverlay from "@/components/workspace/ParsingOverlay";
import { toast } from "sonner";

export default function WorkspacePage() {
  const [cvData, setCvData] = useState<Partial<CVData>>({});
  const [initialData, setInitialData] = useState<Partial<CVData>>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isEditingFromScratch, setIsEditingFromScratch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse CV");
      }

      const parsedData = await response.json();
      setInitialData(parsedData);
      setCvData(parsedData); // Update preview immediately
      toast.success("CV parsed successfully!");
    } catch (error: unknown) {
      console.error("Parse Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred while parsing the CV";
      toast.error(errorMessage);
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${cvData.personalInfo?.fullName?.replace(/\s+/g, "_") || "CV"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Download Error:", error);
      toast.error("Failed to download PDF. Check console for details.");
    } finally {
      setIsDownloading(false);
    }
  };

  const hasData = Object.keys(cvData).length > 0;

  return (
    <main className="h-screen w-screen bg-background flex flex-col overflow-hidden font-sans text-foreground">
      <Header
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        handleDownload={handleDownload}
        isParsing={isParsing}
        isDownloading={isDownloading}
        hasData={hasData}
      />

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden relative">
        {!hasData && !isParsing && !isEditingFromScratch ? (
          <EmptyStateHero
            onUploadClick={() => fileInputRef.current?.click()}
            onStartScratchClick={() => setIsEditingFromScratch(true)}
          />
        ) : (
          /* Split Pane Editor */
          <ResizablePanelGroup orientation="horizontal" className="h-full w-full animate-in fade-in duration-500">
            {/* Left Panel: Form */}
            <ResizablePanel
              defaultSize={40}
              minSize={30}
              className="bg-card/50 backdrop-blur-sm border-r border-border overflow-y-auto"
            >
              <div className="p-6">
                <CVForm onChange={setCvData} initialData={initialData} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border w-1 hover:w-2 hover:bg-primary/50 transition-all duration-300" />

            {/* Right Panel: Live Preview */}
            <ResizablePanel
              defaultSize={60}
              className="bg-background relative overflow-y-auto flex justify-center py-12 px-8"
            >
              {isParsing && <ParsingOverlay />}

              {/* The scale keeps the large A4 paper visible on smaller monitors */}
              <div className="transform origin-top scale-[0.85] xl:scale-100 pb-24 transition-all duration-500 hover:scale-[0.87] xl:hover:scale-[1.02]">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative ring-1 ring-gray-900/5">
                    <CVPreview data={cvData} />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </main>
  );
}
