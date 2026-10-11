import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/compete")({ component: Layout });

function Layout() {
  return <Outlet />;
}
