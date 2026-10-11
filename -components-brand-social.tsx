import { BrandMark } from "./-components-brand-marks.tsx";
import { cn } from "./-lib-utils.ts";

export const SOCIAL_LINKS = [
  { id: "web", src: "/brand-social-globe.png", label: "Website", href: "/" },
  { id: "whatsapp", src: "/brand-social-whatsapp.png", label: "WhatsApp", href: "https://wa.me/237600000000" },
  { id: "telegram", src: "/brand-social-telegram.png", label: "Telegram", href: "https://t.me/learnova" },
  { id: "facebook", src: "/brand-social-facebook.png", label: "Facebook", href: "https://facebook.com/learnova" },
  { id: "youtube", src: "/brand-social-youtube.png", label: "YouTube", href: "https://youtube.com/@learnova" },
  { id: "snapchat", src: "/brand-social-snapchat.png", label: "Snapchat", href: "https://www.snapchat.com/add/learnova" },
] as const;

export function SocialRow({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.id}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel={s.href.startsWith("http") ? "noreferrer" : undefined}
          className="grid size-12 place-items-center rounded-2xl border border-border bg-card"
          aria-label={s.label}
          title={s.label}
        >
          <BrandMark src={s.src} alt="" size={compact ? 22 : 26} />
        </a>
      ))}
      <span
        className="grid size-12 place-items-center rounded-2xl border border-dashed border-border bg-card"
        title="iOS app coming"
        aria-label="iOS app coming"
      >
        <BrandMark src="/brand-social-apple.png" alt="" size={compact ? 22 : 26} />
      </span>
    </div>
  );
}
