import type { CSSProperties, FocusEvent, PointerEvent } from "react";
import { PlusIcon } from "@/components/ui/icons";
import type { ServiceArea, ServiceArt as ServiceArtVariant } from "@/types/content";

export type ServiceCardData = Pick<
  ServiceArea,
  "title" | "slug" | "keyMessage" | "services" | "art"
>;

export type ServiceCardHandlers = {
  onTrigger: (index: number) => void;
  onTriggerFocus: (index: number, e: FocusEvent<HTMLButtonElement>) => void;
  onCardPointerEnter: (index: number, e: PointerEvent<HTMLLIElement>) => void;
};

const ART_CYCLE: ServiceArtVariant[] = ["rings", "reticle", "waves"];

/** Thin-stroke decorative motif per card (zooms 1 → 1.05 when the card is active). */
function ServiceArt({ variant }: { variant: ServiceArtVariant }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="service-art"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {variant === "rings" && (
        <>
          <circle cx="80" cy="80" r="22" />
          <circle cx="80" cy="80" r="42" opacity="0.7" />
          <circle cx="80" cy="80" r="62" opacity="0.45" />
        </>
      )}
      {variant === "reticle" && (
        <>
          <circle cx="80" cy="80" r="56" />
          <circle cx="80" cy="80" r="6" />
          <path d="M80 14v30M80 116v30M14 80h30M116 80h30" />
          <path d="M60 80h-6M106 80h-6M80 60v-6M80 106v-6" opacity="0.6" />
        </>
      )}
      {variant === "waves" && (
        <>
          <path d="M18 104c22-30 42-30 62 0s40 30 62 0" />
          <path d="M18 80c22-30 42-30 62 0s40 30 62 0" opacity="0.7" />
          <path d="M18 56c22-30 42-30 62 0s40 30 62 0" opacity="0.45" />
        </>
      )}
    </svg>
  );
}

/**
 * Pure markup for the service cards — no hooks, no "use client".
 * Rendered on the server as the static first state (zero JS) and reused by the interactive
 * ServiceCards island once it loads, so both renders match and nothing shifts.
 */
export function ServiceCardsView({
  services,
  active,
  handlers,
}: {
  services: ServiceCardData[];
  active: number | null;
  handlers?: ServiceCardHandlers;
}) {
  const columns = services.map((_, i) => (i === active ? "1.6fr" : "1fr")).join(" ");
  // 4+ areas share the row: titles stay one step smaller to keep the card padding.
  const many = services.length > 3;

  return (
    <ul
      data-count={many ? "many" : undefined}
      className="services-grid mt-12 grid gap-4 lg:mt-16 lg:gap-6"
      style={{ "--service-cols": columns } as CSSProperties}
    >
      {services.map((service, i) => {
        const isActive = active === i;
        const triggerId = `area-${service.slug}-trigger`;
        const panelId = `area-${service.slug}-servicos`;
        return (
          <li
            key={service.slug}
            data-active={isActive || undefined}
            onPointerEnter={handlers ? (e) => handlers.onCardPointerEnter(i, e) : undefined}
            className="service-card relative isolate flex flex-col overflow-hidden rounded-card border"
          >
            <h3 className="font-sans text-base font-normal">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={handlers ? () => handlers.onTrigger(i) : undefined}
                onFocus={handlers ? (e) => handlers.onTriggerFocus(i, e) : undefined}
                className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-4 p-6 text-left lg:p-8"
              >
                <span className="col-start-1 row-start-1 text-xs font-semibold tracking-[0.18em] text-cacau/70 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="col-start-2 row-span-3 row-start-1 grid size-10 place-items-center rounded-full border border-areia transition-colors duration-(--dur-fast) group-hover:border-rose group-aria-expanded:border-terracota lg:hidden"
                >
                  <PlusIcon className="accordion-icon" />
                </span>
                <span
                  className={`col-start-1 mt-4 font-display text-[1.75rem] leading-[1.1] font-normal text-cacau ${many ? "" : "lg:text-[2rem]"}`}
                >
                  {service.title}
                </span>
                <span className="col-start-1 mt-3 font-display text-lg leading-snug font-light text-cacau/90 italic">
                  “{service.keyMessage}”
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isActive}
              className="service-panel"
            >
              <div className="overflow-hidden">
                <ul className="service-list px-6 pb-8 lg:px-8">
                  {service.services.map((item, j) => (
                    <li
                      key={item}
                      style={{ "--i": j } as CSSProperties}
                      className="flex items-baseline gap-3 border-t border-areia py-2.5 text-[0.9375rem] text-cacau"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-rose"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none mt-auto hidden justify-end p-8 text-rose lg:flex"
            >
              <ServiceArt variant={service.art ?? ART_CYCLE[i % ART_CYCLE.length] ?? "rings"} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
