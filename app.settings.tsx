import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { useLearnova, type ThemePref } from "./-lib-store.ts";
import type { Season } from "./-lib-season.ts";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  const s = useLearnova();
  return (
    <Page kicker="Settings" title="Appearance & safety">
      <Card className="mb-3">
        <p className="font-medium">Theme</p>
        <div className="mt-2 flex gap-2">
          {(["light", "dark", "system"] as ThemePref[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => s.setProfile({ theme: t })}
              className={`h-9 rounded-full px-3 text-sm capitalize ${
                s.theme === t ? "bg-navy text-cream" : "border border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>
      <Card className="mb-3">
        <p className="font-medium">Seasonal preview</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["auto", "none", "christmas", "youth", "independence"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => s.setProfile({ seasonalPreview: t as "auto" | Season })}
              className={`h-9 rounded-full px-3 text-sm capitalize ${
                s.seasonalPreview === t ? "bg-gold text-navy" : "border border-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>
      <Card className="mb-3">
        <p className="font-medium">Sessions</p>
        <p className="mt-1 text-sm text-muted">
          Standard accounts: one phone at a time. Premium raises the device cap. Purchased documents are bound to the
          device they were unlocked on.
        </p>
      </Card>
      <Card className="mb-3">
        <p className="font-medium">Language</p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            className={`h-9 rounded-full px-3 text-sm ${s.language === "en" ? "bg-navy text-cream" : "border border-border"}`}
            onClick={() => s.setProfile({ language: "en" })}
          >
            English
          </button>
          <button
            type="button"
            className={`h-9 rounded-full px-3 text-sm ${s.language === "fr" ? "bg-navy text-cream" : "border border-border"}`}
            onClick={() => s.setProfile({ language: "fr" })}
          >
            Français
          </button>
        </div>
      </Card>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/terms">Terms</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <Button
        variant="danger"
        className="mt-6 w-full"
        onClick={() => {
          if (confirm("Reset local Learnova data on this device?")) s.resetLocal();
        }}
      >
        Clear local data
      </Button>
    </Page>
  );
}
