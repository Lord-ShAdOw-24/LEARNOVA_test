import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Download } from "lucide-react";
import { useState } from "react";
import { Page, Card } from "./-components-layout-page.tsx";
import { Button } from "./-components-ui-button.tsx";
import { resourceById } from "./-lib-data-catalog.ts";
import { useLearnova } from "./-lib-store.ts";

export const Route = createFileRoute("/app/resource/$id")({ component: ResourceView });

function kindLabel(kind: string) {
  if (kind === "questions") return "GCE Past Questions";
  if (kind === "answers") return "Answers to Past Questions";
  if (kind === "paper") return "Entrance Exam (Concours) Past Questions and Answers";
  return kind;
}

function ResourceView() {
  const { id } = Route.useParams();
  const item = resourceById(id);
  const credits = useLearnova((s) => s.credits);
  const unlocked = useLearnova((s) => s.unlocked);
  const saved = useLearnova((s) => s.saved);
  const downloads = useLearnova((s) => s.downloads);
  const username = useLearnova((s) => s.username);
  const [showCorrection, setShowCorrection] = useState(false);
  const [payState, setPayState] = useState<"idle" | "confirm" | "done" | "short">("idle");

  if (!item) {
    return (
      <Page title="Missing">
        <p className="text-sm text-muted">That resource is not in the catalogue.</p>
      </Page>
    );
  }

  const pair = item.pairId ? resourceById(item.pairId) : undefined;
  const open = Boolean(item.free || item.credits === 0 || unlocked.includes(item.id));
  const body = showCorrection ? item.correction ?? item.body : item.body;

  function buy() {
    const ok = useLearnova.getState().unlock(item!.id, item!.credits, item!.title);
    setPayState(ok ? "done" : "short");
  }

  return (
    <Page kicker={item.level} title={item.title}>
      <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">{kindLabel(item.kind)}</p>
      <p className="mb-3 text-sm text-muted">
        {item.subtitle} · {item.subject}
        {item.year ? ` · ${item.year}` : ""}
        {item.session ? ` · ${item.session}` : ""}
        {item.questionCount ? ` · ${item.questionCount} questions` : ""}
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-border"
          onClick={() => useLearnova.getState().toggleSaved(item.id)}
          aria-label="Save"
        >
          <Bookmark className={saved.includes(item.id) ? "size-4 fill-gold text-gold" : "size-4"} />
        </button>
        {open ? (
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm"
            onClick={() => useLearnova.getState().markDownloaded(item.id)}
          >
            <Download className="size-4" />
            {downloads.includes(item.id) ? "Saved offline" : "Download in-app"}
          </button>
        ) : null}
        <Link to="/app/explore" search={{}} className="grid h-11 place-items-center rounded-full border border-border px-4 text-sm">
          Explorer
        </Link>
      </div>

      {pair ? (
        <Link to="/app/resource/$id" params={{ id: pair.id }} className="mb-4 block">
          <Card>
            <p className="text-[11px] text-muted">Linked file</p>
            <p className="font-medium">{pair.title}</p>
            <p className="text-xs text-muted">
              {item.kind === "questions"
                ? "Answers are a separate PDF with its own unlock."
                : "Questions PDF is independent — often free."}
            </p>
          </Card>
        </Link>
      ) : null}

      {!open ? (
        <Card className="mb-4">
          <p className="font-display text-lg">Locked content</p>
          <p className="mt-1 text-sm text-muted">
            Unlock with {item.credits} L-Credits. Balance {credits}. Documents stay inside Learnova — no export.
          </p>
          {payState === "short" ? <p className="mt-2 text-sm text-danger">Not enough L-Credits. Open Wallet.</p> : null}
          {payState === "confirm" ? (
            <div className="mt-3 flex gap-2">
              <Button onClick={buy}>Confirm {item.credits} L</Button>
              <Button variant="outline" onClick={() => setPayState("idle")}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button className="mt-3" onClick={() => setPayState("confirm")}>
              Unlock
            </Button>
          )}
        </Card>
      ) : (
        <div className="protected-doc relative overflow-hidden rounded-[22px] border border-border bg-card">
          <div className="watermark absolute inset-0" />
          <div className="relative space-y-3 p-4">
            <p className="text-[11px] text-muted">
              In-app only · {username} · {new Date().toLocaleDateString()}
            </p>
            {item.kind === "video" ? (
              <div className="grid aspect-video place-items-center rounded-2xl bg-navy text-cream">
                <p className="text-sm">{item.durationMin} min lesson · play in Learnova</p>
              </div>
            ) : null}
            {item.correction ? (
              <div className="flex gap-2">
                <Button size="sm" variant={showCorrection ? "outline" : "navy"} onClick={() => setShowCorrection(false)}>
                  Paper
                </Button>
                <Button size="sm" variant={showCorrection ? "navy" : "outline"} onClick={() => setShowCorrection(true)}>
                  Correction
                </Button>
              </div>
            ) : null}
            {body.map((para, i) => (
              <p key={i} className="text-sm leading-6">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
}
