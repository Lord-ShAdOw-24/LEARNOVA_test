import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { useLearnova } from "./-lib-store.ts";
import { formatFcfa } from "./-lib-utils.ts";

export const Route = createFileRoute("/app/parent")({ component: Parent });

function Parent() {
  const s = useLearnova();
  return (
    <Page kicker="Parent / tutor" title="Linked learner">
      <Card className="mb-3">
        <p className="font-display text-lg">{s.username}</p>
        <p className="text-sm text-muted">
          {s.school || "Independent"} · {s.classLevel}
        </p>
        <p className="mt-2 text-sm">Quizzes taken: {s.quizHistory.length}</p>
      </Card>
      <Card className="mb-3">
        <p className="font-medium">Fund wallet</p>
        <p className="text-sm text-muted">Send L-Credits to the linked student. {formatFcfa(4000)} → 150 L.</p>
        <Button
          className="mt-2"
          onClick={() => useLearnova.getState().grant(150, "Parent top-up", "MTN")}
        >
          Send 150 L
        </Button>
      </Card>
      <Link to="/app/quizzes" className="text-sm">
        View quiz history
      </Link>
    </Page>
  );
}
