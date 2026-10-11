import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { DisplayName } from "./-components-brand-marks.tsx";
import { TEACHERS } from "./-lib-data-community.ts";

export const Route = createFileRoute("/teachers")({ component: Teachers });

function Teachers() {
  return (
    <PhoneStage>
      <Page kicker="Teach" title="Host paid groups. Keep 85% or 90%.">
        <Card className="mb-4">
          <p className="text-sm text-muted">
            KYC first for the blue check. SCAN appears if students report you often. A freeze pauses the group during
            review. A ban closes it. Fees sit in escrow for 30 days. Certified teachers earn 90%.
          </p>
        </Card>
        {TEACHERS.map((t) => (
          <Card key={t.id} className="mb-3">
            <DisplayName name={t.name} verified={t.certified} moderation={t.moderation ?? "ok"} />
            <p className="text-sm text-muted">
              {t.subjects.join(" · ")} · {t.city}
            </p>
            <p className="mt-1 text-sm tabular-nums">
              {t.rating.toFixed(1)} / 5 · {t.reviews} reviews
              {t.reports ? ` · ${t.reports} reports` : ""}
            </p>
          </Card>
        ))}
        <Button asChild className="w-full">
          <Link to="/register">Become a teacher</Link>
        </Button>
      </Page>
    </PhoneStage>
  );
}
