import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { CREDIT_PACKS, PREMIUM_PLANS, useLearnova, type PremiumTier } from "./-lib-store.ts";
import { formatFcfa } from "./-lib-utils.ts";
import { ADS } from "./-lib-data-community.ts";

export const Route = createFileRoute("/app/wallet")({ component: Wallet });

function Wallet() {
  const credits = useLearnova((s) => s.credits);
  const tier = useLearnova((s) => s.premiumTier);
  const txns = useLearnova((s) => s.txns);
  const adsHidden = useLearnova((s) => s.adsHidden);
  const [method, setMethod] = useState<"MTN" | "Orange">("MTN");
  const [phone, setPhone] = useState("67");
  const [status, setStatus] = useState<string | null>(null);

  function payCredits(pack: (typeof CREDIT_PACKS)[number]) {
    setStatus("Processing…");
    window.setTimeout(() => {
      useLearnova.getState().grant(pack.credits, `${pack.credits} L-Credits`, method);
      setStatus(`Success · ${method} ${phone}`);
    }, 800);
  }

  function subscribe(id: PremiumTier) {
    const plan = PREMIUM_PLANS.find((p) => p.id === id);
    if (!plan) return;
    setStatus("Processing…");
    window.setTimeout(() => {
      useLearnova.getState().grant(plan.credits, `${plan.name} stipend`, method);
      useLearnova.getState().setProfile({ premiumTier: id, adsHidden: true });
      setStatus(`Premium ${plan.name} active`);
    }, 800);
  }

  return (
    <Page kicker="Wallet" title={`${credits} L-Credits`}>
      <p className="mb-4 text-sm text-muted">
        Pay with MTN MoMo or Orange Money. This preview credits the wallet after a simulated confirmation.
      </p>
      <div className="mb-3 flex gap-2">
        {(["MTN", "Orange"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={`h-9 rounded-full px-3 text-sm ${method === m ? "bg-navy text-cream" : "border border-border"}`}
          >
            {m} Money
          </button>
        ))}
      </div>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-4 h-11 w-full rounded-2xl border border-border bg-card px-3"
        placeholder="Mobile money number"
      />
      {status ? <p className="mb-3 text-sm text-ok">{status}</p> : null}

      <h2 className="mb-2 font-display text-xl">Buy L-Credits</h2>
      {CREDIT_PACKS.map((p) => (
        <Card key={p.id} className="mb-2 flex items-center justify-between">
          <div>
            <p className="font-medium">{p.credits} L</p>
            <p className="text-xs text-muted">{formatFcfa(p.price)}</p>
          </div>
          <Button size="sm" onClick={() => payCredits(p)}>
            Buy
          </Button>
        </Card>
      ))}

      <h2 className="mt-5 mb-2 font-display text-xl">Premium</h2>
      {PREMIUM_PLANS.map((p) => (
        <Card key={p.id} className="mb-2">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-lg">{p.name}</p>
            <p className="text-sm tabular-nums">{formatFcfa(p.price)}/mo</p>
          </div>
          <p className="text-sm text-muted">
            {p.credits} L / month · {p.devices} devices · ad-free
          </p>
          <Button size="sm" className="mt-2" variant={tier === p.id ? "navy" : "gold"} onClick={() => subscribe(p.id)}>
            {tier === p.id ? "Current" : "Subscribe"}
          </Button>
        </Card>
      ))}

      {!adsHidden ? (
        <>
          <h2 className="mt-5 mb-2 font-display text-xl">Approved ads</h2>
          {ADS.map((a) => (
            <Card key={a.id} className="mb-2">
              <p className="text-[11px] text-muted">{a.sponsor}</p>
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-muted">{a.body}</p>
            </Card>
          ))}
        </>
      ) : (
        <p className="mt-4 text-sm text-muted">Premium hides the advertising page.</p>
      )}

      <h2 className="mt-5 mb-2 font-display text-xl">History</h2>
      {txns.length === 0 ? <p className="text-sm text-muted">No movements yet.</p> : null}
      {txns.slice(0, 12).map((t) => (
        <Card key={t.id} className="mb-2 flex justify-between text-sm">
          <span>{t.label}</span>
          <span className="tabular-nums">
            {t.kind === "credit" ? "+" : "−"}
            {t.amount}
          </span>
        </Card>
      ))}
    </Page>
  );
}
