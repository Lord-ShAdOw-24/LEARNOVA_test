import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/quizzes")({ component: Layout });

function Layout() {
  return <Outlet />;
}
