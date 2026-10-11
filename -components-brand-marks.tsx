import { cn } from "./-lib-utils.ts";
import { flameMeta, type Moderation } from "./-lib-identity.ts";

export function BrandMark({
  src,
  alt,
  size = 22,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block shrink-0 object-contain", className)}
      draggable={false}
    />
  );
}

export function FlameMark({ days, className }: { days: number; className?: string }) {
  const meta = flameMeta(days);
  if (!meta) return null;
  return (
    <BrandMark
      src={meta.src}
      alt={`${days}-day streak · ${meta.label}`}
      size={meta.size}
      className={cn(meta.tier === 3 && "drop-shadow-[0_0_10px_color-mix(in_oklab,var(--color-gold)_70%,transparent)]", className)}
    />
  );
}

export function VerifiedMark({ className }: { className?: string }) {
  return <BrandMark src="/brand-badges-verified.png" alt="Verified by Learnova" size={18} className={className} />;
}

export function ScanMark({ className, size = 34 }: { className?: string; size?: number }) {
  return <BrandMark src="/brand-badges-scan.png" alt="Scam warning" size={size} className={className} />;
}

export function FreezeMark({ className }: { className?: string }) {
  return <BrandMark src="/brand-badges-freeze.png" alt="Frozen — under review" size={22} className={className} />;
}

export function BanMark({ className }: { className?: string }) {
  return <BrandMark src="/brand-badges-ban.png" alt="Banned from Learnova" size={22} className={className} />;
}

export function SpendShield({ level, size = 64, className }: { level: number; size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      title={`Spend level ${level}`}
    >
      <img src="/brand-badges-shield.png" alt="" className="absolute inset-0 size-full object-contain" draggable={false} />
      <span className="relative mt-0.5 font-display font-semibold text-navy tabular-nums" style={{ fontSize: Math.round(size * 0.34) }}>
        {level}
      </span>
    </span>
  );
}

export function DisplayName({
  name,
  streak = 0,
  verified = false,
  moderation = "ok",
  className,
}: {
  name: string;
  streak?: number;
  verified?: boolean;
  moderation?: Moderation;
  className?: string;
}) {
  const banned = moderation === "banned";
  const frozen = moderation === "frozen";
  const scan = moderation === "scan";
  return (
    <span className={cn("inline-flex max-w-full items-center gap-1", className)}>
      <span className="truncate font-medium">{name}</span>
      {banned ? <BanMark /> : frozen ? <FreezeMark /> : scan ? <ScanMark size={22} /> : verified ? <VerifiedMark /> : null}
      {!banned && !frozen ? <FlameMark days={streak} /> : null}
    </span>
  );
}

export function ModerationBanner({ status }: { status: Moderation }) {
  if (status === "ok") return null;
  if (status === "scan") {
    return (
      <div className="mb-3 flex items-start gap-3 rounded-[22px] border border-danger/40 bg-danger/10 p-3">
        <ScanMark />
        <div>
          <p className="text-sm font-semibold text-danger">SCAN — under review</p>
          <p className="mt-1 text-xs text-muted">
            This group has several student reports. Learnova has not finished the review. Join only if you already trust the teacher.
          </p>
        </div>
      </div>
    );
  }
  if (status === "frozen") {
    return (
      <div className="mb-3 flex items-start gap-3 rounded-[22px] border border-border bg-card p-3">
        <FreezeMark />
        <div>
          <p className="text-sm font-semibold">Frozen</p>
          <p className="mt-1 text-xs text-muted">
            Activities are paused while Learnova reviews this account or group. It is still listed, but you cannot join, chat or pay.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-3 flex items-start gap-3 rounded-[22px] border border-danger/40 bg-danger/10 p-3">
      <BanMark />
      <div>
        <p className="text-sm font-semibold text-danger">Banned</p>
        <p className="mt-1 text-xs text-muted">
          This account or group broke Learnova rules and is permanently closed. Content is no longer accessible.
        </p>
      </div>
    </div>
  );
}
