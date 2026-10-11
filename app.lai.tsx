import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, Mic, Send } from "lucide-react";
import { useRef, useState } from "react";
import { NovaFace } from "./-components-brand-nova.tsx";
import { Page } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { askLai } from "./-lib-lai.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/lai")({ component: Lai });

const SHORTCUTS = [
  "Explain quadratic equations for O-Level",
  "Help me plan a week before GCE Physics Paper 2",
  "ENS Bambili — what documents do I need?",
  "Work this: a 2 A current through 6 Ω",
];

function Lai() {
  const lai = useLearnova((s) => s.lai);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);

  async function send(prompt: string) {
    const q = prompt.trim();
    if (!q || busy) return;
    setBusy(true);
    setErr(null);
    useLearnova.getState().addLai({ id: crypto.randomUUID(), role: "user", content: q, at: new Date().toISOString() });
    setText("");
    const history = [...useLearnova.getState().lai]
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }));
    const res = await askLai({ data: { prompt: q, history } });
    if (res.ok) {
      useLearnova.getState().addLai({
        id: crypto.randomUUID(),
        role: "assistant",
        content: res.text,
        at: new Date().toISOString(),
      });
    } else {
      setErr(res.error);
    }
    setBusy(false);
    requestAnimationFrame(() => box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" }));
  }

  return (
    <Page kicker="L-Ai" title="Academic only.">
      <div className="mb-3 flex items-center gap-3">
        <NovaFace className="h-16 w-16" />
        <p className="text-sm text-muted">I explain syllabus work. I will not unlock paid papers or skip L-Credits.</p>
      </div>
      <div ref={box} className="mb-3 max-h-[46vh] space-y-2 overflow-y-auto">
        {lai.length === 0 ? (
          <div className="grid gap-2">
            {SHORTCUTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-2xl border border-border bg-card px-3 py-2 text-left text-sm"
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          lai.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl px-3 py-2 text-sm leading-6 ${
                m.role === "user" ? "ml-8 bg-navy text-cream" : "mr-6 border border-border bg-card"
              }`}
            >
              {m.content}
            </div>
          ))
        )}
        {busy ? <p className="text-sm text-muted">Nova is thinking…</p> : null}
        {err ? <p className="text-sm text-danger">{err}</p> : null}
      </div>
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send(text);
        }}
      >
        <button type="button" className="grid size-11 place-items-center rounded-full border border-border" aria-label="Image">
          <ImageIcon className="size-4" />
        </button>
        <button type="button" className="grid size-11 place-items-center rounded-full border border-border" aria-label="Voice">
          <Mic className="size-4" />
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Ask a school question"
          className="flex-1 rounded-2xl border border-border bg-card px-3 py-2 text-sm"
        />
        <Button type="submit" size="icon" disabled={busy} aria-label="Send">
          <Send className="size-4" />
        </Button>
      </form>
    </Page>
  );
}
