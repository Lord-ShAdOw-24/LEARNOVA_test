import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Compass, GraduationCap, Sparkles, Swords, Trophy } from "lucide-react";
import { Page, Card } from "./-components-layout-page.tsx";
import { RESOURCES } from "./-lib-data-catalog.ts";
import { NOTICES } from "./-lib-data-community.ts";
import { useLearnova } from "./-lib-store.ts";
import { RankBadge } from "./-components-brand-rank-badge.tsx";
import { DisplayName, FlameMark, SpendShield } from "./-components-brand-marks.tsx";
import { flameTier, spendLevel, streakFromDates } from "./-lib-identity.ts";

export const Route = createFileRoute("/app/")({ component: Home });

function Home() {
  const s = useLearnova();
  const streak = streakFromDates(s.activityDates);
  const last = s.quizHistory[0];
  const continueItem = RESOURCES.find((r) => r.kind === "note" && r.free) ?? RESOURCES[0]!;
  const todayDone = s.quizHistory.some((q) => q.at.slice(0, 10) === s.activityDates[0]);
  const flame = flameTier(streak);

  return (
    <Page kicker={s.guest ? "Guest session" : s.classLevel} title="">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">Today</p>
          <h1 className="font-display text-[1.85rem] leading-tight">
            <DisplayName name={s.username} streak={streak} verified={s.kycStatus === "verified"} />
          </h1>
          <p className="mt-1 text-sm text-muted">
            {streak} day streak{flame ? "" : " · flame from day 7"}
          </p>
        </div>
        <SpendShield level={spendLevel(s.spentCredits)} size={56} />
      </div>

      {s.guest ? (
        <Card className="mb-4">
          <p className="text-sm">
            Exploring without an account. Scores stay on this device.{" "}
            <Link to="/register" className="font-medium text-navy dark:text-gold">
              Create an account
            </Link>{" "}
            to keep them.
          </p>
        </Card>
      ) : null}

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Card className="flex flex-col items-start">
          <p className="text-xs text-muted">Streak</p>
          <div className="mt-1 flex items-center gap-1">
            <FlameMark days={streak} />
            <p className="font-display text-2xl tabular-nums">{streak}</p>
          </div>
        </Card>
        <Card>
          <p className="text-xs text-muted">L-Credits</p>
          <p className="font-display text-2xl tabular-nums">{s.credits}</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Last rank</p>
          {last ? <RankBadge rank={last.rank} className="mt-1" /> : <p className="text-sm text-muted">—</p>}
        </Card>
      </div>

      <Card className="mb-4">
        <p className="text-xs text-muted">Daily target</p>
        <p className="font-display text-lg">{todayDone ? "Quiz done for today." : "Sit one quiz or open a paper."}</p>
        <p className="mt-1 text-sm text-muted">Any class, download, competition or quiz counts toward the flame.</p>
      </Card>

      <Link to="/app/explore" search={{}} className="mb-4 block">
        <Card className="flex items-center gap-3 bg-navy text-cream">
          <Compass className="size-6 text-gold" />
          <div>
            <p className="text-[11px] tracking-[0.14em] text-gold uppercase">Explorer</p>
            <p className="font-display text-lg">GCE Past Questions</p>
          </div>
        </Card>
      </Link>

      <h2 className="mb-2 font-display text-xl">Continue</h2>
      <Link to="/app/resource/$id" params={{ id: continueItem.id }} className="mb-4 block">
        <Card>
          <p className="text-xs text-muted">
            {continueItem.level} · {continueItem.subject}
          </p>
          <p className="font-display text-lg">{continueItem.title}</p>
        </Card>
      </Link>

      <div className="grid grid-cols-2 gap-2">
        {[
          { to: "/app/explore", label: "Explorer", icon: Compass },
          { to: "/app/quizzes", label: "Take a quiz", icon: Trophy },
          { to: "/app/compete", label: "Compete", icon: Swords },
          { to: "/app/classes", label: "Classes", icon: GraduationCap },
          { to: "/app/lai", label: "Ask L-Ai", icon: Sparkles },
          { to: "/app/mistakes", label: "My mistakes", icon: BookOpen },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Link key={a.to} to={a.to} search={a.to === "/app/explore" ? {} : undefined} className="flex items-center gap-2 rounded-[20px] border border-border bg-card p-3">
              <Icon className="size-4 text-gold" />
              <span className="text-sm font-medium">{a.label}</span>
            </Link>
          );
        })}
      </div>

      <h2 className="mt-6 mb-2 font-display text-xl">Official</h2>
      {NOTICES.slice(0, 2).map((n) => (
        <Link key={n.id} to="/app/notices" className="mb-2 block">
          <Card>
            <p className="text-[11px] text-muted">{n.source}</p>
            <p className="text-sm font-medium">{n.title}</p>
          </Card>
        </Link>
      ))}
    </Page>
  );
}
