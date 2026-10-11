import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "./-components-layout-app-shell.tsx";

export const Route = createFileRoute("/app")({ component: AppShell });
