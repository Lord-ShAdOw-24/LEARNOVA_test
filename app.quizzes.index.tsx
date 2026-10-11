import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RankBadge } from "./-components-brand-rank-badge.tsx";
import { DisplayName } from "./-components-brand-marks.tsx";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { LEADERBOARD_SEEDS, QUIZ_SUBJECTS, type Difficulty } from "./-lib-data-quizzes.ts";
import { streakFromDates } from "./-lib-identity.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/quizzes/")({ component: Quizzes });

function Quizzes() {
  const [level, setLevel] = useState<"O-Level" | "A-Level">("O-Level");
  const [subject, setSubject] = useState("Mathematics");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const history = useLearnova((s) => s.quizHistory);
  const bests = useLearnova((s) => s.bests);
  const username = useLearnova((s) => s.username);
  const school = useLearnova((s) => s.school);
  const myStreak = useLearnova((s) => streakFromDates(s.activityDates));

  const subjects = QUIZ_SUBJECTS[level];
  const category = `${level}:${subject}:${difficulty}`;
  const mine = bests[category];

  const board = useMemo(() => {
    const rows = LEADERBOARD_SEEDS.filter(
      (r) => r.subject === subject && (difficulty === "high" || r.difficulty === difficulty),
    ).map((r, i) => ({ ...r, me: false, pos: i }));
    if (mine) {
      rows.push({
        name: username,
        school: school || "Independent",
        subject,
        difficulty,
        percent: mine.percent,
        rank: mine.rank,
        streak: myStreak,
        me: true,
        pos: 99,
      });
    }
    return rows.sort((a, b) => b.percent - a.percent).slice(0, 10);
  }, [difficulty, mine, myStreak, school, subject, username]);

  return (
    <Page kicker="Quizzes" title="Play, then climb.">
      <Card className="mb-4">
        <p className="text-xs text-muted">20 seconds a question · leaving ends the attempt</p>
        <div className="mt-3 flex gap-2">
          {(["O-Level", "A-Level"] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => {
                setLevel(lv);
                setSubject(QUIZ_SUBJECTS[lv][0]);
              }}
              className={`h-9 rounded-full px-3 text-sm ${level === lv ? "bg-navy text-cream" : "border border-border"}`}
            >
              {lv}
            </button>
          ))}
        </div>
        <label className="mt-3 block text-sm">
          Subject
          <select
            className="mt-1 h-11 w-full rounded-2xl border border-border bg-background px-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <div className="mt-3 flex gap-2">
          {(["low", "medium", "high"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`h-9 flex-1 rounded-full text-sm capitalize ${
                difficulty === d ? "bg-gold text-navy" : "border border-border"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <Button asChild className="mt-4 w-full">
          <Link to="/app/quizzes/play" search={{ level, subject, difficulty }}>
            Start quiz
          </Link>
        </Button>
      </Card>

      <h2 className="mb-2 font-display text-xl">Category leaderboard</h2>
      <p className="mb-2 text-xs text-muted">Best attempt only · {subject} · {difficulty}</p>
      <div className="space-y-2">
        {board.map((r, i) => (
          <Card key={`${r.name}-${i}`} className={r.me ? "border-gold" : ""}>
            <div className="flex items-center gap-3">
              <span className="w-6 tabular-nums text-sm text-muted">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  <DisplayName name={r.name} streak={"streak" in r ? r.streak : 0} />
                </p>
                <p className="truncate text-xs text-muted">{r.school}</p>
              </div>
              <span className="text-sm tabular-nums">{r.percent}%</span>
              <RankBadge rank={r.rank} />
            </div>
          </Card>
        ))}
      </div>

      {history.length ? (
        <>
          <h2 className="mt-6 mb-2 font-display text-xl">History</h2>
          {history.slice(0, 6).map((h) => (
            <Card key={h.id} className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm">
                  {h.subject} · {h.difficulty}
                </p>
                <p className="text-xs text-muted">{new Date(h.at).toLocaleString()}</p>
              </div>
              <RankBadge rank={h.rank} />
            </Card>
          ))}
        </>
      ) : null}
    </Page>
  );
}
