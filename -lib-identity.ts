export type FlameTier = 0 | 1 | 2 | 3;
export type Moderation = "ok" | "scan" | "frozen" | "banned";

export const FLAME_DAYS = { spark: 7, flame: 21, inferno: 45 } as const;

export const SPEND_THRESHOLDS = [0, 50, 150, 400, 1000, 2500] as const;

export function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function lastNDays(n: number, from = new Date()): string[] {
  const out: string[] = [];
  const d = new Date(from);
  for (let i = 0; i < n; i++) {
    out.push(dateKey(d));
    d.setDate(d.getDate() - 1);
  }
  return out;
}

export function streakFromDates(dates: string[] | undefined): number {
  if (!Array.isArray(dates) || dates.length === 0) return 0;
  const set = new Set(dates);
  const d = new Date();
  if (!set.has(dateKey(d))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(dateKey(d))) return 0;
  }
  let n = 0;
  while (set.has(dateKey(d))) {
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function bumpActivity(dates: string[] | undefined): string[] {
  const t = dateKey();
  const list = Array.isArray(dates) ? dates : [];
  if (list[0] === t) return list;
  if (list.includes(t)) return list;
  return [t, ...list].slice(0, 120);
}

export function flameTier(streak: number): FlameTier {
  if (streak >= FLAME_DAYS.inferno) return 3;
  if (streak >= FLAME_DAYS.flame) return 2;
  if (streak >= FLAME_DAYS.spark) return 1;
  return 0;
}

export function flameMeta(streak: number) {
  const tier = flameTier(streak);
  if (tier === 3) return { tier, label: "Inferno", days: FLAME_DAYS.inferno, src: "/brand-badges-flame-lg.png", size: 28 };
  if (tier === 2) return { tier, label: "Flame", days: FLAME_DAYS.flame, src: "/brand-badges-flame-md.png", size: 22 };
  if (tier === 1) return { tier, label: "Spark", days: FLAME_DAYS.spark, src: "/brand-badges-flame-sm.png", size: 16 };
  return null;
}

export function spendLevel(spentCredits: number | undefined): number {
  const spent = typeof spentCredits === "number" ? spentCredits : 0;
  let level = 0;
  for (let i = 1; i < SPEND_THRESHOLDS.length; i++) {
    if (spent >= SPEND_THRESHOLDS[i]!) level = i;
  }
  return level;
}

export function nextSpendAt(spentCredits: number): number | null {
  const next = SPEND_THRESHOLDS.find((n) => n > spentCredits);
  return next ?? null;
}
