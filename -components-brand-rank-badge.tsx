import type { Rank } from "./-lib-ranking.ts";
import { rankLabel } from "./-lib-ranking.ts";
import { cn } from "./-lib-utils.ts";

export function RankBadge({ rank, className }: { rank: Rank | string; className?: string }) {
  const gold = rank === "SSS" || rank === "SS";
  const navy = rank === "S" || rank === "A";
  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-semibold tabular-nums",
        gold && "bg-gold text-navy",
        navy && "bg-navy text-cream",
        rank === "B" && "bg-navy-mid text-cream",
        (rank === "C" || rank === "D") && "border border-border text-muted",
        rank === "NR" && "border border-dashed border-border text-muted",
        className,
      )}
    >
      {rankLabel(rank as Rank)}
    </span>
  );
}
