import type { ReactNode } from "react";
import { cn } from "./-lib-utils.ts";

export function Page({
  title,
  kicker,
  children,
  className,
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("px-4 pt-3 pb-8", className)}>
      {kicker ? (
        <p className="text-[11px] font-semibold tracking-[0.14em] text-gold uppercase">{kicker}</p>
      ) : null}
      {title ? <h1 className="mb-4 font-display text-[1.85rem] leading-tight">{title}</h1> : null}
      {children}
    </main>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[22px] border border-border bg-card p-4", className)}>{children}</div>
  );
}
