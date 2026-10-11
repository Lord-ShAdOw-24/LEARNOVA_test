import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Page, Card } from "./-components-layout-page.tsx";

export const Route = createFileRoute("/faq")({ component: FAQ });

const QA = [
  ["How do I log in?", "Email + password, or Google / X. Phone numbers can be stored on your profile; SMS login is not used in this build."],
  ["What are L-Credits?", "Learnova’s internal currency for papers, corrections and packs. Premium grants a monthly allocation."],
  ["Can I screenshot papers?", "The product rule is no screenshots or exports. On the web we watermark and block selection; native apps enforce more."],
  ["What if I leave a quiz?", "The attempt is terminated and graded on answers already given."],
  ["How are teachers paid?", "After 30 days of escrow: 85% standard, 90% if certified."],
];

function FAQ() {
  return (
    <PhoneStage>
      <Page kicker="FAQ" title="Common questions.">
        {QA.map(([q, a]) => (
          <Card key={q} className="mb-3">
            <h2 className="font-display text-lg">{q}</h2>
            <p className="mt-1 text-sm text-muted">{a}</p>
          </Card>
        ))}
        <Link to="/" className="text-sm text-navy dark:text-gold">
          Back home
        </Link>
      </Page>
    </PhoneStage>
  );
}
