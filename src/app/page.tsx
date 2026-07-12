"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import { CVData } from "@/lib/schema";

export default function WorkspacePage() {
  const [cvData, setCvData] = useState<Partial<CVData>>({});
  const [isDownloading, setIsDownloading] = useState(false);

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
    } catch (error) {
      console.error("Download Error:", error);
      alert("Failed to download PDF. Check console for details.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="h-screen w-screen bg-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0">
        <h1 className="font-semibold text-lg tracking-tight">
          Styles CV Builder
        </h1>
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {isDownloading ? "Generating..." : "Download PDF"}
        </Button>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
          {/* Left Panel: Form */}
          <ResizablePanel
            defaultSize={40}
            minSize={30}
            className="bg-white overflow-y-auto"
          >
            <CVForm onChange={setCvData} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel: Live Preview */}
          <ResizablePanel
            defaultSize={60}
            className="bg-slate-200 overflow-y-auto flex justify-center py-12 px-8"
          >
            {/* The scale keeps the large A4 paper visible on smaller monitors */}
            <div className="transform origin-top scale-[0.85] xl:scale-100 pb-24">
              <CVPreview data={cvData} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
