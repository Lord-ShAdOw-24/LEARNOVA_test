export type Level = "O-Level" | "A-Level" | "Concours";
export type ResourceKind = "questions" | "answers" | "paper" | "note" | "video" | "pack";
export type GceSession = "June" | "November";

export type Resource = {
  id: string;
  kind: ResourceKind;
  title: string;
  subtitle: string;
  level: Level;
  subject: string;
  year?: number;
  exam: "GCE" | "Concours";
  credits: number;
  free?: boolean;
  pages?: number;
  durationMin?: number;
  summary: string;
  body: string[];
  correction?: string[];
  packIds?: string[];
  pairId?: string;
  session?: GceSession;
  questionCount?: number;
};

export const OLEVEL_SUBJECTS = [
  "English Language",
  "French",
  "Mathematics",
  "Additional Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "Literature in English",
] as const;

export const ALEVEL_SUBJECTS = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Economics",
  "Literature in English",
  "Computer Science",
] as const;

export const CLASS_TRACKS = [
  "Form 4 Science",
  "Form 4 Arts",
  "Form 5 Science",
  "Form 5 Arts",
  "Lower Sixth Science",
  "Lower Sixth Arts",
  "Upper Sixth Science",
  "Upper Sixth Arts",
] as const;

export const CAMEROON_REGIONS = [
  "Northwest",
  "Southwest",
  "Littoral",
  "Centre",
  "West",
  "Adamawa",
] as const;

export const SCHOOLS = [
  "Baptist High School Buea",
  "Sasse College Buea",
  "CCC Bamenda",
  "Sacred Heart College Mankon",
  "GBHS Limbe",
  "PCC Buea",
  "GHS Bamenda",
  "Our Lady of Lourdes Bamenda",
  "GBHS Buea",
  "St Joseph's College Sasse",
];

function paperBody(subject: string, year: number, level: string): string[] {
  return [
    `LEARNOVA SPECIMEN — ${level} ${subject} ${year}`,
    "This is an original Learnova reconstructed specimen written to the current Anglophone GCE syllabus. It is not a scanned official script. Use it in-app only.",
    "Time allowed: 2 hours 30 minutes. Answer ALL questions in Section A and TWO questions from Section B.",
    "SECTION A — Compulsory",
    "1. Define the two key terms that open this topic and give one Cameroon-relevant example for each.",
    "2. A candidate scores 14, 18, 11, 16 and 21 in five tests. Calculate the mean and the range.",
    "3. Explain why this notion appears so frequently in recent GCE marking schemes.",
    "4. Sketch a labelled diagram that a Form 5 candidate should be able to reproduce from memory.",
    "5. Distinguish between two closely related ideas that examiners often mark as confused.",
    "SECTION B — Answer any two questions",
    "6. (a) State the principle. (b) Derive the working relation. (c) Apply it to a numerical case set in Cameroon. (d) Comment on one limitation.",
    "7. Write a structured essay (about 350 words) that a GCE examiner could mark using AO1 knowledge, AO2 application and AO3 evaluation.",
    "8. A practical / data-response item: interpret the table, calculate one quantity, and advise a school prefecture in Buea or Bamenda.",
  ];
}

function correctionBody(subject: string): string[] {
  return [
    `${subject} — marking scheme (Learnova)`,
    "Award method marks even when the final answer is wrong, provided the working is visible.",
    "1. Definition 2 marks + Cameroon example 2 marks.",
    "2. Mean = 16; range = 10. Working must be shown (3 + 2).",
    "3. Look for syllabus language, not textbook storytelling.",
    "4. Diagram: labels + correct orientation. No marks for an unlabelled sketch.",
    "5. Clear contrast. A list of similarities without difference scores 0.",
    "Section B: 20 marks each. Structure 4, knowledge 6, application 6, evaluation 4.",
  ];
}

