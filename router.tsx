import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "./-lib-error-component.tsx";
import { routeTree } from "./routeTree.gen.ts";

export function getRouter() {
  return createRouter({ routeTree, defaultErrorComponent: AppErrorComponent });
}
