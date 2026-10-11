import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Compass,
  GraduationCap,
  Home,
  Menu,
  MessageCircle,
  Search,
  Swords,
  UserRound,
  Wallet,
  X,
  Sparkles,
  Trophy,
  Settings,
  Megaphone,
  LifeBuoy,
  Crown,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Wordmark } from "./-components-brand-logo.tsx";
import { NovaTip } from "./-components-brand-nova.tsx";
import { PhoneStage } from "./-components-layout-phone.tsx";
import { NOTICES } from "./-lib-data-community.ts";
import { resolveSeason, seasonCopy } from "./-lib-season.ts";
import { useLearnova } from "./-lib-store.ts";
import { cn } from "./-lib-utils.ts";

const TABS = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/explore", label: "Explorer", icon: Compass },
  { to: "/app/quizzes", label: "Quizzes", icon: Trophy },
  { to: "/app/compete", label: "Compete", icon: Swords },
  { to: "/app/profile", label: "Me", icon: UserRound },
] as const;

const DRAWER = [
  { to: "/app/explore", label: "Explorer", icon: Compass },
  { to: "/app/library", label: "All files", icon: BookOpen },
  { to: "/app/classes", label: "Online classes", icon: GraduationCap },
  { to: "/app/lai", label: "L-Ai assistant", icon: Sparkles },
  { to: "/app/wallet", label: "Wallet & Premium", icon: Wallet },
  { to: "/app/mistakes", label: "My mistakes", icon: BookOpen },
  { to: "/app/progress", label: "Progress", icon: Trophy },
  { to: "/app/saves", label: "Saves & downloads", icon: BookOpen },
  { to: "/app/trust", label: "Trust marks", icon: Shield },
  { to: "/app/notices", label: "Official notices", icon: Megaphone },
  { to: "/app/revision", label: "GCE revision mode", icon: BookOpen },
  { to: "/app/search", label: "Search", icon: Search },
  { to: "/app/parent", label: "Parent view", icon: UserRound },
  { to: "/app/settings", label: "Settings", icon: Settings },
  { to: "/faq", label: "Help / FAQ", icon: LifeBuoy },
  { to: "/premium", label: "Plans", icon: Crown },
];

function usePath() {
  return useRouterState({ select: (s) => s.location.pathname });
}

export function AppShell() {
  const path = usePath();
  const hideChrome = path.includes("/quizzes/play") || path.includes("/compete/live");
  const credits = useLearnova((s) => s.credits);
  const username = useLearnova((s) => s.username);
  const read = useLearnova((s) => s.notificationsRead);
  const unread = NOTICES.filter((n) => !read.includes(n.id)).length;
  const season = resolveSeason(useLearnova((s) => s.seasonalPreview));
  const seasonText = seasonCopy(season);
  const [drawer, setDrawer] = useState(false);
  const [notes, setNotes] = useState(false);

  const tip =
    path.startsWith("/app/explore")
      ? "GCE first. Concours is Pending. Questions and answers are two different PDFs."
      : path.startsWith("/app/library")
        ? "Past papers stay inside Learnova. Unlock with L-Credits — I cannot bypass that."
        : path.startsWith("/app/quizzes")
          ? "Twenty seconds a question. Leave the app and the attempt is graded immediately."
          : path.startsWith("/app/compete")
            ? "Rooms, the monthly official, then the National Hackathon. School ID is required to qualify."
            : path.startsWith("/app/lai")
              ? "Ask me syllabus questions. I will not unlock paid documents."
              : path.startsWith("/app/trust") || path.startsWith("/app/classes")
                ? "Blue check is verified. SCAN is reports. Snowflake is freeze. Ban is final."
                : "Welcome back. Explorer, a quiz, or a class — pick one and begin.";

  return (
    <PhoneStage>
      {seasonText ? (
        <div className="season-bar px-4 py-1.5 text-center text-[11px] font-medium">{seasonText}</div>
      ) : null}

      {!hideChrome ? (
        <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/90 px-3 py-2.5 backdrop-blur">
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full hover:bg-card"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <Wordmark className="min-w-0 flex-1" />
          <Link
            to="/app/wallet"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold tabular-nums"
          >
            {credits} L
          </Link>
          <button
            type="button"
            className="relative grid size-11 place-items-center rounded-full hover:bg-card"
            onClick={() => setNotes(true)}
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            {unread > 0 ? <span className="absolute top-2 right-2 size-2 rounded-full bg-gold" /> : null}
          </button>
        </header>
      ) : null}

      <div className={cn(!hideChrome && "pb-28")}>
        {!hideChrome ? (
          <div className="px-4 pt-3">
            <NovaTip text={tip} />
          </div>
        ) : null}
        <Outlet />
      </div>

      {!hideChrome ? (
        <nav className="tabbar grid grid-cols-5 px-1 py-1.5" aria-label="Primary">
          {TABS.map((t) => {
            const active = "exact" in t && t.exact ? path === "/app" || path === "/app/" : path.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                search={t.to === "/app/explore" ? {} : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-medium",
                  active ? "bg-navy text-cream" : "text-muted",
                )}
              >
                <Icon className="size-5" />
                {t.label}
              </Link>
            );
          })}
        </nav>
      ) : null}

      {drawer ? (
        <div className="fixed inset-0 z-50 bg-navy/40" onClick={() => setDrawer(false)}>
          <aside
            className="absolute top-0 left-0 flex h-full w-[86%] max-w-xs flex-col bg-background p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <Wordmark />
              <button type="button" className="grid size-11 place-items-center" onClick={() => setDrawer(false)}>
                <X className="size-5" />
              </button>
            </div>
            <p className="mb-3 text-sm text-muted">Signed in as {username}</p>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
              {DRAWER.map((d) => {
                const Icon = d.icon;
                return (
                  <Link
                    key={d.to}
                    to={d.to}
                    search={d.to === "/app/explore" ? {} : undefined}
                    onClick={() => setDrawer(false)}
                    className="flex h-12 items-center gap-3 rounded-2xl px-3 text-sm hover:bg-card"
                  >
                    <Icon className="size-4" />
                    {d.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              to="/app/lai"
              onClick={() => setDrawer(false)}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-navy text-cream"
            >
              <MessageCircle className="size-4" />
              Talk to L-Ai
            </Link>
          </aside>
        </div>
      ) : null}

      {notes ? (
        <div className="fixed inset-0 z-50 bg-navy/40" onClick={() => setNotes(false)}>
          <div
            className="absolute top-0 right-0 h-full w-[86%] max-w-sm bg-background p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl">Notifications</h2>
              <button type="button" className="grid size-11 place-items-center" onClick={() => setNotes(false)}>
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-2">
              {NOTICES.map((n) => (
                <Link
                  key={n.id}
                  to="/app/notices"
                  search={{ id: n.id }}
                  onClick={() => {
                    useLearnova.getState().markNotices(n.id);
                    setNotes(false);
                  }}
                  className="block rounded-2xl border border-border bg-card p-3"
                >
                  <p className="text-[11px] text-muted">{n.source}</p>
                  <p className="text-sm font-medium">{n.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </PhoneStage>
  );
}
