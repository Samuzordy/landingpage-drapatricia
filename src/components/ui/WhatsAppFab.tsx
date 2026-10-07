import { ChatIcon } from "./icons";

export type WhatsAppFabProps = {
  /** wa.me link with default message + UTM — built by lib/whatsapp.ts in Etapa 3. */
  href: string;
  label?: string;
  /** "fixed" (default) pins it bottom-right on every section; "static" for previews. */
  position?: "fixed" | "static";
  className?: string;
};

/**
 * Floating WhatsApp button (spec section 06). 56px target, safe-area aware, opens in a new tab.
 * The text label slides in on hover (fine pointers) and on keyboard focus; on touch the
 * accessible name comes from aria-label. Server Component.
 */
export function WhatsAppFab({
  href,
  label = "Agendar pelo WhatsApp",
  position = "fixed",
  className = "",
}: WhatsAppFabProps) {
  const placement =
    position === "fixed"
      ? "fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50"
      : "relative";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (abre em nova aba)`}
      className={`fab group inline-flex items-center ${placement} ${className}`}
    >
      <span
        aria-hidden="true"
        className="fab-label pointer-events-none absolute right-full mr-3 rounded-pill bg-cacau px-4 py-2 text-sm font-semibold whitespace-nowrap text-porcelana shadow-warm"
      >
        {label}
      </span>
      <span className="grid size-14 place-items-center rounded-pill bg-terracota text-white shadow-warm transition-colors duration-(--dur-fast) ease-skin group-hover:bg-cacau group-focus-visible:bg-cacau">
        <ChatIcon width={26} height={26} />
      </span>
    </a>
  );
}
