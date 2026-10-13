import type { PointerEvent } from "react";
import type { SkinLayerId } from "./content";

/*
 * Anatomical cross-section of the skin (dermatology variant, "corte anatômico interativo").
 * Pure SVG markup — no hooks, no "use client" — so it ships as static HTML. Fine line-art in
 * the palette: stratified epidermis with rete ridges, dermis with collagen fibres, capillary
 * loops, a vessel, a hair follicle + sebaceous gland and a coiled sweat gland, and a
 * hypodermis of fat lobules. Each layer is a <g data-layer-id> the CSS can highlight.
 */

const LEFT = 20;
const RIGHT = 540;

/** Rete ridges: sinusoid between epidermis and dermis (period 50, amplitude ±11). */
const RIDGES = (() => {
  let d = `Q${LEFT + 25} 96 ${LEFT + 50} 118`;
  for (let x = LEFT + 100; x <= RIGHT - 20; x += 50) d += ` T${x} 118`;
  return d;
})();

const SURFACE = `M${LEFT} 64 C110 56 180 70 280 62 S450 56 ${RIGHT} 64`;
const SURFACE_REVERSED = `C450 72 380 54 280 62 S110 72 ${LEFT} 64`;
const DERMIS_BASE = `C450 312 360 288 280 300 S110 312 ${LEFT} 300`;

const EPIDERMIS = `M${LEFT} 118 ${RIDGES} L${RIGHT} 118 L${RIGHT} 64 ${SURFACE_REVERSED} Z`;
const DERMIS = `M${LEFT} 118 ${RIDGES} L${RIGHT} 118 L${RIGHT} 300 ${DERMIS_BASE} Z`;
const HYPODERMIS = `M${LEFT} 300 C110 312 200 288 280 300 S450 312 ${RIGHT} 300 L${RIGHT} 420 Q${RIGHT} 440 ${RIGHT - 20} 440 L${LEFT + 20} 440 Q${LEFT} 440 ${LEFT} 420 Z`;

/** Honeycomb of fat lobules for the hypodermis. */
const LOBULES = (() => {
  const cells: { cx: number; cy: number; r: number }[] = [];
  const rows = [324, 360, 396, 430];
  rows.forEach((cy, row) => {
    for (let cx = LEFT + (row % 2 ? 38 : 18); cx < RIGHT + 10; cx += 40) {
      cells.push({ cx, cy, r: 17 + ((cx + row * 7) % 5) });
    }
  });
  return cells;
})();

/** Capillary loops rising into each dermal papilla. */
const CAPILLARIES = Array.from({ length: 10 }, (_, i) => LEFT + 50 + i * 50).map(
  (x) => `M${x - 6} 150 C${x - 6} 128 ${x + 6} 128 ${x + 6} 150`,
);

type SkinCrossSectionProps = {
  active: SkinLayerId | null;
  labels: Record<SkinLayerId, string>;
  onLayerPointerEnter?: (id: SkinLayerId, e: PointerEvent<SVGGElement>) => void;
};

