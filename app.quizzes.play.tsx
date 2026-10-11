import { createFileRoute } from "@tanstack/react-router";
import { QuizEngine } from "./-components-quiz-engine.tsx";
import type { Difficulty } from "./-lib-data-quizzes.ts";

type Search = { level: "O-Level" | "A-Level"; subject: string; difficulty: Difficulty };

export const Route = createFileRoute("/app/quizzes/play")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    level: s.level === "A-Level" ? "A-Level" : "O-Level",
    subject: typeof s.subject === "string" ? s.subject : "Mathematics",
    difficulty: s.difficulty === "low" || s.difficulty === "high" ? s.difficulty : "medium",
  }),
  component: Play,
});

function Play() {
  const { level, subject, difficulty } = Route.useSearch();
  return <QuizEngine level={level} subject={subject} difficulty={difficulty} />;
}
