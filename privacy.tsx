import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <PhoneStage>
      <Page kicker="Legal" title="Privacy">
        <Card className="text-sm leading-6 text-muted">
          We store the account you create, school context, quiz scores, purchases and KYC documents for teachers. KYC
          photos are used only for identity matching. Leaderboards show username, school and rank — not your CNI.
        </Card>
        <Link to="/terms" className="mt-4 inline-block text-sm">
          Terms
        </Link>
      </Page>
    </PhoneStage>
  );
}
