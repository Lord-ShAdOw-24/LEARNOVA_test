import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { PREMIUM_PLANS } from "./-lib-store.ts";
import { formatFcfa } from "./-lib-utils.ts";

export const Route = createFileRoute("/premium")({ component: Premium });

function Premium() {
  return (
    <PhoneStage>
      <Page kicker="Premium" title="Ad-free. More devices. Monthly L-Credits.">
        {PREMIUM_PLANS.map((p) => (
          <Card key={p.id} className="mb-3">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl">{p.name}</h2>
              <p className="tabular-nums">{formatFcfa(p.price)}/mo</p>
            </div>
            <p className="mt-1 text-sm text-muted">{p.blurb}</p>
            <p className="mt-2 text-sm">
              {p.credits} L-Credits · {p.devices} devices
            </p>
            <Button asChild className="mt-3 w-full">
              <Link to="/app/wallet">Subscribe in wallet</Link>
            </Button>
          </Card>
        ))}
      </Page>
    </PhoneStage>
  );
}
