import type { CSSProperties, FocusEvent, PointerEvent } from "react";
import { PlusIcon } from "@/components/ui/icons";
import type { Pillar, PillarSlug } from "@/types/content";

export type PillarCardData = Pick<Pillar, "titulo" | "slug" | "mensagemChave" | "servicos">;

export type PillarCardHandlers = {
  onTrigger: (index: number) => void;
  onTriggerFocus: (index: number, e: FocusEvent<HTMLButtonElement>) => void;
  onCardPointerEnter: (index: number, e: PointerEvent<HTMLLIElement>) => void;
};

/** Thin-stroke decorative motif per pillar (zooms 1 → 1.05 when the card is active). */
function PillarArt({ variant }: { variant: PillarSlug }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="pillar-art"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {variant === "clinica" && (
        <>
          <circle cx="80" cy="80" r="22" />
          <circle cx="80" cy="80" r="42" opacity="0.7" />
          <circle cx="80" cy="80" r="62" opacity="0.45" />
        </>
      )}
      {variant === "cirurgica-prevencao" && (
        <>
          <circle cx="80" cy="80" r="56" />
          <circle cx="80" cy="80" r="6" />
          <path d="M80 14v30M80 116v30M14 80h30M116 80h30" />
          <path d="M60 80h-6M106 80h-6M80 60v-6M80 106v-6" opacity="0.6" />
        </>
      )}
      {variant === "estetica" && (
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
 * Pure markup for the pillar cards — no hooks, no "use client".
 * Rendered on the server as the static first state (zero JS) and reused by the interactive
 * PillarCards island once it loads, so both renders match and nothing shifts.
 */
export function PillarCardsView({
  pillars,
  active,
  handlers,
}: {
  pillars: PillarCardData[];
  active: number | null;
  handlers?: PillarCardHandlers;
}) {
  const columns = pillars.map((_, i) => (i === active ? "1.6fr" : "1fr")).join(" ");

  return (
    <ul
      className="pillars-grid mt-12 grid gap-4 lg:mt-16 lg:gap-6"
      style={{ "--pillar-cols": columns } as CSSProperties}
    >
      {pillars.map((pillar, i) => {
        const isActive = active === i;
        const triggerId = `pilar-${pillar.slug}-trigger`;
        const panelId = `pilar-${pillar.slug}-servicos`;
        return (
          <li
            key={pillar.slug}
            data-active={isActive || undefined}
            onPointerEnter={handlers ? (e) => handlers.onCardPointerEnter(i, e) : undefined}
            className="pillar-card relative isolate flex flex-col overflow-hidden rounded-card border"
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
                <span className="col-start-1 mt-4 font-display text-[1.75rem] leading-[1.1] font-normal text-cacau lg:text-[2rem]">
                  {pillar.titulo}
                </span>
                <span className="col-start-1 mt-3 font-display text-lg leading-snug font-light text-cacau/85 italic">
                  “{pillar.mensagemChave}”
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isActive}
              className="pillar-panel"
            >
              <div className="overflow-hidden">
                <ul className="pillar-services px-6 pb-8 lg:px-8">
                  {pillar.servicos.map((service, j) => (
                    <li
                      key={service}
                      style={{ "--i": j } as CSSProperties}
                      className="flex items-baseline gap-3 border-t border-areia py-2.5 text-[0.9375rem] text-cacau"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-rose"
                      />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none mt-auto hidden justify-end p-8 text-rose lg:flex"
            >
              <PillarArt variant={pillar.slug} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
