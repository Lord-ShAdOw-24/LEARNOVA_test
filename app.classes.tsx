import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/classes")({ component: ClassesLayout });

function ClassesLayout() {
  return <Outlet />;
}
