import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { RankBadge } from "./-components-brand-rank-badge.tsx";
import { FlameMark, SpendShield } from "./-components-brand-marks.tsx";
import { useLearnova } from "./-lib-store.ts";
import { spendLevel, streakFromDates } from "./-lib-identity.ts";

export const Route = createFileRoute("/app/progress")({ component: Progress });

function Progress() {
  const s = useLearnova();
  const streak = streakFromDates(s.activityDates);
  const attempts = s.quizHistory;
  const avg = attempts.length
    ? Math.round(attempts.reduce((a, q) => a + q.percent, 0) / attempts.length)
    : 0;
  const bySubject = new Map<string, { n: number; sum: number }>();
  for (const q of attempts) {
    const cur = bySubject.get(q.subject) ?? { n: 0, sum: 0 };
    cur.n += 1;
    cur.sum += q.percent;
    bySubject.set(q.subject, cur);
  }
  const subjects = [...bySubject.entries()].sort((a, b) => b[1].sum / b[1].n - a[1].sum / a[1].n);
  const week = attempts.filter((q) => Date.now() - new Date(q.at).getTime() < 7 * 86400000).length;
  const month = attempts.filter((q) => Date.now() - new Date(q.at).getTime() < 30 * 86400000).length;

  return (
    <Page kicker="Progress" title="How you are tracking.">
      <div className="mb-3 grid grid-cols-2 gap-2">
        <Card className="flex items-center gap-2">
          <FlameMark days={streak} />
          <div>
            <p className="text-xs text-muted">Streak</p>
            <p className="font-display text-2xl tabular-nums">{streak}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-2">
          <SpendShield level={spendLevel(s.spentCredits)} size={44} />
          <div>
            <p className="text-xs text-muted">Shield</p>
            <p className="font-display text-2xl tabular-nums">{spendLevel(s.spentCredits)}</p>
          </div>
        </Card>
        <Card>
          <p className="text-xs text-muted">Average</p>
          <p className="font-display text-2xl tabular-nums">{avg}%</p>
        </Card>
        <Card>
          <p className="text-xs text-muted">Attempts</p>
          <p className="font-display text-2xl tabular-nums">{attempts.length}</p>
        </Card>
      </div>
      <Card className="mb-3">
        <p className="text-sm">Last 7 days · {week} quizzes</p>
        <p className="text-sm text-muted">Last 30 days · {month} quizzes</p>
      </Card>
      <h2 className="mb-2 font-display text-xl">By subject</h2>
      {subjects.length === 0 ? (
        <p className="text-sm text-muted">Sit a quiz to see mastery.</p>
      ) : (
        subjects.map(([name, v]) => (
          <Card key={name} className="mb-2 flex items-center justify-between">
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted">{v.n} attempts</p>
            </div>
            <p className="font-display text-xl tabular-nums">{Math.round(v.sum / v.n)}%</p>
          </Card>
        ))
      )}
      {attempts[0] ? (
        <Card className="mt-2 flex items-center justify-between">
          <p className="text-sm">Latest rank</p>
          <RankBadge rank={attempts[0].rank} />
        </Card>
      ) : null}
    </Page>
  );
}
