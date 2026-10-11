import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "./-components-layout-page.tsx";
import { BanMark, DisplayName, FreezeMark, ScanMark, VerifiedMark } from "./-components-brand-marks.tsx";
import { CLASSES, TEACHERS, teacherById } from "./-lib-data-community.ts";
import { formatFcfa } from "./-lib-utils.ts";

export const Route = createFileRoute("/app/classes/")({ component: Classes });

function Classes() {
  const sorted = [...CLASSES].sort((a, b) => {
    const rank = (m?: string) => (m === "banned" ? 3 : m === "frozen" ? 2 : m === "scan" ? 1 : 0);
    const ta = teacherById(a.teacherId);
    const tb = teacherById(b.teacherId);
    const mr = rank(a.moderation) - rank(b.moderation);
    if (mr !== 0) return mr;
    return Number(tb?.certified) - Number(ta?.certified);
  });
  return (
    <Page kicker="Marketplace" title="Verified teachers, escrowed fees.">
      <p className="mb-3 text-xs text-muted">
        Blue check = verified. SCAN = many reports, review pending. Snowflake = frozen. Ban = closed.
      </p>
      <div className="space-y-2">
        {sorted.map((c) => {
          const t = teacherById(c.teacherId);
          const status = c.moderation ?? t?.moderation ?? "ok";
          return (
            <Link key={c.id} to="/app/classes/$id" params={{ id: c.id }} className="block">
              <Card>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] text-muted">
                    {c.level} · {c.subject}
                  </p>
                  {status === "scan" ? (
                    <ScanMark />
                  ) : status === "frozen" ? (
                    <FreezeMark />
                  ) : status === "banned" ? (
                    <BanMark />
                  ) : t?.certified ? (
                    <VerifiedMark />
                  ) : null}
                </div>
                <p className="font-display text-lg">{c.title}</p>
                <p className="text-sm text-muted">
                  <DisplayName
                    name={t?.name ?? "Teacher"}
                    verified={Boolean(t?.certified)}
                    moderation={status}
                  />
                  {status === "ok" ? ` · ${c.schedule}` : null}
                </p>
                {status === "banned" ? (
                  <p className="mt-1 text-sm text-danger">Group closed. Not accessible.</p>
                ) : status === "frozen" ? (
                  <p className="mt-1 text-sm">Activities paused during review.</p>
                ) : (
                  <p className="mt-1 text-sm tabular-nums">
                    {formatFcfa(c.price)} · {c.taken}/{c.seats} seats
                  </p>
                )}
                <p className="mt-2 text-sm font-semibold text-navy dark:text-gold">Open group →</p>
              </Card>
            </Link>
          );
        })}
      </div>
      <h2 className="mt-6 mb-2 font-display text-xl">Teachers</h2>
      {TEACHERS.map((t) => (
        <Card key={t.id} className="mb-2">
          <DisplayName name={t.name} verified={t.certified} moderation={t.moderation ?? "ok"} />
          <p className="text-sm text-muted">
            {t.subjects.join(" · ")} · {t.city}
            {t.reports ? ` · ${t.reports} reports` : ""}
          </p>
        </Card>
      ))}
    </Page>
  );
}