const RAW_RESOURCES: Resource[] = [
  {
    id: "gce-ol-maths-2025-p2",
    kind: "paper",
    title: "Mathematics Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "Mathematics",
    year: 2025,
    exam: "GCE",
    credits: 35,
    pages: 8,
    summary: "Algebra, geometry and statistics written to the current O-Level syllabus.",
    body: paperBody("Mathematics", 2025, "O-Level"),
    correction: correctionBody("Mathematics"),
  },
  {
    id: "gce-ol-maths-2024-p2",
    kind: "paper",
    title: "Mathematics Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "Mathematics",
    year: 2024,
    exam: "GCE",
    credits: 30,
    pages: 8,
    summary: "Quadratic equations, circle theorems and cumulative frequency.",
    body: paperBody("Mathematics", 2024, "O-Level"),
    correction: correctionBody("Mathematics"),
  },
  {
    id: "gce-ol-physics-2025-p2",
    kind: "paper",
    title: "Physics Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "Physics",
    year: 2025,
    exam: "GCE",
    credits: 35,
    pages: 9,
    summary: "Mechanics, electricity and waves with Cameroon-set numericals.",
    body: paperBody("Physics", 2025, "O-Level"),
    correction: correctionBody("Physics"),
  },
  {
    id: "gce-ol-chem-2024-p2",
    kind: "paper",
    title: "Chemistry Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "Chemistry",
    year: 2024,
    exam: "GCE",
    credits: 30,
    pages: 8,
    summary: "Mole concept, acids and organic chemistry.",
    body: paperBody("Chemistry", 2024, "O-Level"),
    correction: correctionBody("Chemistry"),
  },
  {
    id: "gce-ol-bio-2025-p2",
    kind: "paper",
    title: "Biology Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "Biology",
    year: 2025,
    exam: "GCE",
    credits: 30,
    pages: 8,
    summary: "Nutrition, transport and ecology of the Cameroon forest zone.",
    body: paperBody("Biology", 2025, "O-Level"),
    correction: correctionBody("Biology"),
  },
  {
    id: "gce-ol-eng-2025-p2",
    kind: "paper",
    title: "English Language Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "English Language",
    year: 2025,
    exam: "GCE",
    credits: 25,
    pages: 6,
    summary: "Directed writing, summary and comprehension.",
    body: paperBody("English Language", 2025, "O-Level"),
    correction: correctionBody("English Language"),
  },
  {
    id: "gce-ol-hist-2024-p2",
    kind: "paper",
    title: "History Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "History",
    year: 2024,
    exam: "GCE",
    credits: 25,
    pages: 7,
    summary: "Reunification, Foumban and post-independence Cameroon.",
    body: paperBody("History", 2024, "O-Level"),
    correction: correctionBody("History"),
  },
  {
    id: "gce-ol-geo-2025-p2",
    kind: "paper",
    title: "Geography Paper 2",
    subtitle: "GCE O-Level specimen",
    level: "O-Level",
    subject: "Geography",
    year: 2025,
    exam: "GCE",
    credits: 25,
    pages: 7,
    summary: "Mount Cameroon, drainage and population of Douala.",
    body: paperBody("Geography", 2025, "O-Level"),
    correction: correctionBody("Geography"),
  },
  {
    id: "gce-al-maths-2025-p2",
    kind: "paper",
    title: "Mathematics Paper 2",
    subtitle: "GCE A-Level specimen",
    level: "A-Level",
    subject: "Mathematics",
    year: 2025,
    exam: "GCE",
    credits: 45,
    pages: 10,
    summary: "Calculus, vectors and probability for Upper Sixth.",
    body: paperBody("Mathematics", 2025, "A-Level"),
    correction: correctionBody("Mathematics"),
  },
  {
    id: "gce-al-phys-2024-p1",
    kind: "paper",
    title: "Physics Paper 1",
    subtitle: "GCE A-Level specimen",
    level: "A-Level",
    subject: "Physics",
    year: 2024,
    exam: "GCE",
    credits: 40,
    pages: 8,
    summary: "Fields, oscillations and modern physics.",
    body: paperBody("Physics", 2024, "A-Level"),
    correction: correctionBody("Physics"),
  },
  {
    id: "gce-al-chem-2025-p2",
    kind: "paper",
    title: "Chemistry Paper 2",
    subtitle: "GCE A-Level specimen",
    level: "A-Level",
    subject: "Chemistry",
    year: 2025,
    exam: "GCE",
    credits: 40,
    pages: 9,
    summary: "Equilibria, energetics and aromatic chemistry.",
    body: paperBody("Chemistry", 2025, "A-Level"),
    correction: correctionBody("Chemistry"),
  },
  {
    id: "gce-al-econ-2024-p2",
    kind: "paper",
    title: "Economics Paper 2",
    subtitle: "GCE A-Level specimen",
    level: "A-Level",
    subject: "Economics",
    year: 2024,
    exam: "GCE",
    credits: 35,
    pages: 8,
    summary: "National income, CEMAC policy and development.",
    body: paperBody("Economics", 2024, "A-Level"),
    correction: correctionBody("Economics"),
  },
  {
    id: "concours-ens-2024",
    kind: "paper",
    title: "ENS Bambili — General Paper",
    subtitle: "Concours specimen 2024",
    level: "Concours",
    subject: "General Paper",
    year: 2024,
    exam: "Concours",
    credits: 60,
    pages: 6,
    summary: "Logic, English and current affairs for ENS candidates.",
    body: paperBody("ENS General Paper", 2024, "Concours"),
    correction: correctionBody("ENS General Paper"),
  },
  {
    id: "concours-enam-2025",
    kind: "paper",
    title: "ENAM — Culture générale",
    subtitle: "Concours specimen 2025",
    level: "Concours",
    subject: "Culture générale",
    year: 2025,
    exam: "Concours",
    credits: 70,
    pages: 7,
    summary: "Public administration, institutions of Cameroon and essay.",
    body: paperBody("ENAM", 2025, "Concours"),
    correction: correctionBody("ENAM"),
  },
  {
    id: "concours-polytech-2024",
    kind: "paper",
    title: "Polytechnique Yaoundé — Maths",
    subtitle: "Concours specimen 2024",
    level: "Concours",
    subject: "Mathematics",
    year: 2024,
    exam: "Concours",
    credits: 80,
    pages: 8,
    summary: "Analysis and algebra at entrance-exam intensity.",
    body: paperBody("Polytechnique Mathematics", 2024, "Concours"),
    correction: correctionBody("Polytechnique Mathematics"),
  },
  {
    id: "note-ol-quad",
    kind: "note",
    title: "Quadratic equations, cleaned",
    subtitle: "O-Level Mathematics",
    level: "O-Level",
    subject: "Mathematics",
    exam: "GCE",
    credits: 0,
    free: true,
    pages: 5,
    summary: "Completing the square, formula and word problems.",
    body: [
      "A quadratic is ax² + bx + c = 0 with a ≠ 0.",
      "Factorise when you can see the pair. Otherwise use x = (-b ± √(b²-4ac)) / 2a.",
      "Discriminant D = b²-4ac. D>0 two real roots, D=0 repeated root, D<0 no real root (O-Level).",
      "Cameroon exam tip: always write 'for real roots, D ≥ 0' before solving inequalities.",
      "Worked example: x² - 5x + 6 = 0 → (x-2)(x-3)=0 → x=2 or x=3.",
    ],
  },
  {
    id: "note-ol-ohms",
    kind: "note",
    title: "Ohm’s law and circuits",
    subtitle: "O-Level Physics",
    level: "O-Level",
    subject: "Physics",
    exam: "GCE",
    credits: 0,
    free: true,
    pages: 4,
    summary: "V = IR, series and parallel, with typical GCE traps.",
    body: [
      "Ohm’s law: the current through a metallic conductor is proportional to the p.d. across it, at constant temperature.",
      "V = IR. In series, I is common and V adds. In parallel, V is common and I adds.",
      "Total resistance in series: R = R1+R2. In parallel: 1/R = 1/R1 + 1/R2.",
      "Trap: a lamp that 'blows' is an open circuit — current becomes zero in that branch.",
    ],
  },
  {
    id: "note-ol-reunification",
    kind: "note",
    title: "Reunification of Cameroon, 1961",
    subtitle: "O-Level History",
    level: "O-Level",
    subject: "History",
    exam: "GCE",
    credits: 15,
    pages: 6,
    summary: "Plebiscite, Foumban conference and the federal constitution.",
    body: [
      "On 11 February 1961 Southern Cameroons voted in a UN plebiscite: independence by joining the Republic of Cameroon, not Nigeria.",
      "The Foumban Constitutional Conference (July 1961) produced a federal constitution: West Cameroon and East Cameroon.",
      "Reunification was celebrated on 1 October 1961.",
      "Essay structure: background → plebiscite options → Foumban → federal institutions → significance.",
    ],
  },
  {
    id: "note-al-calculus",
    kind: "note",
    title: "Differentiation that scores",
    subtitle: "A-Level Mathematics",
    level: "A-Level",
    subject: "Mathematics",
    exam: "GCE",
    credits: 20,
    pages: 6,
    summary: "Chain, product, quotient and turning points.",
    body: [
      "If y = uv then dy/dx = u dv/dx + v du/dx.",
      "Chain rule: dy/dx = dy/du · du/dx.",
      "Turning points: dy/dx = 0. Second derivative: d²y/dx² > 0 min, < 0 max.",
      "Always state the nature of the turning point — A-Level schemes deduct for a bare x-value.",
    ],
  },
  {
    id: "note-al-cemac",
    kind: "note",
    title: "CEMAC and the CFA franc",
    subtitle: "A-Level Economics",
    level: "A-Level",
    subject: "Economics",
    exam: "GCE",
    credits: 15,
    pages: 5,
    summary: "Monetary union, BEAC and policy constraints.",
    body: [
      "CEMAC is the Economic and Monetary Community of Central Africa. Cameroon is a member.",
      "Monetary policy is run by BEAC. The CFA franc is pegged to the euro.",
      "Advantage: inflation discipline and regional trade. Cost: limited independent monetary response to a Cameroon-only shock.",
    ],
  },
  {
    id: "vid-mole",
    kind: "video",
    title: "The mole, in 8 minutes",
    subtitle: "O-Level Chemistry",
    level: "O-Level",
    subject: "Chemistry",
    exam: "GCE",
    credits: 0,
    free: true,
    durationMin: 8,
    summary: "Avogadro, molar mass and a typical titration number.",
    body: [
      "A short board lesson: 1 mole = 6.02 × 10²³ particles.",
      "n = m/M. For gases at rtp, n = V/24 dm³.",
      "Pause the lesson and try: how many moles in 10 g of CaCO3? (M=100 → 0.10 mol).",
    ],
  },
  {
    id: "vid-essay",
    kind: "video",
    title: "How a GCE essay is marked",
    subtitle: "O-Level English",
    level: "O-Level",
    subject: "English Language",
    exam: "GCE",
    credits: 10,
    durationMin: 12,
    summary: "Content, organisation, sentence variety and mechanical accuracy.",
    body: [
      "Examiners read for task fulfilment first, then language.",
      "A 450-word narrative that never answers the prompt scores low, however beautiful the vocabulary.",
      "Plan for 5 minutes. Write. Leave 4 minutes to correct agreement and tense.",
    ],
  },
  {
    id: "vid-waves",
    kind: "video",
    title: "Transverse vs longitudinal",
    subtitle: "O-Level Physics",
    level: "O-Level",
    subject: "Physics",
    exam: "GCE",
    credits: 0,
    free: true,
    durationMin: 7,
    summary: "Ripple tank, sound, and the v = fλ question they always set.",
    body: [
      "Transverse: oscillation perpendicular to energy transfer (water waves, light).",
      "Longitudinal: oscillation parallel (sound). Compressions and rarefactions.",
      "v = fλ. If f = 50 Hz and λ = 2 m, v = 100 m/s.",
    ],
  },
  {
    id: "vid-al-fields",
    kind: "video",
    title: "Gravitational fields intuition",
    subtitle: "A-Level Physics",
    level: "A-Level",
    subject: "Physics",
    exam: "GCE",
    credits: 15,
    durationMin: 14,
    summary: "g = GM/r² and why 'weightlessness' is not zero gravity.",
    body: [
      "Field strength g is force per unit mass. Near Earth it is about 9.81 N/kg.",
      "In orbit, astronauts are in free fall — g is not zero, the normal force is.",
    ],
  },
  {
    id: "pack-ol-maths",
    kind: "pack",
    title: "O-Level Mathematics pack",
    subtitle: "Papers + corrections + notes",
    level: "O-Level",
    subject: "Mathematics",
    exam: "GCE",
    credits: 90,
    summary: "Unlock both Mathematics papers and the quadratic notes together — cheaper than buying each.",
    body: ["Includes Mathematics 2024, Mathematics 2025 and the free quadratic note."],
    packIds: ["gce-ol-maths-2025-p2", "gce-ol-maths-2024-p2", "note-ol-quad"],
  },
  {
    id: "pack-ens",
    kind: "pack",
    title: "ENS Bambili pack",
    subtitle: "All ENS documents",
    level: "Concours",
    subject: "General Paper",
    exam: "Concours",
    credits: 110,
    summary: "Full ENS specimen plus correction at a pack discount.",
    body: ["ENS 2024 paper and marking scheme."],
    packIds: ["concours-ens-2024"],
  },
];