export function SkinCrossSection({ active, labels, onLayerPointerEnter }: SkinCrossSectionProps) {
  const layer = (id: SkinLayerId) => ({
    "data-layer-id": id,
    "data-active": active === id || undefined,
    className: "skin-layer",
    onPointerEnter: onLayerPointerEnter
      ? (e: PointerEvent<SVGGElement>) => onLayerPointerEnter(id, e)
      : undefined,
  });

  return (
    <svg
      viewBox="0 0 560 460"
      role="img"
      aria-label={`Ilustração em corte da pele, da superfície à base: ${labels.epiderme}, ${labels.derme} e ${labels.hipoderme}.`}
      className="skin-svg h-auto w-full"
      data-has-active={active ? "" : undefined}
    >
      <defs>
        <linearGradient id="sk-epi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ebe4" />
          <stop offset="1" stopColor="#efdcd0" />
        </linearGradient>
        <linearGradient id="sk-der" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ebcdbf" />
          <stop offset="1" stopColor="#dfb8a6" />
        </linearGradient>
        <linearGradient id="sk-hip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9a994" />
          <stop offset="1" stopColor="#c99581" />
        </linearGradient>
        <clipPath id="sk-hip-clip">
          <path d={HYPODERMIS} />
        </clipPath>
        <clipPath id="sk-der-clip">
          <path d={DERMIS} />
        </clipPath>
      </defs>

      {/* ---------- Hipoderme · base ---------- */}
      <g {...layer("hipoderme")}>
        <path d={HYPODERMIS} fill="url(#sk-hip)" className="skin-shape" />
        <g
          clipPath="url(#sk-hip-clip)"
          fill="#e6bba7"
          stroke="#f7f1ec"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        >
          {LOBULES.map((c) => (
            <circle key={`${c.cx}-${c.cy}`} cx={c.cx} cy={c.cy} r={c.r} />
          ))}
        </g>
        <text x={LEFT + 16} y="430" className="skin-index">
          03
        </text>
      </g>

      {/* ---------- Derme · estrutura ---------- */}
      <g {...layer("derme")}>
        <path d={DERMIS} fill="url(#sk-der)" className="skin-shape" />
        <g clipPath="url(#sk-der-clip)" fill="none" strokeLinecap="round">
          {/* collagen fibres */}
          <g stroke="#a8634f" strokeOpacity="0.2" strokeWidth="1.3">
            <path d="M20 176 C120 160 170 196 270 178 S440 160 540 182" />
            <path d="M20 206 C100 222 190 190 280 210 S430 228 540 204" />
            <path d="M20 238 C130 222 210 254 300 236 S460 222 540 244" />
            <path d="M20 266 C110 280 200 252 290 270 S450 282 540 262" />
          </g>
          {/* capillary loops */}
          <g stroke="#a8634f" strokeOpacity="0.5" strokeWidth="1">
            {CAPILLARIES.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {/* vessel */}
          <path
            d="M20 224 C110 196 180 252 270 222 S420 196 540 228"
            stroke="#a8634f"
            strokeOpacity="0.55"
            strokeWidth="2.2"
          />
          <path
            d="M20 232 C110 204 180 260 270 230 S420 204 540 236"
            stroke="#c98f7e"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          {/* sweat gland: duct + coil */}
          <path
            d="M452 118 C448 160 458 200 450 248 C436 252 436 272 450 272 C464 272 464 256 452 256 C442 258 444 268 452 266"
            stroke="#8f4e3c"
            strokeOpacity="0.55"
            strokeWidth="1.3"
          />
        </g>
        {/* hair follicle + sebaceous gland */}
        <path
          d="M318 66 C314 140 310 210 302 266 C298 290 334 292 330 268 C334 210 336 140 340 66"
          fill="#efd6ca"
          stroke="#a8634f"
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />
        <path
          d="M340 134 C360 126 372 142 364 156 C358 168 342 164 340 156"
          fill="#c98f7e"
          fillOpacity="0.35"
          stroke="#a8634f"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <path
          d="M128 66 C126 120 124 160 118 196 C114 214 142 216 138 196 C140 160 142 120 146 66"
          fill="#efd6ca"
          stroke="#a8634f"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text x={LEFT + 16} y="290" className="skin-index">
          02
        </text>
      </g>

      {/* ---------- Epiderme · superfície ---------- */}
      <g {...layer("epiderme")}>
        <path d={EPIDERMIS} fill="url(#sk-epi)" className="skin-shape" />
        {/* strata parallel to the surface */}
        <g fill="none" stroke="#c98f7e" strokeOpacity="0.4" strokeWidth="0.8">
          <path d="M20 74 C110 66 180 80 280 72 S450 66 540 74" />
          <path d="M20 84 C110 76 180 90 280 82 S450 76 540 84" />
          <path d="M20 95 C110 88 180 101 280 94 S450 88 540 95" strokeDasharray="2 5" />
        </g>
        <path d={SURFACE} fill="none" stroke="#a8634f" strokeOpacity="0.6" strokeWidth="1.2" />
        <text x={LEFT + 16} y="88" className="skin-index">
          01
        </text>
      </g>

      {/* hair shafts above the surface (decorative, not part of a layer) */}
      <g fill="none" stroke="#3b2a25" strokeOpacity="0.75" strokeLinecap="round" aria-hidden="true">
        <path d="M331 8 C332 34 331 60 324 120 C320 180 314 230 316 270" strokeWidth="2" />
        <path d="M137 22 C138 40 137 56 133 110 C131 150 129 176 128 198" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
