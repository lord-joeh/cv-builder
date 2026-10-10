import { Loader2 } from "lucide-react";

export default function ParsingOverlay() {
  return (
    <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="relative w-64 h-96 border-2 border-primary/30 rounded-lg overflow-hidden bg-card shadow-[0_0_30px_rgba(100,50,255,0.2)]">
        <div className="absolute inset-0 bg-primary/20 animate-scan" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-primary font-medium tracking-widest uppercase text-sm animate-pulse">
            Extracting Data...
          </p>
        </div>
      </div>
    </div>
  );
}
