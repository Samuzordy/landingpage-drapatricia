"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import type { NavItem } from "@/types/content";

type SiteHeaderProps = {
  brand: string;
  tagline: string;
  nav: NavItem[];
  cta: {
    label: string;
    /** null while the WhatsApp number is pending → CTA renders in `pending` mode. */
    href: string | null;
    menuLabel: string;
    menuHref: string | null;
    pendingNote: string;
  };
};

const GLASS_AFTER_PX = 80; // spec section 06
const HIDE_AFTER_PX = 160;
const DIRECTION_THRESHOLD_PX = 6;
const DESKTOP = "(min-width: 1024px)";
const SPY_LINE = 0.4; // reading line for scroll-spy, as a fraction of the viewport height

/**
 * Fixed header (spec sections 06/07). Client Component because it reacts to scroll and owns
 * the mobile menu state.
 * - frosted glass after 80px; hides on scroll down, returns on scroll up or on keyboard focus;
 * - scroll-spy: the link of the section in view gets aria-current;
 * - mobile menu (< 1024px): fullscreen panel with staggered items, Esc closes, background is
 *   `inert` and the page doesn't scroll behind it; focus moves in on open and back on close.
 */
export function SiteHeader({ brand, tagline, nav, cta }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const panelId = useId();
  const noteId = useId();

  // Glass + hide/reveal by scroll direction (rAF-throttled, passive listener).
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > GLASS_AFTER_PX);
      if (y <= GLASS_AFTER_PX) {
        setHidden(false);
        lastY = y;
        return;
      }
      const dy = y - lastY;
      if (Math.abs(dy) < DIRECTION_THRESHOLD_PX) return;
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setHidden(dy > 0 && y > HIDE_AFTER_PX && !openRef.current && !focusInside);
      lastY = y;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the active item is the nav section (in document order) whose top has passed a
  // reading line at 40% of the viewport. Robust for short sections and for sections in between
  // (e.g. Jornada keeps "Tratamentos" active). rAF-throttled, passive.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * SPY_LINE;
      let current: HTMLElement | null = null;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= line && (!current || top > current.getBoundingClientRect().top)) {
          current = section;
        }
      }
      setActive(current?.id ?? null);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [nav]);

  // Mobile menu: scroll lock, inert background, Esc, focus management, auto-close on desktop.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const header = headerRef.current;
    const panel = panelRef.current;
    const background = [...document.body.children].filter(
      (node): node is HTMLElement =>
        node instanceof HTMLElement && node !== header && node !== panel,
    );
    const wasInert = background.map((node) => node.inert);
    background.forEach((node) => (node.inert = true));

    panel?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();

    const close = (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) toggleRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      html.style.overflow = previousOverflow;
      background.forEach((node, i) => (node.inert = wasInert[i] ?? false));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  /** From the menu: close first (restores scroll + inert), then go to the section and focus it. */
  const onMenuLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      history.pushState(null, "", href);
      target.scrollIntoView();
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  };

  const ctaButton = (label: string, href: string | null, size: "md" | "lg", className = "") =>
    href ? (
      <Button href={href} external size={size} className={className}>
        {label}
      </Button>
    ) : (
      <Button pending aria-describedby={noteId} size={size} className={className}>
        {label}
      </Button>
    );

  return (
    <>
      <header
        ref={headerRef}
        id="topo"
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !open) || undefined}
        data-menu-open={open || undefined}
        onFocus={() => setHidden(false)}
        className="site-header fixed inset-x-0 top-0 z-50"
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          <a href="#inicio" className="flex min-h-11 flex-col justify-center leading-none">
            <span className="font-display text-xl font-normal tracking-[-0.01em] lg:text-[1.375rem]">
              {brand}
            </span>
            <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.18em] text-cacau/75 uppercase">
              {tagline}
            </span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className="nav-link relative inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-cacau"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapper owns visibility: the button recipe sets inline-flex, which would win
                over a `hidden` passed in className. Below 640px the CTA lives in the menu. */}
            <div className="hidden sm:block">{ctaButton(cta.label, cta.href, "md")}</div>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-sm font-semibold text-cacau lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
              <span>{open ? "Fechar" : "Menu"}</span>
            </button>
          </div>
        </div>
        {!cta.href && (
          <p id={noteId} className="sr-only">
            {cta.pendingNote}
          </p>
        )}
      </header>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="mobile-menu fixed inset-0 z-40 overflow-y-auto bg-porcelana pt-16 lg:hidden"
      >
        <nav aria-label="Menu" className="container-page flex min-h-full flex-col pt-8 pb-10">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="menu-item" style={{ "--i": i } as CSSProperties}>
                <a
                  href={item.href}
                  aria-current={active === item.href.slice(1) ? "true" : undefined}
                  onClick={(e) => onMenuLink(e, item.href)}
                  className="flex min-h-14 items-center border-b border-areia font-display text-[2rem] font-light text-cacau aria-[current=true]:italic"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-10" style={{ "--i": nav.length } as CSSProperties}>
            {ctaButton(cta.menuLabel, cta.menuHref, "lg", "w-full")}
            {!cta.menuHref && <p className="mt-3 text-sm text-cacau/80">{cta.pendingNote}</p>}
          </div>
        </nav>
      </div>
    </>
  );
}
