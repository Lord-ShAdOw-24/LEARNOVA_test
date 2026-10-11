import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Lock, Play } from "lucide-react";
import { useMemo, useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { CONCOURS, GCE_RESULTS, RESOURCES, type Level, type ResourceKind } from "./-lib-data-catalog.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/library")({ component: Library });

const TABS: { id: ResourceKind | "concours" | "results"; label: string }[] = [
  { id: "questions", label: "Past Questions" },
  { id: "answers", label: "Answers" },
  { id: "note", label: "Notes" },
  { id: "video", label: "Videos" },
  { id: "pack", label: "Packs" },
  { id: "concours", label: "Concours" },
  { id: "results", label: "Results" },
];

function Library() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("questions");
  const [level, setLevel] = useState<Level | "All">("All");
  const unlocked = useLearnova((s) => s.unlocked);

  const list = useMemo(
    () => RESOURCES.filter((r) => r.kind === tab && (level === "All" || r.level === level)),
    [tab, level],
  );

  return (
    <Page kicker="Library" title="Every file, still filterable.">
      <Link to="/app/explore" search={{}} className="mb-3 flex items-center gap-2 rounded-[20px] bg-navy px-4 py-3 text-cream">
        <Compass className="size-4 text-gold" />
        <span className="text-sm font-medium">Prefer Explorer — guided filters</span>
      </Link>
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`h-9 shrink-0 rounded-full px-3 text-sm ${
              tab === t.id ? "bg-navy text-cream" : "border border-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab !== "concours" && tab !== "results" ? (
        <div className="mb-3 flex gap-2">
          {(["All", "O-Level", "A-Level", "Concours"] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => setLevel(lv)}
              className={`h-8 rounded-full px-3 text-xs ${level === lv ? "bg-gold text-navy" : "border border-border"}`}
            >
              {lv}
            </button>
          ))}
        </div>
      ) : null}

      {tab === "concours" ? (
        <div className="space-y-2">
          <Card className="mb-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">Pending</p>
            <p className="mt-1 text-sm text-muted">
              Competitive Entrance Examinations open later. Questions and answers will ship as one PDF per exam.
            </p>
          </Card>
          {CONCOURS.map((c) => (
            <Card key={c.id}>
              <p className="font-display text-lg">{c.name}</p>
              <p className="text-sm text-muted">{c.school}</p>
              <p className="mt-2 text-sm">Deadline {c.deadline} · {c.fee}</p>
              <p className="mt-1 text-xs text-muted">Centres: {c.centres.join(", ")}</p>
              <p className="mt-2 text-sm">{c.notes}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "results" ? (
        <div className="space-y-2">
          {GCE_RESULTS.map((r) => (
            <Card key={r.centre}>
              <p className="font-display text-lg">{r.centre} · {r.year}</p>
              <p className="text-sm">O-Level pass {r.passOl} · A-Level pass {r.passAl}</p>
              <p className="text-xs text-muted">{r.note}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {tab !== "concours" && tab !== "results" ? (
        <div className="space-y-2">
          {list.map((r) => {
            const open = r.free || r.credits === 0 || unlocked.includes(r.id);
            return (
              <Link key={r.id} to="/app/resource/$id" params={{ id: r.id }} className="block">
                <Card className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-navy text-gold">
                    {r.kind === "video" ? <Play className="size-4" /> : <Lock className="size-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-muted">
                      {r.level} · {r.subject}
                      {r.year ? ` · ${r.year}` : ""}
                      {r.session ? ` · ${r.session}` : ""}
                    </p>
                    <p className="font-display text-lg leading-tight">{r.title}</p>
                    <p className="text-sm text-muted">{r.summary}</p>
                    <p className="mt-1 text-xs font-medium">
                      {open ? "Open in-app" : `${r.credits} L-Credits`}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : null}
    </Page>
  );
}
