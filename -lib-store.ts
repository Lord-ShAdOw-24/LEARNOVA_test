import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bumpActivity, lastNDays } from "./-lib-identity.ts";
import type { Rank } from "./-lib-ranking.ts";
import type { Season } from "./-lib-season.ts";

export type Role = "student" | "teacher" | "parent";
export type ThemePref = "light" | "dark" | "system";
export type PremiumTier = "none" | "plus" | "pro" | "elite";

export type QuizAttempt = {
  id: string;
  category: string;
  subject: string;
  difficulty: string;
  level: string;
  percent: number;
  score: number;
  total: number;
  rank: Rank;
  at: string;
  aborted?: boolean;
};

export type Txn = {
  id: string;
  kind: "credit" | "debit";
  amount: number;
  label: string;
  method?: string;
  status: "success" | "pending" | "failed" | "refunded";
  at: string;
};

export type ChatMsg = { id: string; role: "user" | "assistant"; content: string; at: string };

export type Mistake = {
  id: string;
  questionId: string;
  prompt: string;
  explanation: string;
  subject: string;
  level: string;
  at: string;
  mastered: boolean;
};

export type LearnovaState = {
  onboarded: boolean;
  guest: boolean;
  role: Role;
  username: string;
  realName: string;
  school: string;
  classLevel: string;
  region: string;
  city: string;
  subjects: string[];
  kycStatus: "none" | "pending" | "verified";
  credits: number;
  spentCredits: number;
  premiumTier: PremiumTier;
  referralCode: string;
  theme: ThemePref;
  seasonalPreview: "auto" | Season;
  reducedMotion: boolean;
  language: "en" | "fr";
  unlocked: string[];
  enrolled: string[];
  saved: string[];
  downloads: string[];
  quizHistory: QuizAttempt[];
  bests: Record<string, { percent: number; rank: Rank }>;
  mistakes: Mistake[];
  txns: Txn[];
  notificationsRead: string[];
  lai: ChatMsg[];
  classChats: Record<string, { from: string; text: string; at: string }[]>;
  roomsJoined: string[];
  monthlyTrack?: string;
  hackathonPaid: boolean;
  tourDone: boolean;
  seenSplash: boolean;
  adsHidden: boolean;
  activityDates: string[];
  setProfile: (p: Partial<LearnovaState>) => void;
  touch: () => void;
  unlock: (id: string, cost: number, label: string) => boolean;
  spend: (amount: number, label: string, method?: string) => boolean;
  grant: (amount: number, label: string, method?: string) => void;
  recordQuiz: (a: QuizAttempt) => void;
  recordMistakes: (items: Mistake[]) => void;
  masterMistake: (id: string) => void;
  enroll: (id: string) => void;
  toggleSaved: (id: string) => void;
  markDownloaded: (id: string) => void;
  addLai: (m: ChatMsg) => void;
  markNotices: (id: string) => void;
  resetLocal: () => void;
};

const defaults: Omit<
  LearnovaState,
  | "setProfile"
  | "touch"
  | "unlock"
  | "spend"
  | "grant"
  | "recordQuiz"
  | "recordMistakes"
  | "masterMistake"
  | "enroll"
  | "toggleSaved"
  | "markDownloaded"
  | "addLai"
  | "markNotices"
  | "resetLocal"
> = {
  onboarded: false,
  guest: true,
  role: "student",
  username: "Guest",
  realName: "",
  school: "",
  classLevel: "Form 5 Science",
  region: "Southwest",
  city: "Buea",
  subjects: ["Mathematics", "Physics", "Chemistry"],
  kycStatus: "none",
  credits: 50,
  spentCredits: 0,
  premiumTier: "none",
  referralCode: "LN-GUEST",
  theme: "light",
  seasonalPreview: "auto",
  reducedMotion: false,
  language: "en",
  unlocked: [],
  enrolled: [],
  saved: [],
  downloads: [],
  quizHistory: [],
  bests: {},
  mistakes: [],
  txns: [],
  notificationsRead: [],
  lai: [],
  classChats: {},
  roomsJoined: [],
  monthlyTrack: undefined,
  hackathonPaid: false,
  tourDone: false,
  seenSplash: false,
  adsHidden: false,
  activityDates: lastNDays(8),
};

function debit(s: LearnovaState, amount: number, label: string, method?: string) {
  return {
    credits: s.credits - amount,
    spentCredits: s.spentCredits + amount,
    activityDates: bumpActivity(s.activityDates),
    txns: [
      {
        id: crypto.randomUUID(),
        kind: "debit" as const,
        amount,
        label,
        method,
        status: "success" as const,
        at: new Date().toISOString(),
      },
      ...s.txns,
    ],
  };
}

