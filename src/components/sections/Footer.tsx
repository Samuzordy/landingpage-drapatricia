import { PendingMark } from "@/components/ui/PendingMark";
import { PLACEHOLDER, site } from "@/content/site";

/**
 * Rodapé (spec section 06, item 13) — the deepest band. Server Component, zero JS.
 * Name, specialty, CRM and RQE stay prominent (CFM 2.336/2023). No contact data is invented:
 * Instagram shows the handle from the spec without a link until the URL is confirmed, and the
 * privacy policy is a visual placeholder for the production phase.
 */
export function Footer() {
  const { specialist, settings, nav, flags } = site;
  const instagramUrl = settings.instagram.url === PLACEHOLDER ? null : settings.instagram.url;
  // Footer links follow the page order; the Jornada (the preview highlight) sits after Tratamentos.
  const links = nav.flatMap((item) =>
    item.href === "#tratamentos" ? [item, { label: "Jornada da pele", href: "#jornada" }] : [item],
  );
  const year = new Date().getFullYear();

  return (
    <footer data-layer="hipoderme" data-tone="dark" className="layer-hipo-3 text-white">
      <div className="container-page grid-page gap-y-12 py-16 lg:py-20">
        <div className="col-span-4 lg:col-span-5">
          <p className="font-display text-[2rem] leading-tight font-normal">
            {specialist.nomeExibicao}
          </p>
          <p className="mt-1 text-sm tracking-[0.18em] uppercase">{specialist.especialidade}</p>
          <p className="mt-6 text-base font-semibold tabular">
            {specialist.crm} · {specialist.rqe}
          </p>
          <p className="mt-1 text-sm">Curitiba – PR</p>
        </div>

        <nav aria-label="Rodapé" className="col-span-4 sm:col-span-2 lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase">Navegação</p>
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

        <div className="col-span-4 sm:col-span-2 lg:col-span-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase">Redes e informações</p>
          <ul className="mt-4 space-y-3 text-[0.9375rem]">
            <li>
              Instagram:{" "}
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-flex"
                >
                  {settings.instagram.handle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ) : (
                <>
                  <span className="font-semibold">{settings.instagram.handle}</span>
                  <PendingMark label="link pendente" tone="light" />
                </>
              )}
            </li>
            <li>
              Política de Privacidade
              <PendingMark label="em elaboração" tone="light" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="container-page flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {specialist.nomeExibicao}
            {flags.showPendingMarkers && " · Preview demonstrativo, conteúdo sujeito a validação"}
          </p>
          <p>Desenvolvido por Samuel Faria</p>
        </div>
      </div>
    </footer>
  );
}