function expandGce(raw: Resource[]): Resource[] {
  const out: Resource[] = [];
  for (const r of raw) {
    if (r.exam === "GCE" && r.kind === "paper") {
      const session: GceSession = (r.year ?? 0) % 2 === 0 ? "November" : "June";
      out.push({
        ...r,
        kind: "questions",
        title: `${r.subject} — GCE Past Questions`,
        subtitle: `${r.level} · ${r.year} ${session}`,
        credits: 0,
        free: true,
        pairId: `${r.id}-ans`,
        session,
        questionCount: r.pages ?? 8,
        correction: undefined,
      });
      out.push({
        ...r,
        id: `${r.id}-ans`,
        kind: "answers",
        title: `${r.subject} — Answers to Past Questions`,
        subtitle: `${r.level} · ${r.year} marking scheme`,
        credits: Math.max(20, r.credits),
        free: false,
        pairId: r.id,
        session,
        body: r.correction ?? r.body,
        correction: undefined,
      });
    } else if (r.exam === "Concours" && r.kind === "paper") {
      out.push({
        ...r,
        subtitle: "Entrance Exam (Concours) Past Questions and Answers",
      });
    } else {
      out.push(r);
    }
  }
  return out;
}

export const RESOURCES: Resource[] = expandGce(RAW_RESOURCES);

