import { PendingMark } from "@/components/ui/PendingMark";
import { isPending, site } from "@/content/site";

/**
 * Como funciona a consulta (#consulta) — 4 steps (spec section 06). Server Component, zero JS.
 * The connector "draws itself" with the scroll using CSS scroll-driven animations
 * (animation-timeline: view()) — no GSAP. Without support, or with reduced motion, the line is
 * simply shown complete. Horizontal from 1024px, vertical below.
 */
export function HowItWorks() {
  const steps = [...site.consultationSteps].sort((a, b) => a.ordem - b.ordem);
  const anyPending = steps.some((s) => isPending(s.descricao));

  return (
    <section
      id="consulta"
      data-layer="derme-profunda"
      aria-labelledby="consulta-title"
      className="layer-profunda-1 section-space"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="kicker">Consulta</p>
          <h2 id="consulta-title" className="mt-4">
            Como funciona a <em className="font-light text-(--accent-text)">consulta</em>
          </h2>
          {anyPending && (
            <p className="mt-5 text-cacau/90">
              Quatro etapas, do primeiro contato ao acompanhamento.
              <PendingMark label="descrições pendentes" />
            </p>
          )}
        </div>

        <div className="steps relative mt-12 lg:mt-16">
          <span aria-hidden="true" className="steps-line">
            <span className="steps-line-fill" />
          </span>
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <li key={step.ordem} className="step relative pl-16 lg:pt-12 lg:pl-0">
                <span aria-hidden="true" className="step-dot" />
                <span className="step-number font-display font-light text-(--accent-text) tabular">
                  {String(step.ordem).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.625rem] leading-tight font-normal lg:mt-4">
                  {step.titulo}
                </h3>
                {!isPending(step.descricao) && (
                  <p className="mt-2 measure text-cacau/90">{step.descricao}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
