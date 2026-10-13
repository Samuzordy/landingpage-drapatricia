import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPending, site } from "@/content/site";
import { bandProps } from "@/lib/sections";

/**
 * Como funciona a consulta (#consulta). Server Component, zero JS.
 * The connector "draws itself" with the scroll using CSS scroll-driven animations
 * (animation-timeline: view()) — no GSAP. Without support, or with reduced motion, the line is
 * simply shown complete. Horizontal from 1024px (one column per step), vertical below.
 */
export function HowItWorks() {
  const { heading, steps } = site.consultation;
  const anyPending = steps.some((s) => isPending(s.description));

  return (
    <section
      id="consulta"
      aria-labelledby="consulta-title"
      {...bandProps("consultation")}
      className="section-space depth-band"
    >
      <div className="container-page">
        <SectionHeading
          heading={heading}
          titleId="consulta-title"
          pendingLabel={anyPending ? "descrições pendentes" : undefined}
          className="max-w-2xl"
        />

        <div className="steps relative mt-12 lg:mt-16">
          <span aria-hidden="true" className="steps-line">
            <span className="steps-line-fill" />
          </span>
          <ol className="grid gap-10 lg:auto-cols-fr lg:grid-flow-col lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="step relative pl-16 lg:pt-12 lg:pl-0">
                <span aria-hidden="true" className="step-dot" />
                <span className="step-number font-display font-light text-(--accent-text) tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[1.625rem] leading-tight font-normal lg:mt-4">
                  {step.title}
                </h3>
                {!isPending(step.description) && (
                  <p className="mt-2 measure text-cacau/90">{step.description}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