export const useLearnova = create<LearnovaState>()(
  persist(
    (set, get) => ({
      ...defaults,
      setProfile: (p) => set({ ...p }),
      touch: () => set({ activityDates: bumpActivity(get().activityDates) }),
      unlock: (id, cost, label) => {
        const s = get();
        if (s.unlocked.includes(id)) return true;
        if (cost > 0 && s.credits < cost) return false;
        set({
          unlocked: [...s.unlocked, id],
          ...(cost > 0 ? debit(s, cost, label) : { activityDates: bumpActivity(s.activityDates) }),
        });
        return true;
      },
      spend: (amount, label, method) => {
        const s = get();
        if (s.credits < amount) return false;
        set(debit(s, amount, label, method));
        return true;
      },
      grant: (amount, label, method) => {
        const s = get();
        set({
          credits: s.credits + amount,
          txns: [
            {
              id: crypto.randomUUID(),
              kind: "credit",
              amount,
              label,
              method,
              status: "success",
              at: new Date().toISOString(),
            },
            ...s.txns,
          ],
        });
      },
      recordQuiz: (a) => {
        const s = get();
        const prev = s.bests[a.category];
        const bests =
          !prev || a.percent > prev.percent
            ? { ...s.bests, [a.category]: { percent: a.percent, rank: a.rank } }
            : s.bests;
        set({
          quizHistory: [a, ...s.quizHistory].slice(0, 50),
          bests,
          activityDates: bumpActivity(s.activityDates),
        });
      },
      recordMistakes: (items) => {
        if (!items.length) return;
        const s = get();
        const existing = new Set(s.mistakes.filter((m) => !m.mastered).map((m) => m.questionId));
        const next = items.filter((m) => !existing.has(m.questionId));
        if (!next.length) return;
        set({ mistakes: [...next, ...s.mistakes].slice(0, 80) });
      },
      masterMistake: (id) => {
        set({
          mistakes: get().mistakes.map((m) => (m.id === id ? { ...m, mastered: true } : m)),
        });
      },
      enroll: (id) => {
        const s = get();
        if (s.enrolled.includes(id)) return;
        set({ enrolled: [...s.enrolled, id], activityDates: bumpActivity(s.activityDates) });
      },
      toggleSaved: (id) => {
        const s = get();
        set({
          saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
          activityDates: bumpActivity(s.activityDates),
        });
      },
      markDownloaded: (id) => {
        const s = get();
        if (s.downloads.includes(id)) return;
        set({ downloads: [...s.downloads, id], activityDates: bumpActivity(s.activityDates) });
      },
      addLai: (m) => set({ lai: [...get().lai, m].slice(-40) }),
      markNotices: (id) => {
        const s = get();
        if (s.notificationsRead.includes(id)) return;
        set({ notificationsRead: [...s.notificationsRead, id] });
      },
      resetLocal: () => set({ ...defaults, activityDates: lastNDays(1) }),
    }),
    {
      name: "learnova-v3",
      merge: (persisted, current) => {
        const p = persisted && typeof persisted === "object" ? (persisted as Partial<LearnovaState>) : {};
        return {
          ...current,
          ...p,
          activityDates:
            Array.isArray(p.activityDates) && p.activityDates.length ? p.activityDates : current.activityDates,
          mistakes: Array.isArray(p.mistakes) ? p.mistakes : current.mistakes,
          downloads: Array.isArray(p.downloads) ? p.downloads : current.downloads,
          spentCredits: typeof p.spentCredits === "number" ? p.spentCredits : current.spentCredits,
          credits: typeof p.credits === "number" ? p.credits : current.credits,
          enrolled: Array.isArray(p.enrolled) ? p.enrolled : current.enrolled,
          unlocked: Array.isArray(p.unlocked) ? p.unlocked : current.unlocked,
          saved: Array.isArray(p.saved) ? p.saved : current.saved,
        };
      },
    },
  ),
);

export const PREMIUM_PLANS: {
  id: PremiumTier;
  name: string;
  price: number;
  credits: number;
  devices: number;
  blurb: string;
}[] = [
  { id: "plus", name: "Plus", price: 2500, credits: 80, devices: 2, blurb: "Ad-free study and a monthly L-Credit stipend." },
  { id: "pro", name: "Pro", price: 5000, credits: 200, devices: 3, blurb: "Serious revision: packs, quizzes, two extra sessions." },
  { id: "elite", name: "Elite", price: 9000, credits: 500, devices: 5, blurb: "Maximum devices and the largest monthly credit grant." },
];

export const CREDIT_PACKS = [
  { id: "c50", credits: 50, price: 1500 },
  { id: "c150", credits: 150, price: 4000 },
  { id: "c400", credits: 400, price: 9000 },
];
