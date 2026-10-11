import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { SocialRow } from "./-components-brand-social.tsx";
import { useState } from "react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PhoneStage>
      <Page kicker="Support" title="Contact Learnova">
        {sent ? (
          <Card>Message received. The admin team reviews class disputes, SCAN flags and KYC on weekdays.</Card>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="Your email" className="h-12 w-full rounded-2xl border border-border bg-card px-3" />
            <textarea required placeholder="How can we help?" className="h-32 w-full rounded-2xl border border-border bg-card p-3" />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        )}
        <p className="mt-6 text-xs text-muted">Channels</p>
        <SocialRow className="mt-2" compact />
        <Link to="/" className="mt-4 inline-block text-sm">
          Home
        </Link>
      </Page>
    </PhoneStage>
  );
}
