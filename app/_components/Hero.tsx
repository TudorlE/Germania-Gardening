import Link from 'next/link';
import type { Dictionary, Locale } from '../[lang]/dictionaries';

export function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden hero-vignette pt-20"
    >
      {/* Brand hero image — illuminated garden at dusk */}
      <img
        src="/hero-garden.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        aria-hidden="true"
      />

      {/* Multi-layer overlay for depth + readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/25 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full bg-leaf/10 blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-20 w-[380px] h-[380px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 min-h-[92vh] flex flex-col justify-center py-24">
        <div className="max-w-3xl">
          <p
            className="eyebrow mb-6 fade-up"
            style={{ ['--fade-delay' as string]: '50ms' }}
          >
            {dict.hero.eyebrow}
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.02] text-fg tracking-tight fade-up"
            style={{ ['--fade-delay' as string]: '180ms' }}
          >
            {dict.hero.title1}
            <br />
            <span className="brand-gradient">{dict.hero.title2}</span>
          </h1>
          <p
            className="mt-7 text-lg sm:text-xl text-fg-dim max-w-2xl leading-relaxed fade-up"
            style={{ ['--fade-delay' as string]: '340ms' }}
          >
            {dict.hero.subtitle}
          </p>
          <div
            className="mt-9 flex flex-wrap gap-4 fade-up"
            style={{ ['--fade-delay' as string]: '480ms' }}
          >
            <Link
              href={`/${locale}#contact`}
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium"
            >
              {dict.hero.cta_primary}
              <ArrowIcon />
            </Link>
            <Link
              href={`/${locale}#services`}
              className="btn-outline inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium"
            >
              {dict.hero.cta_secondary}
            </Link>
          </div>

          <div
            className="mt-14 flex items-center gap-3 text-sm text-fg/75 fade-up"
            style={{ ['--fade-delay' as string]: '640ms' }}
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span className="opacity-60">·</span>
            <span className="tracking-wide text-fg/85">{dict.hero.rating}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="w-6 h-10 rounded-full border border-fg/30 flex items-start justify-center p-1.5">
          <span className="block w-1 h-2 rounded-full bg-leaf animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#e0b94a" aria-hidden="true">
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.852 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.748l8.332-1.73z" />
    </svg>
  );
}
