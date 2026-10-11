import { cn } from "./-lib-utils.ts";

export function Wordmark({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-xl" />
      <div className="leading-tight">
        <p className={cn("font-display text-lg tracking-tight", invert ? "text-cream" : "text-navy dark:text-cream")}>
          Learnova
        </p>
        <p className={cn("text-[11px]", invert ? "text-gold-soft" : "text-muted")}>Learn. Grow. Succeed.</p>
      </div>
    </div>
  );
}

export function Mark({ className }: { className?: string }) {
  return <img src="/favicon.svg" alt="" className={cn("h-8 w-8 rounded-lg", className)} />;
}
