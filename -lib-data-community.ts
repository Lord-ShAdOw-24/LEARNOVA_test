import type { Moderation } from "./-lib-identity.ts";

export type Teacher = {
  id: string;
  name: string;
  username: string;
  subjects: string[];
  city: string;
  region: string;
  rating: number;
  reviews: number;
  certified: boolean;
  partner?: boolean;
  bio: string;
  colour: string;
  reports?: number;
  moderation?: Moderation;
};

export type LiveClass = {
  id: string;
  teacherId: string;
  title: string;
  subject: string;
  level: string;
  schedule: string;
  price: number;
  seats: number;
  taken: number;
  blurb: string;
  moderation?: Moderation;
};

export type Room = {
  id: string;
  name: string;
  host: string;
  kind: "student" | "teacher" | "monthly" | "hackathon";
  difficulty: "low" | "medium" | "high";
  subject: string;
  players: number;
  max: number;
  reward?: string;
  starts: string;
};

export type Notice = {
  id: string;
  kind: "learnova" | "education";
  title: string;
  source: string;
  date: string;
  summary: string;
  body: string[];
};

export const TEACHERS: Teacher[] = [
  {
    id: "t-ngum",
    name: "Emmanuela Ngum",
    username: "EmmanuelaNgum",
    subjects: ["Mathematics", "Additional Mathematics"],
    city: "Buea",
    region: "Southwest",
    rating: 4.9,
    reviews: 128,
    certified: true,
    partner: true,
    reports: 0,
    moderation: "ok",
    bio: "Twelve years at Baptist High School. Upper Sixth calculus and GCE Paper 2 specialist.",
    colour: "#1D4ED8",
  },
  {
    id: "t-tanyi",
    name: "Klaus Tanyi",
    username: "KlausTanyi",
    subjects: ["Physics"],
    city: "Limbe",
    region: "Southwest",
    rating: 4.8,
    reviews: 96,
    certified: true,
    reports: 0,
    moderation: "ok",
    bio: "Former GCE examiner. Mechanics and electricity, with evening practical walkthroughs.",
    colour: "#0F766E",
  },
  {
    id: "t-fon",
    name: "Patience Fon",
    username: "PatienceFon",
    subjects: ["Chemistry", "Biology"],
    city: "Bamenda",
    region: "Northwest",
    rating: 4.7,
    reviews: 84,
    certified: true,
    reports: 1,
    moderation: "ok",
    bio: "Mole concept, organic and plant physiology. Certified Learnova teacher.",
    colour: "#9A3412",
  },
  {
    id: "t-acha",
    name: "Ngu Acha",
    username: "NguAcha",
    subjects: ["History", "English Language"],
    city: "Bamenda",
    region: "Northwest",
    rating: 4.6,
    reviews: 61,
    certified: false,
    reports: 14,
    moderation: "scan",
    bio: "Reunification essays and Paper 2 directed writing. Several off-platform contact reports are open.",
    colour: "#334155",
  },
  {
    id: "t-epie",
    name: "Sandra Epie",
    username: "SandraEpie",
    subjects: ["Economics", "Geography"],
    city: "Douala",
    region: "Littoral",
    rating: 4.8,
    reviews: 73,
    certified: true,
    reports: 0,
    moderation: "ok",
    bio: "CEMAC, development and mapwork for Form 5 and Lower Sixth.",
    colour: "#6B21A8",
  },
  {
    id: "t-leke",
    name: "Mirabel Leke",
    username: "MirabelLeke",
    subjects: ["Computer Science"],
    city: "Yaoundé",
    region: "Centre",
    rating: 4.5,
    reviews: 40,
    certified: false,
    reports: 6,
    moderation: "frozen",
    bio: "Python, algorithms and the GCE CS practical paper. Account frozen while Learnova reviews identity documents.",
    colour: "#1E3A8A",
  },
  {
    id: "t-ghost",
    name: "QuickCert Lessons",
    username: "QuickCert",
    subjects: ["Mathematics"],
    city: "Douala",
    region: "Littoral",
    rating: 1.8,
    reviews: 9,
    certified: false,
    reports: 31,
    moderation: "banned",
    bio: "Removed after confirmed off-platform fee collection and a fake certificate.",
    colour: "#7f1d1d",
  },
];

