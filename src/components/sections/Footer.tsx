import { PendingMark } from "@/components/ui/PendingMark";
import { PLACEHOLDER, site } from "@/content/site";
import { resolveNav } from "@/lib/sections";

/**
 * Rodapé — the deepest band. Server Component, zero JS.
 * Name, professional title and council registrations stay prominent. No contact data is invented:
 * social profiles without a confirmed URL show only the handle, and the privacy policy is a
 * visual placeholder (no page in this preview template).
 */
export function Footer() {
  const { professional, settings, nav, flags, footer } = site;
  const links = resolveNav(nav.footer);
  const year = new Date().getFullYear();
  const hasInfo = settings.social.length > 0 || Boolean(footer.privacyLabel);

  return (
    <footer data-tone="dark" className="band-dark-2 text-white">
      <div className="container-page grid-page gap-y-12 py-16 lg:py-20">
        <div className="col-span-4 lg:col-span-5">
          <p className="font-display text-[2rem] leading-tight font-normal">
            {professional.displayName}
          </p>
          <p className="mt-1 text-sm tracking-[0.18em] uppercase">{professional.title}</p>
          <p className="mt-6 text-base font-semibold tabular">
            {professional.registrations.join(" · ")}
          </p>
          <p className="mt-1 text-sm">{professional.location}</p>
        </div>

        {links.length > 0 && (
          <nav aria-label="Rodapé" className="col-span-4 sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase">{footer.navTitle}</p>
            <ul className="mt-4 space-y-1">
              {links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {hasInfo && (
          <div className="col-span-4 sm:col-span-2 lg:col-span-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase">{footer.infoTitle}</p>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              {settings.social.map((social) => (
                <li key={social.label}>
                  {social.label}:{" "}
                  {social.url !== PLACEHOLDER ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link inline-flex"
                    >
                      {social.handle}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  ) : (
                    <>
                      <span className="font-semibold">{social.handle}</span>
                      <PendingMark label="link pendente" tone="light" />
                    </>
                  )}
                </li>
              ))}
              {footer.privacyLabel && (
                <li>
                  {footer.privacyLabel}
                  <PendingMark label="em elaboração" tone="light" />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/20">
        <div className="container-page flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {professional.displayName}
            {flags.showPendingMarkers && " · Preview demonstrativo, conteúdo sujeito a validação"}
          </p>
          {footer.credit && <p>{footer.credit}</p>}
        </div>
      </div>
    </footer>
  );
}
