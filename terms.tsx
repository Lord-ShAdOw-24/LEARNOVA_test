import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <PhoneStage>
      <Page kicker="Legal" title="Terms of use">
        <Card className="text-sm leading-6 text-muted">
          Learnova is a study platform. Paid documents remain in-app. Live classes are contracts between student and
          teacher; Learnova holds fees in escrow and is not liable for off-platform contact. Competition fees are
          250 FCFA (monthly) and 500 FCFA (Hackathon). Rank thresholds below SSS are pedagogical calibrations.
        </Card>
        <Link to="/privacy" className="mt-4 inline-block text-sm">
          Privacy policy
        </Link>
      </Page>
    </PhoneStage>
  );
}
