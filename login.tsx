import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Wordmark } from "./-components-brand-logo.tsx";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Button } from "./-components-ui-button.tsx";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "./-lib-auth-client.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const { error: err } = await authClient.signIn.email({ email, password, callbackURL: "/app" });
    setPending(false);
    if (err) {
      setError(err.message ?? "Could not sign in.");
      return;
    }
    useLearnova.getState().setProfile({
      guest: false,
      onboarded: true,
      username: email.split("@")[0] ?? "Student",
    });
    nav({ to: "/app" });
  }

  return (
    <PhoneStage>
      <main className="px-5 py-8">
        <Wordmark />
        <h1 className="mt-8 font-display text-3xl">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Email, phone-style username, or a social account.</p>
        <form onSubmit={onEmail} className="mt-6 space-y-3">
          <label className="block text-sm">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
            />
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Log in"}
          </Button>
        </form>
        {authEnabled ? (
          <div className="mt-5 space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/app" })}
              >
                Continue with {p.label}
              </Button>
            ))}
          </div>
        ) : null}
        <p className="mt-6 text-sm text-muted">
          New here?{" "}
          <Link to="/register" className="text-navy dark:text-gold">
            Create an account
          </Link>
        </p>
        <a href="/learnova-app.zip" download="learnova-app.zip" className="mt-6 block text-center text-sm font-semibold text-navy dark:text-gold">
          Télécharger l’application (zip)
        </a>
      </main>
    </PhoneStage>
  );
}
