import { PendingMark } from "@/components/ui/PendingMark";
import { isPending, site } from "@/content/site";
import type { DifferentialIcon } from "@/types/content";

/** Thin-stroke icons in the same 1.5px line language as the rest of the system. */
function Icon({ name }: { name: DifferentialIcon }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  switch (name) {
    case "escuta": // ear-like curve: listening
      return (
        <svg {...common}>
          <path d="M8 9.5a4.5 4.5 0 1 1 8.2 2.6c-1 1.4-2.2 2-2.2 3.6 0 1.7-1.2 3.3-3 3.3-1.2 0-2.1-.6-2.6-1.5" />
          <path d="M10.4 10a2 2 0 1 1 3 1.7" />
        </svg>
      );
    case "evidencia": // open book with a marker line
      return (
        <svg {...common}>
          <path d="M12 6.5C10.4 5.3 8 5 4.5 5.2v12.6c3.5-.2 5.9.1 7.5 1.3 1.6-1.2 4-1.5 7.5-1.3V5.2C16 5 13.6 5.3 12 6.5z" />
          <path d="M12 6.5v12.6M7 9h2.6M7 12h2.6M14.4 9H17" />
        </svg>
      );
    case "dermatoscopia": // lens with reticle (echoes the hero lens)
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6" />
          <circle cx="10.5" cy="10.5" r="1.2" />
          <path d="M10.5 6.5v1.6M10.5 12.9v1.6M6.5 10.5h1.6M12.9 10.5h1.6M15 15l4.5 4.5" />
        </svg>
      );
    case "enderecos": // three pins
      return (
        <svg {...common}>
          <path d="M12 20s-4.5-4.3-4.5-8a4.5 4.5 0 0 1 9 0c0 3.7-4.5 8-4.5 8z" />
          <circle cx="12" cy="12" r="1.5" />
          <path d="M4.5 18.5s-2-2-2-3.8a2 2 0 0 1 4-.2M19.5 18.5s2-2 2-3.8a2 2 0 0 0-4-.2" />
        </svg>
      );
    case "idiomas": // speech bubble with two strokes
      return (
        <svg {...common}>
          <path d="M5 6.5h14v9H11l-4 3v-3H5z" />
          <path d="M8.5 10h7M8.5 12.5h4.5" />
        </svg>
      );
    case "formacao": // academic cap
      return (
        <svg {...common}>
          <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
          <path d="M6.5 11.5v4c1.4 1.3 3.3 2 5.5 2s4.1-.7 5.5-2v-4M21.5 9.5v5" />
        </svg>
      );
  }
}

/**
 * Diferenciais (#diferenciais) — 6 items from the spec (section 06). Server Component, zero JS.
 * Editorial list with thin-stroke icons and hairlines (no dashboard cards). Credibility without
 * promises (CFM 2.336/2023); unconfirmed claims keep their "a validar" mark.
 */
export function Differentials() {
  const items = site.differentials;
  const anyPending = items.some((d) => isPending(d.descricao));

  return (
    <section
      id="diferenciais"
      data-layer="derme-profunda"
      aria-labelledby="diferenciais-title"
      className="layer-profunda-2 section-space"
    >
      <div className="container-page grid-page gap-y-12">
        <div className="col-span-4 lg:col-span-4">
          <p className="kicker">Diferenciais</p>
          <h2 id="diferenciais-title" className="mt-4">
            Como é o <em className="font-light text-(--accent-text)">atendimento</em>
          </h2>
          {anyPending && (
            <p className="mt-5 text-cacau/90">
              <PendingMark label="descrições pendentes" flush />
            </p>
          )}
        </div>

        <ul className="col-span-4 grid gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.titulo}
              className="differential flex items-start gap-4 border-t border-cacau/20 py-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cacau/25 text-cacau">
                {item.icone && <Icon name={item.icone} />}
              </span>
              <div className="pt-1">
                <h3 className="font-display text-[1.375rem] leading-snug font-normal">
                  {item.titulo}
                </h3>
                {item.pendente && <PendingMark flush className="mt-2" />}
                {!isPending(item.descricao) && (
                  <p className="mt-2 text-cacau/90">{item.descricao}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
