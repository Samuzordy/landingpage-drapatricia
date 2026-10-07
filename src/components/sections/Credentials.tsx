import { Marquee } from "@/components/ui/Marquee";
import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";

/**
 * Credentials band right after the Hero (spec section 06, item 02). Server Component using
 * the CSS-only Marquee: slow, pauses on hover/focus/toggle, static list with reduced motion.
 * Unconfirmed items keep a visible "a validar" mark while pending markers are on.
 */
export function Credentials() {
  return (
    <section aria-label="Credenciais" data-layer="epiderme" className="pb-10 lg:pb-14">
      <div className="container-page">
        <div className="border-y border-areia py-5">
          <Marquee
            label="Credenciais"
            duration={48}
            items={site.credentials.map((credential) => (
              <span
                key={credential.label}
                className="text-[0.8125rem] font-medium tracking-[0.14em] text-cacau uppercase"
              >
                {credential.label}
                {credential.pendente && <PendingMark />}
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
