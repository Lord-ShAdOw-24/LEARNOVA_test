import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";
import { Wordmark } from "./-components-brand-logo.tsx";
import { SocialRow } from "./-components-brand-social.tsx";
import { VerifiedMark, ScanMark, FreezeMark, BanMark, SpendShield } from "./-components-brand-marks.tsx";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <PhoneStage>
      <Page kicker="About" title="Built for Anglophone Cameroon.">
        <Wordmark className="mb-4" />
        <Card>
          <p className="text-sm leading-6 text-muted">
            Learnova is a mobile-first platform for GCE O-Level, A-Level and Competitive Entrance Examinations
            (Concours). Explorer guides revision. Trust marks keep teachers and groups honest. Teachers are paid through
            escrow.
          </p>
        </Card>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
            <VerifiedMark /> Verified — KYC passed
          </li>
          <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
            <ScanMark /> SCAN — reports, review pending
          </li>
          <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
            <FreezeMark /> Frozen — activity paused
          </li>
          <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
            <BanMark /> Banned — permanently closed
          </li>
          <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
            <SpendShield level={1} size={28} /> Spend shield — level on your profile
          </li>
        </ul>
        <p className="mt-6 text-xs text-muted">Social</p>
        <SocialRow className="mt-2" compact />
        <Link to="/" className="mt-6 inline-block text-sm text-navy dark:text-gold">
          Back home
        </Link>
      </Page>
    </PhoneStage>
  );
}
