import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Wordmark } from "./-components-brand-logo.tsx";
import { NovaFace } from "./-components-brand-nova.tsx";
import { Button } from "./-components-ui-button.tsx";
import { useLearnova } from "./-lib-store.ts";

const SLIDES = [
  {
    kicker: "Explorer",
    title: "Find a paper in a few taps.",
    body: "Start with GCE or Concours. Learnova then shows only the next useful filters — level, subject, year, session, document type.",
  },
  {
    kicker: "Two PDFs",
    title: "Questions and answers stay apart.",
    body: "GCE Past Questions can be free. Answers to Past Questions is a separate file with its own access. Concours keeps both in one PDF, when that branch opens.",
  },
  {
    kicker: "Trust",
    title: "Ranks, streaks and safety marks.",
    body: "Play quizzes for D–SSS. A flame sits after your name from day 7. Verified teachers wear the blue check. SCAN, freeze and ban protect the campus.",
  },
];

export function Onboarding() {
  const [i, setI] = useState(0);
  const nav = useNavigate();
  const slide = SLIDES[i]!;
  const last = i === SLIDES.length - 1;

  function finish(guest: boolean) {
    useLearnova.getState().setProfile({
      tourDone: true,
      seenSplash: true,
      onboarded: true,
      guest,
      username: guest ? "Guest" : useLearnova.getState().username,
    });
  }

  function enterGuest() {
    finish(true);
    nav({ to: "/app" });
  }

  return (
    <main className="flex min-h-dvh flex-col bg-background px-5 py-8">
      <div className="flex items-center justify-between">
        <Wordmark />
        <button type="button" className="text-sm text-muted" onClick={enterGuest}>
          Skip
        </button>
      </div>
      <div className="mt-10 flex flex-1 flex-col">
        <NovaFace className="h-24 w-24" />
        <p className="mt-6 text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">{slide.kicker}</p>
        <h1 className="mt-2 font-display text-3xl leading-tight">{slide.title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{slide.body}</p>
      </div>
      <div className="mb-4 flex gap-1.5">
        {SLIDES.map((_, idx) => (
          <span key={idx} className={`h-1.5 flex-1 rounded-full ${idx <= i ? "bg-gold" : "bg-line"}`} />
        ))}
      </div>
      {last ? (
        <div className="flex flex-col gap-2">
          <Button asChild size="lg" className="w-full">
            <Link to="/register" onClick={() => finish(false)}>
              Create a Learnova account
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link to="/login" onClick={() => finish(false)}>
              Page de connexion
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="w-full">
            <Link to="/app" onClick={() => finish(true)}>
              Explorer sans compte
            </Link>
          </Button>
        </div>
      ) : (
        <Button size="lg" className="w-full" onClick={() => setI((n) => n + 1)}>
          Continue
        </Button>
      )}
    </main>
  );
}
