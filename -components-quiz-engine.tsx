import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RankBadge } from "./-components-brand-rank-badge.tsx";
import { Button } from "./-components-ui-button.tsx";
import { pickQuestions, type Difficulty } from "./-lib-data-quizzes.ts";
import { rankFromPercent, type Rank } from "./-lib-ranking.ts";
import { useLearnova } from "./-lib-store.ts";

const SECONDS = 20;

export function QuizEngine({
  level,
  subject,
  difficulty,
}: {
  level: "O-Level" | "A-Level";
  subject: string;
  difficulty: Difficulty;
}) {
  const [items] = useState(() => pickQuestions(level, subject, difficulty, 10));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(() => items.map(() => null));
  const [left, setLeft] = useState(SECONDS);
  const [done, setDone] = useState(false);
  const [aborted, setAborted] = useState(false);
  const recorded = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const finish = (abort = false) => {
    setAborted(abort);
    setDone(true);
  };

  useEffect(() => {
    if (done) return;
    setLeft(SECONDS);
    const t = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          goNext(null);
          return SECONDS;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, done]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && !done) finish(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [done]);

  function goNext(choice: number | null) {
    const next = answersRef.current.map((v, idx) => (idx === i ? choice : v));
    setAnswers(next);
    answersRef.current = next;
    setPicked(null);
    if (i + 1 >= items.length) finish(false);
    else setI((n) => n + 1);
  }

  const score = answers.reduce<number>((acc, a, idx) => acc + (a === items[idx]?.answer ? 1 : 0), 0);
  const percent = items.length ? Math.round((score / items.length) * 100) : 0;
  const rank: Rank = rankFromPercent(percent);

  useEffect(() => {
    if (!done || recorded.current) return;
    recorded.current = true;
    useLearnova.getState().recordQuiz({
      id: crypto.randomUUID(),
      category: `${level}:${subject}:${difficulty}`,
      subject,
      difficulty,
      level,
      percent,
      score,
      total: items.length,
      rank,
      at: new Date().toISOString(),
      aborted,
    });
    useLearnova.getState().recordMistakes(
      items
        .map((q, idx) => ({ q, idx }))
        .filter(({ q, idx }) => answers[idx] !== q.answer)
        .map(({ q }) => ({
          id: crypto.randomUUID(),
          questionId: q.id,
          prompt: q.prompt,
          explanation: q.explanation,
          subject,
          level,
          at: new Date().toISOString(),
          mastered: false,
        })),
    );
  }, [done, aborted, answers, difficulty, items, level, percent, rank, score, subject]);

  if (done) {
    return (
      <main className="flex min-h-dvh flex-col px-5 py-8">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">Result</p>
        <h1 className="mt-1 font-display text-3xl">{aborted ? "Attempt closed" : "Rank awarded"}</h1>
        {aborted ? (
          <p className="mt-2 text-sm text-muted">
            You left Learnova during a timed activity. The session was graded on answers already submitted.
          </p>
        ) : null}
        <div className="mt-6 flex items-center gap-4 rounded-[24px] border border-border bg-card p-5">
          <div>
            <p className="text-sm text-muted">Score</p>
            <p className="font-display text-4xl tabular-nums">
              {score}/{items.length}
            </p>
            <p className="text-sm tabular-nums text-muted">{percent}%</p>
          </div>
          <RankBadge rank={rank} className="ml-auto h-12 min-w-12 text-base" />
        </div>
        <ul className="mt-5 space-y-2">
          {items.map((q, idx) => {
            const ok = answers[idx] === q.answer;
            return (
              <li key={q.id} className="rounded-2xl border border-border bg-card p-3 text-sm">
                <p className={ok ? "text-ok" : "text-danger"}>{ok ? "Correct" : "Missed"}</p>
                <p className="mt-1">{q.prompt}</p>
                <p className="mt-1 text-muted">{q.explanation}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-col gap-2">
          <Button asChild>
            <Link to="/app/quizzes">Leaderboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app">Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  const q = items[i];
  if (!q) return null;

  return (
    <main className="flex min-h-dvh flex-col px-5 py-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {subject} · {difficulty}
        </span>
        <span className="tabular-nums">
          {i + 1}/{items.length}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full bg-gold transition-[width] duration-1000 ease-linear"
          style={{ width: `${(left / SECONDS) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-right font-display text-2xl tabular-nums">{left}s</p>
      <h1 className="mt-4 font-display text-2xl leading-snug">{q.prompt}</h1>
      <div className="mt-6 flex flex-1 flex-col gap-2">
        {q.choices.map((c, idx) => (
          <button
            key={c}
            type="button"
            onClick={() => setPicked(idx)}
            className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm ${
              picked === idx ? "border-gold bg-gold/15" : "border-border bg-card"
            }`}
          >
            <span className="mr-2 font-semibold text-muted">{String.fromCharCode(65 + idx)}.</span>
            {c}
          </button>
        ))}
      </div>
      <Button className="mt-4 w-full" disabled={picked === null} onClick={() => goNext(picked)}>
        Lock answer
      </Button>
      <p className="mt-3 text-center text-[11px] text-muted">
        Leaving Learnova ends this attempt.
      </p>
    </main>
  );
}
