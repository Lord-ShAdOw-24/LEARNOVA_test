import { useEffect, useState } from "react";
import { cn } from "./-lib-utils.ts";
import { resolveSeason } from "./-lib-season.ts";
import { useLearnova } from "./-lib-store.ts";

export function NovaFace({ className, santa }: { className?: string; santa?: boolean }) {
  return (
    <div className={cn("relative", className)}>
      <img src="/brand-nova.png" alt="Nova" className="nova-bob h-full w-full object-contain" />
      {santa ? (
        <span className="absolute -top-1 right-2 rotate-12 text-[10px] font-semibold text-danger">hat</span>
      ) : null}
    </div>
  );
}

export function NovaTip({ text, className }: { text: string; className?: string }) {
  const preview = useLearnova((s) => s.seasonalPreview);
  const season = resolveSeason(preview);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
    const t = window.setTimeout(() => setOpen(false), 7000);
    return () => window.clearTimeout(t);
  }, [text]);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={cn("flex items-end gap-2 text-left", className)}
      aria-label="Nova, Learnova guide"
    >
      <div className="relative h-14 w-14 shrink-0">
        <img src="/brand-nova.png" alt="" className="nova-bob h-14 w-14 object-contain" />
        {season === "christmas" ? (
          <span className="absolute -top-0.5 left-1 h-4 w-6 rounded-t-full bg-danger" aria-hidden />
        ) : null}
      </div>
      {open ? (
        <span className="glass mb-1 max-w-[240px] rounded-[18px] rounded-bl-md px-3 py-2 text-xs leading-5 text-foreground">
          {text}
        </span>
      ) : null}
    </button>
  );
}
