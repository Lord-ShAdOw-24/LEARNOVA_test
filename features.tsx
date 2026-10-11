import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";

export const Route = createFileRoute("/features")({ component: Features });

function Features() {
  return (
    <PhoneStage>
      <Page kicker="Features" title="Everything in the first product.">
        {[
          ["Library", "Past papers, corrections, notes, videos, Concours desk, GCE results."],
          ["Quizzes", "Subject × difficulty, 20s timer, D–SSS ranks, best-score leaderboards."],
          ["Compete", "Student rooms, teacher rooms with escrowed prizes, monthly official, Hackathon."],
          ["Classes", "Paid groups, liability disclosure, 30-day escrow, 15% or 10% commission."],
          ["L-Ai", "Text, short voice, images. Academic only. Cannot bypass payment."],
        ].map(([t, b]) => (
          <Card key={t} className="mb-3">
            <h2 className="font-display text-lg">{t}</h2>
            <p className="text-sm text-muted">{b}</p>
          </Card>
        ))}
        <Link to="/" className="text-sm text-navy dark:text-gold">
          Back home
        </Link>
      </Page>
    </PhoneStage>
  );
}
