import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { MONTHLY_TRACKS, ROOMS } from "./-lib-data-community.ts";
import { useLearnova } from "./-lib-store.ts";
import { formatFcfa } from "./-lib-utils.ts";

export const Route = createFileRoute("/app/compete/")({ component: Compete });

function Compete() {
  const nav = useNavigate();
  const [tab, setTab] = useState<"rooms" | "monthly" | "hackathon">("rooms");
  const [creating, setCreating] = useState(false);
  const [roomName, setRoomName] = useState("Form 5 lightning");
  const joined = useLearnova((s) => s.roomsJoined);
  const monthly = useLearnova((s) => s.monthlyTrack);
  const hackathonPaid = useLearnova((s) => s.hackathonPaid);
  const credits = useLearnova((s) => s.credits);

  return (
    <Page kicker="Compete" title="Rooms to the national stage.">
      <div className="mb-4 flex gap-2">
        {(
          [
            ["rooms", "Rooms"],
            ["monthly", "Monthly"],
            ["hackathon", "Hackathon"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`h-9 rounded-full px-3 text-sm ${tab === id ? "bg-navy text-cream" : "border border-border"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "rooms" ? (
        <>
          <Button className="mb-3 w-full" variant="outline" onClick={() => setCreating((v) => !v)}>
            Create a student room
          </Button>
          {creating ? (
            <Card className="mb-3">
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="h-11 w-full rounded-2xl border border-border bg-background px-3"
              />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  useLearnova.getState().setProfile({ roomsJoined: [...joined, "local"] });
                  nav({ to: "/app/compete/live", search: { room: roomName, difficulty: "medium" } });
                }}
              >
                Open waiting room
              </Button>
            </Card>
          ) : null}
          <div className="space-y-2">
            {ROOMS.map((r) => (
              <Card key={r.id}>
                <p className="text-[11px] uppercase tracking-wide text-muted">{r.kind}</p>
                <p className="font-display text-lg">{r.name}</p>
                <p className="text-sm text-muted">
                  {r.subject} · {r.difficulty} · {r.players}/{r.max} · {r.starts}
                </p>
                {r.reward ? <p className="mt-1 text-sm text-gold">{r.reward}</p> : null}
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() =>
                    nav({
                      to: "/app/compete/live",
                      search: { room: r.name, difficulty: r.difficulty },
                    })
                  }
                >
                  Join
                </Button>
              </Card>
            ))}
          </div>
        </>
      ) : null}

      {tab === "monthly" ? (
        <>
          <Card className="mb-3">
            <p className="text-sm text-muted">
              One week, one session a day. Individual {formatFcfa(250)}. School teams need 10 learners. Speed plus
              accuracy.
            </p>
          </Card>
          {MONTHLY_TRACKS.map((t) => (
            <Card key={t.id} className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-medium">{t.label}</p>
                <p className="text-xs text-muted">{t.registered} registered</p>
              </div>
              <Button
                size="sm"
                variant={monthly === t.id ? "navy" : "gold"}
                onClick={() => {
                  if (monthly === t.id) return;
                  const ok = useLearnova.getState().spend(8, `Monthly ${t.label}`);
                  if (ok) useLearnova.getState().setProfile({ monthlyTrack: t.id });
                }}
              >
                {monthly === t.id ? "Registered" : "250 FCFA"}
              </Button>
            </Card>
          ))}
          <p className="text-xs text-muted">Demo charges 8 L-Credits in place of a MoMo 250 FCFA pull. Balance {credits}.</p>
        </>
      ) : null}

      {tab === "hackathon" ? (
        <Card>
          <p className="font-display text-xl">National Hackathon</p>
          <p className="mt-2 text-sm text-muted">
            O-Level: top 3 per examination class per school. A-Level: top 3 per series per school. School ID is
            mandatory. Fee {formatFcfa(500)}.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
            <li>School ranking</li>
            <li>Top 10 individuals per subject</li>
            <li>Top 3 schools share a cash prize among their three representatives</li>
          </ul>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              if (hackathonPaid) {
                nav({ to: "/app/compete/live", search: { room: "Hackathon", difficulty: "high" } });
                return;
              }
              const ok = useLearnova.getState().spend(16, "Hackathon registration");
              if (ok) useLearnova.getState().setProfile({ hackathonPaid: true });
            }}
          >
            {hackathonPaid ? "Enter holding room" : "Pay 500 FCFA (16 L demo)"}
          </Button>
          <Link to="/app/profile" className="mt-3 block text-center text-sm text-muted">
            Upload school ID on your profile first
          </Link>
        </Card>
      ) : null}
    </Page>
  );
}
