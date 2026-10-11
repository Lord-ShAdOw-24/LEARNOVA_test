import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { DisplayName, ModerationBanner } from "./-components-brand-marks.tsx";
import { classById, teacherById } from "./-lib-data-community.ts";
import { useLearnova } from "./-lib-store.ts";
import { formatFcfa } from "./-lib-utils.ts";

export const Route = createFileRoute("/app/classes/$id")({ component: ClassDetail });

const NO_CHATS: { from: string; text: string; at: string }[] = [];

function ClassDetail() {
  const { id } = Route.useParams();
  const cls = classById(id);
  const teacher = cls ? teacherById(cls.teacherId) : undefined;
  const enrolled = useLearnova((s) => s.enrolled.includes(id));
  const chats = useLearnova((s) => s.classChats[id]) ?? NO_CHATS;
  const username = useLearnova((s) => s.username);
  const [disclose, setDisclose] = useState(false);
  const [msg, setMsg] = useState("");
  const [report, setReport] = useState(false);
  const [joinHint, setJoinHint] = useState("");

  if (!cls || !teacher) {
    return (
      <Page title="Class missing">
        <p className="text-sm text-muted">That group is not listed.</p>
        <Link to="/app/classes" className="mt-3 inline-block text-sm font-medium text-navy dark:text-gold">
          Back to classes
        </Link>
      </Page>
    );
  }

  const group = cls;
  const status = group.moderation ?? teacher.moderation ?? "ok";
  const locked = status === "frozen" || status === "banned";

  function openGroup(paid: boolean) {
    const cost = Math.ceil(group.price / 300);
    const state = useLearnova.getState();
    if (paid) {
      if (state.credits < cost) {
        if (state.guest) {
          state.enroll(group.id);
          setDisclose(false);
          setJoinHint("");
          return;
        }
        setJoinHint("Not enough L-Credits. Open Wallet, then come back.");
        return;
      }
      const ok = state.spend(cost, `Join ${group.title}`, "escrow");
      if (!ok) {
        setJoinHint("Payment did not go through. Try Open group anyway.");
        return;
      }
    }
    state.enroll(group.id);
    setDisclose(false);
    setJoinHint("");
  }

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = msg.trim();
    if (!text) return;
    if (/\bhttps?:\/\//i.test(text) || /\b(whatsapp|off.?platform)\b/i.test(text)) {
      setReport(true);
      setMsg("");
      return;
    }
    const next = { ...(useLearnova.getState().classChats), [id]: [...chats, { from: username, text, at: new Date().toISOString() }] };
    useLearnova.getState().setProfile({ classChats: next });
    setMsg("");
  }

  return (
    <Page kicker={cls.subject} title={cls.title}>
      <ModerationBanner status={status} />
      <Card className="mb-3">
        <div className="flex items-center gap-2">
          <DisplayName name={teacher.name} verified={teacher.certified} moderation={teacher.moderation ?? "ok"} />
        </div>
        <p className="text-sm text-muted">
          {teacher.city} · {teacher.rating.toFixed(1)}/5 · {teacher.certified ? "Certified · 90% share" : "Standard · 85% share"}
          {teacher.reports ? ` · ${teacher.reports} reports` : ""}
        </p>
        <p className="mt-2 text-sm">{cls.blurb}</p>
        {status === "ok" || status === "scan" ? (
          <p className="mt-2 text-sm">
            {cls.schedule} · {formatFcfa(cls.price)}
          </p>
        ) : null}
      </Card>

      {locked ? (
        <Card>
          <p className="text-sm text-muted">
            {status === "banned"
              ? "This group is permanently closed. Learnova admins will decide whether the teacher account stays banned too."
              : "Join, chat and payments are paused until the freeze is lifted or converted to a ban."}
          </p>
          <Link to="/app/classes" className="mt-3 inline-block text-sm font-medium">
            Back to classes
          </Link>
        </Card>
      ) : !enrolled ? (
        disclose ? (
          <Card className="mb-3">
            <p className="font-display text-lg">Liability disclosure</p>
            <p className="mt-2 text-sm text-muted">
              Everything in this class is between you and the teacher. Learnova is not responsible for private
              information exchanged off the platform. Only join teachers you trust. Fees sit in escrow for 30 days.
            </p>
            {status === "scan" ? (
              <p className="mt-2 text-sm text-danger">SCAN is on. You are joining a group that is still under review.</p>
            ) : null}
            {joinHint ? <p className="mt-2 text-sm text-danger">{joinHint}</p> : null}
            <div className="mt-3 grid gap-2">
              <Button onClick={() => openGroup(true)}>Pay & join</Button>
              <Button variant="outline" onClick={() => openGroup(false)}>
                Open group
              </Button>
            </div>
          </Card>
        ) : (
          <div className="mb-3 grid gap-2">
            {joinHint ? <p className="text-sm text-danger">{joinHint}</p> : null}
            <Button className="w-full" onClick={() => openGroup(false)}>
              Open group
            </Button>
            <Button className="w-full" variant="outline" onClick={() => setDisclose(true)}>
              Join with L-Credits
            </Button>
          </div>
        )
      ) : (
        <Card>
          <p className="font-display text-lg">Class chat</p>
          <p className="text-xs text-muted">Anti-link filter is on. Report sits with Learnova admin.</p>
          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
            <p className="rounded-2xl bg-background p-2 text-sm">
              <span className="font-medium">{teacher.username}:</span> Welcome. Cameras optional. No WhatsApp moves.
            </p>
            {chats.map((m, i) => (
              <p key={i} className="rounded-2xl bg-background p-2 text-sm">
                <span className="font-medium">{m.from}:</span> {m.text}
              </p>
            ))}
          </div>
          {report ? <p className="mt-2 text-xs text-danger">Link blocked. You can report this to admin.</p> : null}
          <form onSubmit={send} className="mt-3 flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="h-11 flex-1 rounded-2xl border border-border bg-background px-3 text-sm"
              placeholder="Message"
            />
            <Button type="submit" size="sm">
              Send
            </Button>
          </form>
        </Card>
      )}
    </Page>
  );
}
