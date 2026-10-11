import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Compass, Lock } from "lucide-react";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import {
  explorerHits,
  GCE_SESSIONS,
  GCE_YEARS,
  gceSubjects,
  type GceSession,
  type Level,
  type ResourceKind,
} from "./-lib-data-catalog.ts";
import { useLearnova } from "./-lib-store.ts";
import { cn } from "./-lib-utils.ts";

type Exam = "GCE" | "Concours";
type DocType = "questions" | "answers" | "note" | "video";

type ExploreSearch = {
  exam?: Exam;
  level?: "O-Level" | "A-Level";
  subject?: string;
  year?: string;
  session?: GceSession;
  type?: DocType;
};

export const Route = createFileRoute("/app/explore")({
  validateSearch: (raw: Record<string, unknown>): ExploreSearch => {
    const s: ExploreSearch = {};
    if (raw.exam === "GCE" || raw.exam === "Concours") s.exam = raw.exam;
    if (raw.level === "O-Level" || raw.level === "A-Level") s.level = raw.level;
    if (typeof raw.subject === "string") s.subject = raw.subject;
    if (typeof raw.year === "string") s.year = raw.year;
    if (raw.session === "June" || raw.session === "November") s.session = raw.session;
    if (raw.type === "questions" || raw.type === "answers" || raw.type === "note" || raw.type === "video") {
      s.type = raw.type;
    }
    return s;
  },
  component: Explorer,
});

const TYPES: { id: DocType; title: string; body: string }[] = [
  { id: "questions", title: "GCE Past Questions", body: "Questions-only PDF. Often free to open in-app." },
  { id: "answers", title: "Answers to Past Questions", body: "Separate memo / marking scheme. Own access rules." },
  { id: "note", title: "Notes", body: "Syllabus notes written for Anglophone classrooms." },
  { id: "video", title: "Lessons", body: "Short board lessons. Play inside Learnova." },
];

function Choice({
  title,
  body,
  badge,
  locked,
  onClick,
}: {
  title: string;
  body: string;
  badge?: string;
  locked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-20 w-full items-center gap-3 rounded-[22px] border border-border bg-card p-4 text-left",
        locked && "opacity-90",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="font-display text-xl leading-tight">{title}</p>
        <p className="mt-1 text-sm text-muted">{body}</p>
      </div>
      {badge ? (
        <span className="rounded-full bg-gold px-2 py-1 text-[10px] font-semibold tracking-wide text-navy uppercase">
          {badge}
        </span>
      ) : locked ? (
        <Lock className="size-4 text-muted" />
      ) : (
        <ChevronRight className="size-4 text-muted" />
      )}
    </button>
  );
}

