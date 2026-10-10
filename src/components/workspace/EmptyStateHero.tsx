import { Upload } from "lucide-react";

interface EmptyStateHeroProps {
  onUploadClick: () => void;
  onStartScratchClick: () => void;
}

export default function EmptyStateHero({
  onUploadClick,
  onStartScratchClick,
}: EmptyStateHeroProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-sm">
          ✨ AI Powered CV Builder
        </div>
        <h2 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-foreground">
          Craft your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Premium CV</span> in seconds.
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Upload your existing, unformatted resume. Our state-of-the-art AI will instantly restructure, enhance, and generate a breathtaking professional PDF tailored for top tech companies.
        </p>

        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            onClick={onUploadClick}
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-white shadow-[0_0_40px_rgba(100,50,255,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(100,50,255,0.7)]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="flex items-center gap-2 text-lg">
              <Upload className="h-5 w-5" />
              <span>Upload existing CV</span>
            </span>
          </button>

          <button
            onClick={onStartScratchClick}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Or start building from scratch &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
