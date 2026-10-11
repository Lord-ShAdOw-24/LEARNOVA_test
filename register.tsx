import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Wordmark } from "./-components-brand-logo.tsx";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { Button } from "./-components-ui-button.tsx";
import { CLASS_TRACKS, SCHOOLS } from "./-lib-data-catalog.ts";
import { authClient } from "./-lib-auth-client.ts";
import { useLearnova, type Role } from "./-lib-store.ts";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const nav = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [school, setSchool] = useState<string>(SCHOOLS[0] ?? "Baptist High School Buea");
  const [classLevel, setClassLevel] = useState<string>(CLASS_TRACKS[2] ?? "Form 5 Science");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function finish(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    setPending(true);
    setError(null);
    const { error: err } = await authClient.signUp.email({
      email,
      password,
      name: realName || username,
      callbackURL: "/app",
    });
    setPending(false);
    if (err) {
      setError(err.message ?? "Could not create the account.");
      return;
    }
    const code = `LN-${username.slice(0, 6).toUpperCase() || "NEW"}`;
    useLearnova.getState().setProfile({
      guest: false,
      onboarded: true,
      role,
      username: username || email.split("@")[0] || "Student",
      realName,
      school: role === "student" ? school : "",
      classLevel: role === "student" ? classLevel : "",
      kycStatus: role === "teacher" ? "pending" : "none",
      referralCode: code,
      credits: 50,
    });
    nav({ to: "/app" });
  }

  return (
    <PhoneStage>
      <main className="px-5 py-8">
        <Wordmark />
        <h1 className="mt-8 font-display text-3xl">Join Learnova</h1>
        {step === 1 ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm text-muted">Who is this account for?</p>
            {(
              [
                ["student", "Student", "Quizzes, library, competitions, L-Ai."],
                ["teacher", "Teacher", "KYC, paid groups, host-only rooms."],
                ["parent", "Parent / tutor", "Link a learner and fund their wallet."],
              ] as const
            ).map(([id, title, body]) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`w-full rounded-[22px] border p-4 text-left ${
                  role === id ? "border-gold bg-gold/10" : "border-border bg-card"
                }`}
              >
                <p className="font-display text-lg">{title}</p>
                <p className="text-sm text-muted">{body}</p>
              </button>
            ))}
            <Button className="w-full" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        ) : null}
        {step === 2 ? (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
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
            <label className="block text-sm">
              Confirm password
              <input
                required
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
              />
            </label>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        ) : null}
        {step === 3 ? (
          <form className="mt-5 space-y-3" onSubmit={finish}>
            <label className="block text-sm">
              Username
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
              />
            </label>
            <label className="block text-sm">
              Real name
              <input
                required
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
              />
            </label>
            {role === "student" ? (
              <>
                <label className="block text-sm">
                  School
                  <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
                  >
                    {SCHOOLS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  Class / series
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    className="mt-1 h-12 w-full rounded-2xl border border-border bg-card px-3"
                  >
                    {CLASS_TRACKS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </>
            ) : null}
            {role === "teacher" ? (
              <p className="rounded-2xl bg-cream p-3 text-sm text-navy dark:bg-navy-mid dark:text-cream">
                After this step your KYC (CNI + dual photo) sits in a review queue. You cannot host paid classes until
                verification.
              </p>
            ) : null}
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating…" : "Enter Learnova"}
            </Button>
          </form>
        ) : null}
        <p className="mt-6 text-sm text-muted">
          Already registered?{" "}
          <Link to="/login" className="text-navy dark:text-gold">
            Log in
          </Link>
        </p>
      </main>
    </PhoneStage>
  );
}