function Explorer() {
  const nav = useNavigate();
  const f = Route.useSearch();
  const unlocked = useLearnova((s) => s.unlocked);

  function go(next: ExploreSearch) {
    nav({ to: "/app/explore", search: next });
  }

  const crumbs: { label: string; search: ExploreSearch }[] = [{ label: "Explorer", search: {} }];
  if (f.exam) crumbs.push({ label: f.exam === "Concours" ? "Entrance exams" : "GCE", search: { exam: f.exam } });
  if (f.level) crumbs.push({ label: f.level, search: { exam: "GCE", level: f.level } });
  if (f.subject) crumbs.push({ label: f.subject, search: { exam: "GCE", level: f.level, subject: f.subject } });
  if (f.year) {
    crumbs.push({
      label: f.year,
      search: { exam: "GCE", level: f.level, subject: f.subject, year: f.year },
    });
  }
  if (f.session) {
    crumbs.push({
      label: f.session,
      search: { exam: "GCE", level: f.level, subject: f.subject, year: f.year, session: f.session },
    });
  }
  if (f.type) crumbs.push({ label: TYPES.find((t) => t.id === f.type)?.title ?? f.type, search: { ...f } });

  if (f.exam === "Concours") {
    return (
      <Page kicker="Explorer" title="Competitive Entrance Examinations">
        <Crumbs crumbs={crumbs} onPick={go} />
        <Card className="mt-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">Pending</p>
          <h2 className="mt-1 font-display text-2xl">Coming soon</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            University, professional, medical, teaching and engineering entrance exams will live here. For concours, questions
            and answers stay in one PDF — unlike GCE, which keeps them separate.
          </p>
          <p className="mt-3 text-sm">ENS · ENAM · Polytechnique · FMSB · IRIC · HTTTC</p>
          <Button className="mt-4" variant="outline" onClick={() => go({})}>
            Back to Explorer
          </Button>
        </Card>
      </Page>
    );
  }

  if (!f.exam) {
    return (
      <Page kicker="Explorer" title="What are you looking for?">
        <p className="mb-4 text-sm text-muted">Two choices. Then only the next useful filters.</p>
        <div className="space-y-3">
          <Choice
            title="GCE"
            body="O Level and A Level. Past questions and answers as two separate files."
            onClick={() => go({ exam: "GCE" })}
          />
          <Choice
            title="Competitive Entrance Examinations (Concours)"
            body="University and professional entrance exams."
            badge="Pending"
            locked
            onClick={() => go({ exam: "Concours" })}
          />
        </div>
      </Page>
    );
  }

  if (!f.level) {
    return (
      <Page kicker="GCE" title="Choose a level">
        <Crumbs crumbs={crumbs} onPick={go} />
        <div className="mt-3 space-y-3">
          <Choice title="O Level" body="Form 4 and Form 5 papers, notes and lessons." onClick={() => go({ exam: "GCE", level: "O-Level" })} />
          <Choice title="A Level" body="Lower and Upper Sixth papers, notes and lessons." onClick={() => go({ exam: "GCE", level: "A-Level" })} />
        </div>
      </Page>
    );
  }

  if (!f.subject) {
    const subjects = gceSubjects(f.level);
    return (
      <Page kicker={f.level} title="Subject">
        <Crumbs crumbs={crumbs} onPick={go} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          {subjects.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => go({ exam: "GCE", level: f.level, subject: sub })}
              className="min-h-16 rounded-[20px] border border-border bg-card px-3 py-3 text-left text-sm font-medium"
            >
              {sub}
            </button>
          ))}
        </div>
      </Page>
    );
  }

  if (!f.year) {
    return (
      <Page kicker={f.subject} title="Year">
        <Crumbs crumbs={crumbs} onPick={go} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          {GCE_YEARS.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => go({ exam: "GCE", level: f.level, subject: f.subject, year: y })}
              className="h-14 rounded-[20px] border border-border bg-card font-display text-xl"
            >
              {y}
            </button>
          ))}
        </div>
      </Page>
    );
  }

  if (!f.session) {
    return (
      <Page kicker={f.year} title="Session">
        <Crumbs crumbs={crumbs} onPick={go} />
        <div className="mt-3 space-y-3">
          {GCE_SESSIONS.map((session) => (
            <Choice
              key={session}
              title={session}
              body={session === "June" ? "Main sitting." : "November resit / second sitting."}
              onClick={() =>
                go({ exam: "GCE", level: f.level, subject: f.subject, year: f.year, session })
              }
            />
          ))}
        </div>
      </Page>
    );
  }

  if (!f.type) {
    return (
      <Page kicker={`${f.session} ${f.year}`} title="Document type">
        <Crumbs crumbs={crumbs} onPick={go} />
        <div className="mt-3 space-y-3">
          {TYPES.map((t) => (
            <Choice
              key={t.id}
              title={t.title}
              body={t.body}
              onClick={() =>
                go({
                  exam: "GCE",
                  level: f.level,
                  subject: f.subject,
                  year: f.year,
                  session: f.session,
                  type: t.id,
                })
              }
            />
          ))}
        </div>
      </Page>
    );
  }

  const hits = explorerHits({
    exam: "GCE",
    level: f.level as Level,
    subject: f.subject,
    year: f.year,
    session: f.session,
    type: f.type as ResourceKind,
  });

  return (
    <Page kicker="Results" title={`${f.subject} · ${f.year}`}>
      <Crumbs crumbs={crumbs} onPick={go} />
      <p className="mt-2 mb-3 text-sm text-muted">
        {f.level} · {f.session} · {TYPES.find((t) => t.id === f.type)?.title}
      </p>
      {hits.length === 0 ? (
        <Card>
          <p className="font-display text-lg">Nothing in this path yet</p>
          <p className="mt-1 text-sm text-muted">Try another year or session. Specimens are added by subject, not all at once.</p>
          <Button className="mt-3" variant="outline" onClick={() => go({ exam: "GCE", level: f.level, subject: f.subject })}>
            Change year
          </Button>
        </Card>
      ) : (
        <div className="space-y-2">
          {hits.map((r) => {
            const open = r.free || r.credits === 0 || unlocked.includes(r.id);
            return (
              <Link key={r.id} to="/app/resource/$id" params={{ id: r.id }} className="block">
                <Card>
                  <p className="text-[11px] text-muted">
                    {r.kind === "questions" ? "GCE Past Questions" : r.kind === "answers" ? "Answers to Past Questions" : r.kind}
                    {r.session ? ` · ${r.session}` : ""}
                  </p>
                  <p className="font-display text-lg leading-tight">{r.title}</p>
                  <p className="text-sm text-muted">{r.summary}</p>
                  <p className="mt-1 text-xs font-medium">{open ? "Open in-app" : `${r.credits} L-Credits`}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </Page>
  );
}

function Crumbs({
  crumbs,
  onPick,
}: {
  crumbs: { label: string; search: ExploreSearch }[];
  onPick: (s: ExploreSearch) => void;
}) {
  return (
    <div className="no-scrollbar -mx-4 flex items-center gap-1 overflow-x-auto px-4 text-xs">
      <Compass className="size-3.5 shrink-0 text-gold" />
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} className="flex shrink-0 items-center gap-1">
          {i > 0 ? <ChevronRight className="size-3 text-muted" /> : null}
          <button type="button" className="text-muted hover:text-foreground" onClick={() => onPick(c.search)}>
            {c.label}
          </button>
        </span>
      ))}
    </div>
  );
}
