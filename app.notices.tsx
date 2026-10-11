import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { NOTICES } from "./-lib-data-community.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/notices")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => {
    const id = typeof s.id === "string" ? s.id : undefined;
    return id ? { id } : {};
  },
  component: Notices,
});

function Notices() {
  const { id } = Route.useSearch();
  const [sel, setSel] = useState(id ?? NOTICES[0]?.id);
  const n = NOTICES.find((x) => x.id === sel) ?? NOTICES[0];
  return (
    <Page kicker="Official" title="Notices & product news">
      <div className="mb-3 flex gap-2">
        {NOTICES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSel(item.id);
              useLearnova.getState().markNotices(item.id);
            }}
            className={`h-9 rounded-full px-3 text-xs ${sel === item.id ? "bg-navy text-cream" : "border border-border"}`}
          >
            {item.kind === "education" ? "Education" : "Learnova"}
          </button>
        ))}
      </div>
      {n ? (
        <Card>
          <p className="text-[11px] text-muted">
            {n.source} · {n.date}
          </p>
          <h2 className="mt-1 font-display text-xl">{n.title}</h2>
          <p className="mt-2 text-sm">{n.summary}</p>
          <div className="mt-3 space-y-2">
            {n.body.map((p) => (
              <p key={p} className="text-sm leading-6 text-muted">
                {p}
              </p>
            ))}
          </div>
        </Card>
      ) : null}
    </Page>
  );
}
