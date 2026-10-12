import { Button } from "@/components/ui/button";
import { Download, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";

interface HeaderProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
  isParsing: boolean;
  isDownloading: boolean;
  hasData: boolean;
}

export default function Header({
  fileInputRef,
  handleFileUpload,
  handleDownload,
  isParsing,
  isDownloading,
  hasData,
}: HeaderProps) {
  return (
    <header className="h-16 bg-background/60 backdrop-blur-xl border-b border-border flex items-center justify-between px-8 shrink-0 z-10 sticky top-0 transition-all duration-300">
      <div className="flex items-center gap-3">
        <Image
          src="/icon.svg"
          alt="Styles CV Builder"
          width={32}
          height={32}
          className="w-8 h-8 rounded-lg shadow-sm"
          priority
        />
        <h1 className="font-bold text-xl tracking-tight text-primary">
          Styles CV Builder
        </h1>
      </div>
      <div className="flex gap-3">
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />
        <Button
          variant="outline"
          className="border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          onClick={() => fileInputRef.current?.click()}
          disabled={isParsing || isDownloading}
        >
          {isParsing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
          ) : (
            <Upload className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
          {isParsing ? "Parsing AI..." : "Upload CV"}
        </Button>

        {hasData && (
          <Button
            onClick={handleDownload}
            disabled={isDownloading || isParsing}
            className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(100,50,255,0.4)] hover:shadow-[0_0_30px_rgba(100,50,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isDownloading ? "Generating..." : "Export PDF"}
          </Button>
        )}
      </div>
    </header>
  );
}
