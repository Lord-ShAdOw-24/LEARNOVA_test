import { createFileRoute, Link } from "@tanstack/react-router";
import { UserButton } from "./-lib-auth-gates.tsx";
import { useCurrentUserState } from "./-lib-auth-use-current-user.ts";
import { Page, Card } from "./-components-layout-page.tsx";
import { RankBadge } from "./-components-brand-rank-badge.tsx";
import { DisplayName, FlameMark, SpendShield } from "./-components-brand-marks.tsx";
import { SocialRow } from "./-components-brand-social.tsx";
import { useLearnova } from "./-lib-store.ts";
import { CLASS_TRACKS, SCHOOLS } from "./-lib-data-catalog.ts";
import { flameMeta, nextSpendAt, spendLevel, streakFromDates } from "./-lib-identity.ts";

export const Route = createFileRoute("/app/profile")({ component: Profile });

function Profile() {
  const { user, isPending } = useCurrentUserState();
  const s = useLearnova();
  const streak = streakFromDates(s.activityDates);
  const flame = flameMeta(streak);
  const spend = spendLevel(s.spentCredits);
  const next = nextSpendAt(s.spentCredits);

  return (
    <Page kicker={s.role} title="">
      <Card className="mb-3">
        <div className="flex items-start gap-3">
          <SpendShield level={spend} size={72} />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl leading-tight">
              <DisplayName name={s.username} streak={streak} verified={s.kycStatus === "verified"} />
            </h1>
            <p className="text-sm text-muted">{s.realName || (user?.displayName ?? "Learner")}</p>
            <p className="text-sm">
              {s.school || "Independent"} · {s.classLevel}
            </p>
            <p className="mt-2 text-sm tabular-nums">
              Shield {spend} · {s.credits} L-Credits · {s.referralCode}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <FlameMark days={streak} />
          <span>
            {streak} consecutive days
            {flame ? ` · ${flame.label}` : " · flame unlocks at 7"}
          </span>
        </div>
        {next != null ? (
          <p className="mt-1 text-xs text-muted">
            Spend {next - s.spentCredits} more L-Credits to reach shield {spend + 1}.
          </p>
        ) : null}
        <div className="mt-3 flex items-center gap-3">
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-line" />
          ) : user ? (
            <UserButton />
          ) : (
            <Link to="/login" className="text-sm font-medium text-navy dark:text-gold">
              Sign in to keep this profile
            </Link>
          )}
        </div>
      </Card>

      {s.quizHistory[0] ? (
        <Card className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">Latest rank</p>
            <p className="text-sm">{s.quizHistory[0].subject}</p>
          </div>
          <RankBadge rank={s.quizHistory[0].rank} />
        </Card>
      ) : null}

      <label className="mb-2 block text-sm">
        School
        <select
          className="mt-1 h-11 w-full rounded-2xl border border-border bg-card px-3"
          value={s.school}
          onChange={(e) => s.setProfile({ school: e.target.value })}
        >
          <option value="">Independent</option>
          {SCHOOLS.map((sc) => (
            <option key={sc}>{sc}</option>
          ))}
        </select>
      </label>
      <label className="mb-4 block text-sm">
        Class / series
        <select
          className="mt-1 h-11 w-full rounded-2xl border border-border bg-card px-3"
          value={s.classLevel}
          onChange={(e) => s.setProfile({ classLevel: e.target.value })}
        >
          {CLASS_TRACKS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <Link className="rounded-2xl border border-border bg-card p-3" to="/app/wallet">
          Wallet
        </Link>
        <Link className="rounded-2xl border border-border bg-card p-3" to="/app/settings">
          Settings
        </Link>
        <Link className="rounded-2xl border border-border bg-card p-3" to="/app/progress">
          Progress
        </Link>
        <Link className="rounded-2xl border border-border bg-card p-3" to="/app/mistakes">
          My mistakes
        </Link>
        <Link className="rounded-2xl border border-border bg-card p-3" to="/app/saves">
          Saves & downloads
        </Link>
        <Link className="rounded-2xl border border-border bg-card p-3" to="/app/trust">
          Trust marks
        </Link>
      </div>
      {s.role === "teacher" ? (
        <Card className="mt-3">
          <p className="font-display text-lg">KYC {s.kycStatus}</p>
          <p className="text-sm text-muted">Dual-photo identity check is required before the first paid group.</p>
        </Card>
      ) : null}
      <p className="mt-6 text-xs text-muted">Social</p>
      <SocialRow className="mt-2" compact />
    </Page>
  );
}
