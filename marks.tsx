import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Wordmark } from "./-components-brand-logo.tsx";
import {
  BanMark,
  DisplayName,
  FreezeMark,
  ScanMark,
  SpendShield,
  VerifiedMark,
  FlameMark,
} from "./-components-brand-marks.tsx";
import { SocialRow } from "./-components-brand-social.tsx";
import { Card } from "./-components-layout-page.tsx";

export const Route = createFileRoute("/marks")({ component: MarksGallery });

function MarksGallery() {
  return (
    <PhoneStage>
      <main className="min-h-dvh bg-background px-5 pb-16">
        <header className="flex items-center justify-between py-5">
          <Wordmark />
          <Link to="/app" className="text-sm font-medium text-navy dark:text-gold">
            Open app
          </Link>
        </header>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">Trust pack</p>
        <h1 className="font-display text-3xl leading-tight">Every mark, on one screen.</h1>
        <p className="mt-2 mb-6 text-sm text-muted">
          These are the same PNG files your team can drop at the GitHub root. Rules sit next to each icon.
        </p>

        <Card className="mb-3">
          <div className="flex items-center gap-3">
            <VerifiedMark />
            <div>
              <p className="font-display text-lg">Verified</p>
              <p className="text-sm text-muted">Blue check. Platform-certified account or teacher.</p>
            </div>
          </div>
        </Card>
        <Card className="mb-3">
          <div className="flex items-center gap-3">
            <ScanMark />
            <div>
              <p className="font-display text-lg">SCAN</p>
              <p className="text-sm text-muted">
                Many reports, review still open. Shows on the group first — not a final ban.
              </p>
            </div>
          </div>
        </Card>
        <Card className="mb-3">
          <div className="flex items-center gap-3">
            <FreezeMark />
            <div>
              <p className="font-display text-lg">Frozen</p>
              <p className="text-sm text-muted">Still listed. Join, chat and pay are paused until review ends.</p>
            </div>
          </div>
        </Card>
        <Card className="mb-3">
          <div className="flex items-center gap-3">
            <BanMark />
            <div>
              <p className="font-display text-lg">Banned</p>
              <p className="text-sm text-muted">Permanent. Group is inaccessible. Content stays closed.</p>
            </div>
          </div>
        </Card>

        <h2 className="mt-6 mb-2 font-display text-xl">Flames next to the name</h2>
        <Card className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1">
            Blessing Fon <FlameMark days={9} />
          </span>
          <span className="text-xs text-muted">7 days · spark</span>
        </Card>
        <Card className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1">
            Joel Tabe <FlameMark days={23} />
          </span>
          <span className="text-xs text-muted">21 days · flame</span>
        </Card>
        <Card className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1">
            Amina Nfor <FlameMark days={52} />
          </span>
          <span className="text-xs text-muted">45 days · inferno</span>
        </Card>

        <h2 className="mt-6 mb-2 font-display text-xl">Spend shield on the profile</h2>
        <div className="mb-4 flex items-end gap-3">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="text-center">
              <SpendShield level={n} size={52} />
              <p className="mt-1 text-[10px] text-muted">Lv {n}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-6 mb-2 font-display text-xl">On a name</h2>
        <Card className="mb-2">
          <DisplayName name="Emmanuela Ngum" verified streak={23} />
          <p className="text-xs text-muted">Certified teacher + flame</p>
        </Card>
        <Card className="mb-2">
          <DisplayName name="Ngu Acha" moderation="scan" />
          <p className="text-xs text-muted">14 reports · History group</p>
        </Card>
        <Card className="mb-2">
          <DisplayName name="Mirabel Leke" moderation="frozen" />
          <p className="text-xs text-muted">KYC freeze</p>
        </Card>
        <Card className="mb-6">
          <DisplayName name="QuickCert Lessons" moderation="banned" />
          <p className="text-xs text-muted">Off-platform fees · group closed</p>
        </Card>

        <h2 className="mb-2 font-display text-xl">Social</h2>
        <SocialRow />

        <Link
          to="/app"
          className="mt-8 grid h-12 place-items-center rounded-full bg-navy text-sm font-semibold text-cream"
        >
          Continue into the app
        </Link>
      </main>
    </PhoneStage>
  );
}
