export const RANK_ORDER = ["NR", "D", "C", "B", "A", "S", "SS", "SSS"] as const;
export type Rank = (typeof RANK_ORDER)[number];

/** Demo pedagogical calibration. Official thresholds remain with the academic team. */
export function rankFromPercent(percent: number): Rank {
  if (percent < 20) return "NR";
  if (percent < 40) return "D";
  if (percent < 55) return "C";
  if (percent < 70) return "B";
  if (percent < 80) return "A";
  if (percent < 90) return "S";
  if (percent < 95) return "SS";
  return "SSS";
}

export function rankLabel(rank: Rank) {
  if (rank === "NR") return "Not ranked";
  return rank;
}

export function rankTone(rank: Rank) {
  switch (rank) {
    case "SSS":
    case "SS":
      return "gold";
    case "S":
    case "A":
      return "navy";
    case "B":
    case "C":
      return "muted";
    default:
      return "warn";
  }
}
