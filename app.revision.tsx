import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { RESOURCES } from "./-lib-data-catalog.ts";

export const Route = createFileRoute("/app/revision")({ component: Revision });

function Revision() {
  const papers = RESOURCES.filter((r) => r.kind === "paper" && r.exam === "GCE").slice(0, 6);
  return (
    <Page kicker="GCE mode" title="Eve-of-exam revision">
      <Card className="mb-4">
        <p className="text-sm text-muted">
          This page becomes the home screen one month before the GCE. During the writing period, a last-minute set
          unlocks each evening before the next paper.
        </p>
      </Card>
      <h2 className="mb-2 font-display text-xl">Tonight’s set</h2>
      {papers.map((p) => (
        <Link key={p.id} to="/app/resource/$id" params={{ id: p.id }} className="mb-2 block">
          <Card>
            <p className="text-xs text-muted">
              {p.subject} · {p.year}
            </p>
            <p className="font-medium">{p.title}</p>
          </Card>
        </Link>
      ))}
    </Page>
  );
}
