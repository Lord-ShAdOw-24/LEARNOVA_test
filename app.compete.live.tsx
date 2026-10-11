import { createFileRoute } from "@tanstack/react-router";
import { QuizEngine } from "./-components-quiz-engine.tsx";
import type { Difficulty } from "./-lib-data-quizzes.ts";

type Search = { room: string; difficulty: Difficulty };

export const Route = createFileRoute("/app/compete/live")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    room: typeof s.room === "string" ? s.room : "Room",
    difficulty: s.difficulty === "low" || s.difficulty === "high" ? s.difficulty : "medium",
  }),
  component: Live,
});

function Live() {
  const { difficulty } = Route.useSearch();
  return <QuizEngine level="O-Level" subject="Mathematics" difficulty={difficulty} />;
}
