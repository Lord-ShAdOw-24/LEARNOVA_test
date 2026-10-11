import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/mistakes")({ component: Mistakes });

function Mistakes() {
  const items = useLearnova((s) => s.mistakes);
  const open = items.filter((m) => !m.mastered);
  const done = items.filter((m) => m.mastered);

  return (
    <Page kicker="Revision" title="My mistakes">
      <p className="mb-3 text-sm text-muted">Wrong quiz answers land here until you mark them mastered.</p>
      {open.length === 0 ? (
        <Card>
          <p className="font-display text-lg">No open mistakes</p>
          <p className="mt-1 text-sm text-muted">Sit a quiz. Missed items appear here with the explanation.</p>
          <Button asChild className="mt-3">
            <Link to="/app/quizzes">Take a quiz</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-2">
          {open.map((m) => (
            <Card key={m.id}>
              <p className="text-[11px] text-muted">
                {m.level} · {m.subject}
              </p>
              <p className="mt-1 text-sm font-medium">{m.prompt}</p>
              <p className="mt-2 text-sm text-muted">{m.explanation}</p>
              <Button size="sm" className="mt-3" onClick={() => useLearnova.getState().masterMistake(m.id)}>
                Mark mastered
              </Button>
            </Card>
          ))}
        </div>
      )}
      {done.length ? (
        <>
          <h2 className="mt-6 mb-2 font-display text-xl">Mastered</h2>
          {done.slice(0, 8).map((m) => (
            <p key={m.id} className="mb-1 text-sm text-muted">
              {m.prompt}
            </p>
          ))}
        </>
      ) : null}
    </Page>
  );
}
