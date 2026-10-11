import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import {
  BanMark,
  FreezeMark,
  ScanMark,
  SpendShield,
  VerifiedMark,
} from "./-components-brand-marks.tsx";
import { DisplayName } from "./-components-brand-marks.tsx";

export const Route = createFileRoute("/app/trust")({ component: Trust });

function Trust() {
  return (
    <Page kicker="Safety" title="Trust marks">
      <p className="mb-4 text-sm text-muted">
        These sit next to a name or on a group. Your team can reuse the PNG pack as-is in the native app.
      </p>

      <Card className="mb-3">
        <div className="flex items-center gap-3">
          <VerifiedMark />
          <div>
            <p className="font-display text-lg">Verified</p>
            <p className="text-sm text-muted">Platform check passed. Certified teachers and confirmed accounts.</p>
          </div>
        </div>
      </Card>
      <Card className="mb-3">
        <div className="flex items-center gap-3">
          <ScanMark />
          <div>
            <p className="font-display text-lg">SCAN</p>
            <p className="text-sm text-muted">
              Many reports. Review is open. Shown on the group first, like a Telegram scam flag — not a final ban.
            </p>
          </div>
        </div>
      </Card>
      <Card className="mb-3">
        <div className="flex items-center gap-3">
          <FreezeMark />
          <div>
            <p className="font-display text-lg">Frozen</p>
            <p className="text-sm text-muted">
              Account or group still exists, but activity is closed until review ends — lift or convert to a ban.
            </p>
          </div>
        </div>
      </Card>
      <Card className="mb-3">
        <div className="flex items-center gap-3">
          <BanMark />
          <div>
            <p className="font-display text-lg">Banned</p>
            <p className="text-sm text-muted">
              Permanent. Group becomes inaccessible. Admins then decide whether to ban the teacher who created it.
            </p>
          </div>
        </div>
      </Card>

      <h2 className="mt-6 mb-2 font-display text-xl">Streak flames — after the name</h2>
      <Card className="mb-2 flex items-center justify-between">
        <DisplayName name="Blessing Fon" streak={9} />
        <span className="text-xs text-muted">7 days · Spark</span>
      </Card>
      <Card className="mb-2 flex items-center justify-between">
        <DisplayName name="Joel Tabe" streak={23} />
        <span className="text-xs text-muted">21 days · Flame</span>
      </Card>
      <Card className="mb-2 flex items-center justify-between">
        <DisplayName name="Amina Nfor" streak={52} />
        <span className="text-xs text-muted">45 days · Inferno</span>
      </Card>
      <p className="mb-4 text-xs text-muted">
        A day counts if the student quizzes, opens a paper, joins a class, downloads, or enters a competition.
      </p>

      <h2 className="mb-2 font-display text-xl">Spend shield</h2>
      <div className="mb-4 flex items-end gap-3">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="text-center">
            <SpendShield level={n} size={56} />
            <p className="mt-1 text-[10px] text-muted">Lv {n}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">
        The number lives inside the shield on the profile. Level climbs with L-Credits spent on Learnova.
      </p>

      <h2 className="mt-6 mb-2 font-display text-xl">Live examples</h2>
      <Card className="mb-2">
        <DisplayName name="Emmanuela Ngum" verified />
        <p className="text-xs text-muted">Certified teacher</p>
      </Card>
      <Card className="mb-2">
        <DisplayName name="Ngu Acha" moderation="scan" />
        <p className="text-xs text-muted">14 reports · History group</p>
      </Card>
      <Card className="mb-2">
        <DisplayName name="Mirabel Leke" moderation="frozen" />
        <p className="text-xs text-muted">KYC freeze</p>
      </Card>
      <Card>
        <DisplayName name="QuickCert Lessons" moderation="banned" />
        <p className="text-xs text-muted">Off-platform fees · group closed</p>
      </Card>
    </Page>
  );
}
