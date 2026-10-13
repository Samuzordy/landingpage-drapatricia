import { Marquee } from "@/components/ui/Marquee";
import { PendingMark } from "@/components/ui/PendingMark";
import { site } from "@/content/site";

/**
 * Credentials band right after the Hero. Server Component using the CSS-only Marquee: slow,
 * pauses on hover/focus/toggle, static list with reduced motion.
 */
export function Credentials() {
  const { credentials } = site;
  return (
    <section aria-label={credentials.label} className="pb-10 lg:pb-14">
      <div className="container-page">
        <div className="border-y border-areia py-5">
          <Marquee
            label={credentials.label}
            duration={48}
            items={credentials.items.map((credential) => (
              <span
                key={credential.label}
                className="text-[0.8125rem] font-medium tracking-[0.14em] text-cacau uppercase"
              >
                {credential.label}
                {credential.pending && <PendingMark />}
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