export type ConcoursInfo = {
  id: string;
  name: string;
  school: string;
  deadline: string;
  centres: string[];
  documents: string[];
  fee: string;
  notes: string;
};

export const CONCOURS: ConcoursInfo[] = [
  {
    id: "ens-bambili",
    name: "ENS Bambili",
    school: "Higher Teacher Training College",
    deadline: "30 March 2027",
    centres: ["Bamenda", "Buea", "Yaoundé", "Douala"],
    documents: ["Certified GCE A-Level", "Birth certificate", "CNI", "4 passport photos"],
    fee: "15,000 FCFA",
    notes: "Written papers then oral. Science and Arts series are separate.",
  },
  {
    id: "enam",
    name: "ENAM",
    school: "National School of Administration and Magistracy",
    deadline: "15 April 2027",
    centres: ["Yaoundé", "Douala", "Buea"],
    documents: ["Degree or GCE A-Level depending on cycle", "CNI", "Medical certificate"],
    fee: "20,000 FCFA",
    notes: "Culture générale is decisive. Read the Constitution and recent finance laws.",
  },
  {
    id: "polytech-yde",
    name: "Polytechnique Yaoundé",
    school: "National Advanced School of Engineering",
    deadline: "20 April 2027",
    centres: ["Yaoundé", "Douala", "Bamenda"],
    documents: ["GCE A-Level Maths + Physics/Chemistry", "Birth certificate", "CNI"],
    fee: "25,000 FCFA",
    notes: "Mathematics paper is the filter. Speed and accuracy both count.",
  },
  {
    id: "fmsb",
    name: "FMSB / Medicine",
    school: "Faculty of Medicine and Biomedical Sciences",
    deadline: "10 May 2027",
    centres: ["Yaoundé", "Douala"],
    documents: ["GCE A-Level Biology, Chemistry, Physics or Maths", "CNI"],
    fee: "25,000 FCFA",
    notes: "Highly competitive. Biology and Chemistry carry the heaviest weight.",
  },
  {
    id: "iric",
    name: "IRIC",
    school: "International Relations Institute of Cameroon",
    deadline: "5 May 2027",
    centres: ["Yaoundé"],
    documents: ["Degree", "CNI", "Motivation letter"],
    fee: "20,000 FCFA",
    notes: "Languages plus international current affairs.",
  },
  {
    id: "htttc-kumba",
    name: "HTTTC Kumba",
    school: "Higher Technical Teacher Training College",
    deadline: "28 March 2027",
    centres: ["Kumba", "Buea", "Douala"],
    documents: ["GCE A-Level technical or general", "CNI"],
    fee: "15,000 FCFA",
    notes: "Technical series plus educational psychology.",
  },
];

