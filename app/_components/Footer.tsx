import Link from 'next/link';
import { Logo } from './Logo';
import type { Dictionary, Locale } from '../[lang]/dictionaries';

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-bg-soft border-t border-border overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-leaf/40 to-transparent" />
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full bg-leaf/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo size={42} />
          <p className="script text-leaf text-3xl mt-4">
            Wir gestalten Ihre Natur
          </p>
          <p className="mt-3 text-sm text-fg-dim/75 max-w-sm leading-relaxed">
            Qualität, die man sieht. Service, der überzeugt. Natur verbinden ·
            Lebensräume schaffen.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-muted">
            <span>Zuverlässig</span>
            <span className="divider-dot" />
            <span>Schnell</span>
            <span className="divider-dot" />
            <span>Professionell</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg mb-4 tracking-wide">
            {dict.footer.services}
          </h4>
          <ul className="space-y-2.5 text-sm text-fg-dim/75">
            {Object.values(dict.services.items).map((s) => (
              <li key={s.name}>
                <Link
                  href={`/${locale}#services`}
                  className="hover:text-leaf transition-colors duration-300"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg mb-4 tracking-wide">
            {dict.footer.contact}
          </h4>
          <ul className="space-y-2.5 text-sm text-fg-dim/75">
            <li>
              <a
                href="tel:+4917662528728"
                className="hover:text-leaf transition-colors duration-300"
              >
                0176 62528728
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/4917681022990"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-leaf transition-colors duration-300"
              >
                WhatsApp: 0176 81022990
              </a>
            </li>
            <li>
              <a
                href="mailto:mpetrasco@web.de"
                className="hover:text-leaf transition-colors duration-300 break-all"
              >
                mpetrasco@web.de
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>
            © {year} MP Galabau. {dict.footer.rights}
          </p>
          <p className="opacity-70">{dict.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
