import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { DisplayName } from "./-components-brand-marks.tsx";
import { RESOURCES } from "./-lib-data-catalog.ts";
import { CLASSES, TEACHERS } from "./-lib-data-community.ts";

export const Route = createFileRoute("/app/search")({ component: SearchPage });

function SearchPage() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!query) return { resources: RESOURCES.slice(0, 4), teachers: TEACHERS.slice(0, 3), classes: CLASSES.slice(0, 2) };
    return {
      resources: RESOURCES.filter((r) => `${r.title} ${r.subject} ${r.summary}`.toLowerCase().includes(query)),
      teachers: TEACHERS.filter((t) => `${t.name} ${t.subjects.join(" ")} ${t.city}`.toLowerCase().includes(query)),
      classes: CLASSES.filter((c) => `${c.title} ${c.subject}`.toLowerCase().includes(query)),
    };
  }, [query]);

  return (
    <Page kicker="Search" title="Find a topic, teacher or class.">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Mathematics, ENS, Ngum…"
        className="mb-4 h-12 w-full rounded-2xl border border-border bg-card px-3"
      />
      <h2 className="mb-2 font-display text-lg">Library</h2>
      {hits.resources.map((r) => (
        <Link key={r.id} to="/app/resource/$id" params={{ id: r.id }} className="mb-2 block">
          <Card>
            <p className="text-xs text-muted">{r.kind}</p>
            <p className="font-medium">{r.title}</p>
          </Card>
        </Link>
      ))}
      <h2 className="mt-4 mb-2 font-display text-lg">Teachers</h2>
      {hits.teachers.map((t) => (
        <Card key={t.id} className="mb-2">
          <DisplayName name={t.name} verified={t.certified} moderation={t.moderation ?? "ok"} />
          <p className="text-sm text-muted">{t.subjects.join(" · ")}</p>
        </Card>
      ))}
      <h2 className="mt-4 mb-2 font-display text-lg">Classes</h2>
      {hits.classes.map((c) => (
        <Link key={c.id} to="/app/classes/$id" params={{ id: c.id }} className="mb-2 block">
          <Card>
            <p className="font-medium">{c.title}</p>
          </Card>
        </Link>
      ))}
      <p className="mt-4 text-xs text-muted">No luck? Ask L-Ai — it still cannot unlock paid files.</p>
      <Link to="/app/lai" className="text-sm font-medium text-navy dark:text-gold">
        Open L-Ai
      </Link>
    </Page>
  );
}
