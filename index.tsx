import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Sparkles, Swords, Trophy } from "lucide-react";
import { Wordmark } from "./-components-brand-logo.tsx";
import { NovaFace } from "./-components-brand-nova.tsx";
import { Onboarding } from "./-components-layout-onboarding.tsx";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Splash } from "./-components-layout-splash.tsx";
import { Button } from "./-components-ui-button.tsx";
import { SocialRow } from "./-components-brand-social.tsx";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/")({ component: Landing });

const PILLARS = [
  { icon: BookOpen, title: "Explorer", body: "GCE filters, one after another. Concours waits behind Pending." },
  { icon: Trophy, title: "Quizzes & ranks", body: "D → SSS. Best score only. National leaderboards." },
  { icon: GraduationCap, title: "Live classes", body: "Verified, SCAN, freeze or ban — trust marks sit on the group." },
  { icon: Sparkles, title: "L-Ai", body: "Academic help only. It will never unlock a paid paper." },
];

function Landing() {
  const seenSplash = useLearnova((s) => s.seenSplash);
  const tourDone = useLearnova((s) => s.tourDone);

  if (!seenSplash) {
    return (
      <PhoneStage>
        <Splash />
      </PhoneStage>
    );
  }

  if (!tourDone) {
    return (
      <PhoneStage>
        <Onboarding />
      </PhoneStage>
    );
  }

  return (
    <PhoneStage>
      <main className="relative overflow-hidden bg-navy text-cream">
        <div className="absolute -top-24 -right-16 size-64 rounded-full bg-gold/20 blur-3xl" />
        <header className="flex items-center justify-between px-5 pt-6">
          <Wordmark invert />
          <Link to="/login" className="text-sm font-semibold text-gold">
            Log in
          </Link>
        </header>
        <div className="px-5 pt-8 pb-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
            Cameroon · Anglophone sub-system
          </p>
          <h1 className="mt-2 font-display text-[2.4rem] leading-[1.05]">
            Learn. Grow.
            <br />
            Succeed.
          </h1>
          <p className="mt-3 max-w-[34ch] text-sm leading-6 text-gold-soft/90">
            Première ouverture : crée un compte, connecte-toi, ou entre en invité.
          </p>
          <div className="mt-6 flex justify-center">
            <NovaFace className="h-36 w-36" />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild size="lg" className="w-full">
              <Link to="/login">Page de connexion</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full border-gold/40 text-cream">
              <Link to="/register">Créer un compte</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="w-full text-gold-soft">
              <Link
                to="/app"
                onClick={() =>
                  useLearnova.getState().setProfile({ onboarded: true, guest: true, username: "Guest" })
                }
              >
                Explorer sans compte
              </Link>
            </Button>
          </div>
          <a
            href="/learnova-app.zip"
            download="learnova-app.zip"
            className="mt-4 grid h-12 place-items-center rounded-full bg-gold text-sm font-semibold text-navy"
          >
            Télécharger l’application (zip)
          </a>
          <a
            href="/learnova-assets.zip"
            download="learnova-assets.zip"
            className="mt-2 grid h-11 place-items-center rounded-full border border-gold/40 text-sm text-gold"
          >
            Télécharger seulement les icônes
          </a>
        </div>
      </main>
      <section className="px-5 py-8">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">Four pillars</p>
        <div className="mt-3 grid gap-3">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex gap-3 rounded-[22px] border border-border bg-card p-4">
                <div className="grid size-10 place-items-center rounded-2xl bg-navy text-gold">
                  <Icon className="size-4" />
                </div>
                <div>
                  <h2 className="font-display text-lg">{p.title}</h2>
                  <p className="text-sm text-muted">{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 rounded-[22px] bg-navy p-4 text-cream">
          <p className="text-[11px] tracking-[0.14em] text-gold uppercase">Rank ladder</p>
          <p className="mt-1 font-display text-2xl">NR · D · C · B · A · S · SS · SSS</p>
        </div>
        <p className="mt-8 text-xs text-muted">Follow Learnova</p>
        <SocialRow className="mt-2" compact />
        <p className="mt-8 flex items-center gap-2 text-xs text-muted">
          <Swords className="size-3.5" />
          Official monthly competitions 250 FCFA · National Hackathon 500 FCFA
        </p>
      </section>
    </PhoneStage>
  );
}