export const CLASSES: LiveClass[] = [
  {
    id: "c-maths-u6",
    teacherId: "t-ngum",
    title: "Upper Sixth Mathematics — Paper 2 clinic",
    subject: "Mathematics",
    level: "A-Level",
    schedule: "Mon / Wed 19:00 WAT",
    price: 8000,
    seats: 25,
    taken: 18,
    blurb: "Timed Paper 2 items, marking-scheme language, and weekly ranked drills.",
    moderation: "ok",
  },
  {
    id: "c-phys-f5",
    teacherId: "t-tanyi",
    title: "Form 5 Physics evening set",
    subject: "Physics",
    level: "O-Level",
    schedule: "Tue / Thu 18:30 WAT",
    price: 5000,
    seats: 30,
    taken: 22,
    blurb: "Electricity, waves and the practicals students lose marks on.",
    moderation: "ok",
  },
  {
    id: "c-chem-l6",
    teacherId: "t-fon",
    title: "Lower Sixth Chemistry organic",
    subject: "Chemistry",
    level: "A-Level",
    schedule: "Sat 10:00 WAT",
    price: 6500,
    seats: 20,
    taken: 11,
    blurb: "Mechanisms, nomenclature and typical A-Level structured questions.",
    moderation: "ok",
  },
  {
    id: "c-hist-ol",
    teacherId: "t-acha",
    title: "O-Level History — Cameroon paper",
    subject: "History",
    level: "O-Level",
    schedule: "Fri 17:00 WAT",
    price: 4000,
    seats: 28,
    taken: 9,
    blurb: "Plebiscite to 1972, with model essays marked live.",
    moderation: "scan",
  },
  {
    id: "c-econ-al",
    teacherId: "t-epie",
    title: "A-Level Economics data response",
    subject: "Economics",
    level: "A-Level",
    schedule: "Sun 16:00 WAT",
    price: 6000,
    seats: 22,
    taken: 14,
    blurb: "CEMAC, development and evaluation phrases that score.",
    moderation: "ok",
  },
  {
    id: "c-cs-ol",
    teacherId: "t-leke",
    title: "O-Level Computer Science practical",
    subject: "Computer Science",
    level: "O-Level",
    schedule: "Sat 15:00 WAT",
    price: 4500,
    seats: 18,
    taken: 7,
    blurb: "Flowcharts, Python traces and the practical exam layout.",
    moderation: "frozen",
  },
  {
    id: "c-banned",
    teacherId: "t-ghost",
    title: "Cheap A-Level Maths — off-platform group",
    subject: "Mathematics",
    level: "A-Level",
    schedule: "Removed",
    price: 2000,
    seats: 40,
    taken: 40,
    blurb: "This group collected fees outside Learnova and has been permanently closed.",
    moderation: "banned",
  },
];

export const ROOMS: Room[] = [
  {
    id: "r-maths-fast",
    name: "Buea Maths lightning",
    host: "Acha Ngu",
    kind: "student",
    difficulty: "high",
    subject: "Mathematics",
    players: 6,
    max: 12,
    starts: "Tonight 20:00",
  },
  {
    id: "r-phys-form5",
    name: "Form 5 Physics lock-in",
    host: "Nkeng Junior",
    kind: "student",
    difficulty: "medium",
    subject: "Physics",
    players: 8,
    max: 16,
    starts: "Tonight 19:30",
  },
  {
    id: "r-chem-tanyi",
    name: "Mr Tanyi — electricity cup",
    host: "KlausTanyi",
    kind: "teacher",
    difficulty: "high",
    subject: "Physics",
    players: 14,
    max: 30,
    reward: "25,000 FCFA top 3",
    starts: "Sat 11:00",
  },
  {
    id: "r-monthly-f5s",
    name: "Official monthly — Form 5 Science",
    host: "Learnova",
    kind: "monthly",
    difficulty: "high",
    subject: "Mixed",
    players: 240,
    max: 2000,
    starts: "This week, 18:00 daily",
  },
  {
    id: "r-hackathon",
    name: "National Hackathon 2026",
    host: "Learnova",
    kind: "hackathon",
    difficulty: "high",
    subject: "Mixed",
    players: 86,
    max: 400,
    reward: "School prizes, top 3",
    starts: "Qualified learners only",
  },
];