export const GCE_RESULTS = [
  { centre: "Buea", year: 2025, passOl: "68%", passAl: "71%", note: "Provisional, GCE Board" },
  { centre: "Bamenda", year: 2025, passOl: "64%", passAl: "69%", note: "Provisional, GCE Board" },
  { centre: "Limbe", year: 2025, passOl: "70%", passAl: "73%", note: "Provisional, GCE Board" },
  { centre: "Kumba", year: 2025, passOl: "61%", passAl: "66%", note: "Provisional, GCE Board" },
];

export function resourceById(id: string) {
  return RESOURCES.find((r) => r.id === id);
}

export function resourcesByKind(kind: ResourceKind) {
  return RESOURCES.filter((r) => r.kind === kind);
}

export const GCE_YEARS = Array.from(
  new Set(RESOURCES.filter((r) => r.exam === "GCE" && r.year).map((r) => String(r.year))),
).sort((a, b) => Number(b) - Number(a));

export const GCE_SESSIONS: GceSession[] = ["June", "November"];

export function gceSubjects(level: "O-Level" | "A-Level") {
  const set = new Set(
    RESOURCES.filter((r) => r.exam === "GCE" && r.level === level).map((r) => r.subject),
  );
  return [...set];
}

export function explorerHits(f: {
  exam?: "GCE" | "Concours";
  level?: Level;
  subject?: string;
  year?: string;
  session?: GceSession;
  type?: ResourceKind;
}) {
  return RESOURCES.filter((r) => {
    if (f.exam && r.exam !== f.exam) return false;
    if (f.level && r.level !== f.level) return false;
    if (f.subject && r.subject !== f.subject) return false;
    if (f.type && r.kind !== f.type) return false;
    const dated = r.kind === "questions" || r.kind === "answers" || r.kind === "paper";
    if (dated && f.year && String(r.year ?? "") !== f.year) return false;
    if (dated && f.session && r.session && r.session !== f.session) return false;
    return true;
  });
}
