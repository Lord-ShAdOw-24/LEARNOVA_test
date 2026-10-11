import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { resourceById } from "./-lib-data-catalog.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/saves")({ component: Saves });

function Saves() {
  const saved = useLearnova((s) => s.saved);
  const downloads = useLearnova((s) => s.downloads);
  const savedItems = saved.map(resourceById).filter(Boolean);
  const offline = downloads.map(resourceById).filter(Boolean);

  return (
    <Page kicker="Library" title="Favourites & downloads">
      <h2 className="mb-2 font-display text-xl">Saved</h2>
      {savedItems.length === 0 ? (
        <p className="mb-4 text-sm text-muted">Bookmark a paper from Explorer to keep it here.</p>
      ) : (
        savedItems.map((r) =>
          r ? (
            <Link key={r.id} to="/app/resource/$id" params={{ id: r.id }} className="mb-2 block">
              <Card>
                <p className="text-xs text-muted">{r.kind}</p>
                <p className="font-medium">{r.title}</p>
              </Card>
            </Link>
          ) : null,
        )
      )}
      <h2 className="mt-4 mb-2 font-display text-xl">Offline in-app copies</h2>
      <p className="mb-2 text-xs text-muted">Files stay inside Learnova. No export.</p>
      {offline.length === 0 ? (
        <p className="text-sm text-muted">Open a paper and tap Download in-app.</p>
      ) : (
        offline.map((r) =>
          r ? (
            <Card key={r.id} className="mb-2">
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-muted">{r.pages ? `${r.pages} pages` : r.kind} · synced</p>
            </Card>
          ) : null,
        )
      )}
    </Page>
  );
}
