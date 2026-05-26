'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import type { Dictionary, Locale } from '../[lang]/dictionaries';

const SECTIONS = ['services', 'about', 'contact'] as const;
type SectionId = (typeof SECTIONS)[number];

export function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const tickingRef = useRef(false);

  // Scroll state — passive + rAF-throttled
  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        tickingRef.current = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section — IntersectionObserver
  useEffect(() => {
    const elements = SECTIONS.map(
      (id) => document.getElementById(id) as HTMLElement | null,
    ).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio ||
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        // Top of viewport offset by navbar, bottom 40% so a section becomes
        // active well before it hits center.
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const items: { id: SectionId; href: string; label: string }[] = [
    { id: 'services', href: `/${locale}#services`, label: dict.nav.services },
    { id: 'about', href: `/${locale}#about`, label: dict.nav.about },
    { id: 'contact', href: `/${locale}#contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
          scrolled
            ? 'bg-bg/85 border-b border-border-strong py-2.5'
            : 'bg-bg/0 border-b border-transparent py-4'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'blur(6px)',
          WebkitBackdropFilter: scrolled
            ? 'blur(18px) saturate(160%)'
            : 'blur(6px)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center rounded-md"
            aria-label="MP Galabau"
          >
            <Logo size={36} />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {items.map((i) => {
              const isActive = active === i.id;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={`nav-item group relative py-2 transition-colors duration-300 ${
                    isActive ? 'text-leaf' : 'text-fg/85 hover:text-fg'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                  data-active={isActive ? 'true' : undefined}
                >
                  {i.label}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-leaf via-leaf to-gold origin-center scale-x-0 opacity-0 transition-[transform,opacity] duration-500 group-hover:scale-x-100 group-hover:opacity-100 group-data-[active=true]:scale-x-100 group-data-[active=true]:opacity-100"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}#contact`}
              className="hidden sm:inline-flex btn-primary text-sm font-medium px-4 py-2 rounded-full"
            >
              {dict.nav.cta}
            </Link>
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden relative w-10 h-10 rounded-full border border-border flex items-center justify-center text-fg hover:border-leaf transition-colors"
            >
              <BurgerIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        id="mobile-drawer"
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-bg-soft border-l border-border-strong shadow-2xl transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-hidden={!open}
      >
        <div className="h-20 px-5 flex items-center justify-between border-b border-border">
          <Logo size={34} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-fg hover:border-leaf transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="px-5 py-6 flex flex-col gap-1">
          {items.map((i, idx) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className={`py-3 px-3 -mx-3 text-lg rounded-xl flex items-center justify-between transition-all duration-500 ${
                active === i.id ? 'text-leaf bg-leaf/5' : 'text-fg/85 hover:bg-bg-card'
              } ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{
                transitionDelay: open ? `${100 + idx * 60}ms` : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span>{i.label}</span>
              <span className="text-muted text-sm">→</span>
            </Link>
          ))}
          <Link
            href={`/${locale}#contact`}
            onClick={() => setOpen(false)}
            className={`mt-4 btn-primary text-base font-medium px-5 py-3.5 rounded-full text-center transition-all duration-500 ${
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{
              transitionDelay: open ? `${100 + items.length * 60}ms` : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {dict.nav.cta}
          </Link>
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-5 border-t border-border space-y-2 text-sm text-fg-dim/85">
          <a href="tel:+4917662528728" className="block hover:text-leaf transition-colors">
            0176 62528728
          </a>
          <a
            href="mailto:mpetrasco@web.de"
            className="block hover:text-leaf transition-colors"
          >
            mpetrasco@web.de
          </a>
        </div>
      </aside>
    </>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 5 H14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transformOrigin: '8px 5px',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: open ? 'translateY(3px) rotate(45deg)' : 'none',
        }}
      />
      <path
        d="M2 11 H14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transformOrigin: '8px 11px',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none',
        }}
      />
    </svg>
  );
}
