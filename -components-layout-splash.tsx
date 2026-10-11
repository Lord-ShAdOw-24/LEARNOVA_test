import { Wordmark } from "./-components-brand-logo.tsx";
import { NovaFace } from "./-components-brand-nova.tsx";
import { useLearnova } from "./-lib-store.ts";

export function Splash() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden bg-navy px-6 py-10 text-cream">
      <div className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      <Wordmark invert />
      <div className="relative flex flex-col items-center">
        <NovaFace className="nova-bob h-32 w-32" />
        <p className="mt-5 font-display text-3xl">Learn. Grow. Succeed.</p>
        <p className="mt-2 text-sm text-gold-soft">GCE · Cameroon</p>
      </div>
      <div className="relative flex w-full flex-col gap-2">
        <a
          href="/learnova-app.zip"
          download="learnova-app.zip"
          className="grid h-14 place-items-center rounded-full bg-gold text-base font-bold text-navy"
        >
          Télécharger le zip
        </a>
        <p className="text-center text-xs text-gold-soft">Le fichier s’appelle learnova-app.zip</p>
        <button
          type="button"
          className="grid h-12 place-items-center rounded-full border border-gold/50 text-sm"
          onClick={() => useLearnova.getState().setProfile({ seenSplash: true })}
        >
          Entrer dans l’application
        </button>
      </div>
    </main>
  );
}