export const NOTICES: Notice[] = [
  {
    id: "n-gce-calendar",
    kind: "education",
    title: "GCE ordinary and advanced level calendar 2027 — draft window",
    source: "Cameroon GCE Board",
    date: "12 September 2026",
    summary: "Registration windows and the expected May/June sitting.",
    body: [
      "This Learnova copy is a study-platform notice, not a signed ministerial instrument.",
      "Ordinary Level practicals are expected from late April 2027. Written papers in May–June.",
      "Advanced Level follows the same season. Centres must confirm candidates by the Board deadline.",
      "Always verify against the signed circular on the Official Education Notices page.",
    ],
  },
  {
    id: "n-registration",
    kind: "education",
    title: "Candidate registration reminder — school officers",
    source: "Cameroon GCE Board",
    date: "2 September 2026",
    summary: "Names must match birth certificates exactly.",
    body: [
      "Wrong spellings on the entry form still generate certificate errors.",
      "School ID or a current-year fee receipt is required on Learnova for class leaderboards and the National Hackathon.",
    ],
  },
  {
    id: "n-product",
    kind: "learnova",
    title: "L-Credits packs and the October monthly competition",
    source: "Learnova",
    date: "18 September 2026",
    summary: "Monthly Form 4–Upper Sixth tracks open for registration at 250 FCFA.",
    body: [
      "Individual entry is 250 FCFA. School teams need at least 10 learners from the same school.",
      "Premium members receive their monthly L-Credit allocation on the 1st.",
      "L-Ai will never unlock a paid paper for you — buy with L-Credits or a pack.",
    ],
  },
  {
    id: "n-kyc",
    kind: "learnova",
    title: "Teacher KYC now required before the first paid group",
    source: "Learnova",
    date: "5 September 2026",
    summary: "CNI plus dual-photo check. Escrow still holds class fees for 30 days.",
    body: [
      "Standard teachers receive 85% after escrow. Certified teachers receive 90%.",
      "Students must accept the liability disclosure before paying.",
    ],
  },
];

export const ADS = [
  {
    id: "ad-mtn",
    title: "MTN MoMo — pay L-Credits in one tap",
    sponsor: "Approved partner",
    body: "Buy packs with MTN Mobile Money. Learnova never asks for your secret PIN inside a chat.",
  },
  {
    id: "ad-ens",
    title: "ENS Bambili intensive — October",
    sponsor: "Certified teacher group",
    body: "Evening General Paper with Emmanuela Ngum’s partner set. Escrowed on Learnova.",
  },
];

export const MONTHLY_TRACKS = [
  { id: "f4s", label: "Form 4 Science", registered: 180, fee: 250 },
  { id: "f4a", label: "Form 4 Arts", registered: 96, fee: 250 },
  { id: "f5s", label: "Form 5 Science", registered: 240, fee: 250 },
  { id: "f5a", label: "Form 5 Arts", registered: 132, fee: 250 },
  { id: "l6s", label: "Lower Sixth Science", registered: 150, fee: 250 },
  { id: "l6a", label: "Lower Sixth Arts", registered: 88, fee: 250 },
  { id: "u6s", label: "Upper Sixth Science", registered: 164, fee: 250 },
  { id: "u6a", label: "Upper Sixth Arts", registered: 102, fee: 250 },
];

export function teacherById(id: string) {
  return TEACHERS.find((t) => t.id === id);
}

export function classById(id: string) {
  return CLASSES.find((c) => c.id === id);
}
