import { Link, Outlet } from "@tanstack/react-router";
import { Wordmark } from "./-components-brand-logo.tsx";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Button } from "./-components-ui-button.tsx";

export function PublicShell() {
  return (
    <PhoneStage>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Link to="/">
          <Wordmark />
        </Link>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/register">Join</Link>
          </Button>
        </div>
      </header>
      <Outlet />
    </PhoneStage>
  );
}
