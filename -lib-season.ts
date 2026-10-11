export type Season = "none" | "christmas" | "youth" | "independence";

export function seasonForDate(date = new Date()): Season {
  const m = date.getMonth();
  const d = date.getDate();
  if ((m === 11 && d >= 15) || (m === 0 && d <= 7)) return "christmas";
  if (m === 1 && d >= 8 && d <= 14) return "youth";
  if (m === 4 && d >= 18 && d <= 22) return "independence";
  return "none";
}

export function resolveSeason(preview: "auto" | Season): Season {
  if (preview === "auto") return seasonForDate();
  return preview;
}

export function seasonCopy(season: Season) {
  switch (season) {
    case "christmas":
      return "Christmas & New Year on Learnova";
    case "youth":
      return "Happy National Youth Day";
    case "independence":
      return "Happy National Day, Cameroon";
    default:
      return null;
  }
}
