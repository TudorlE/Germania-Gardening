import type { Dictionary } from '../[lang]/dictionaries';
import { Reveal } from './Reveal';
import { AnimatedNumber } from './AnimatedNumber';

export function About({ dict }: { dict: Dictionary }) {
  const s = dict.about.stats;
  const stats = [
    { value: s.years_value, label: s.years_label },
    { value: s.gardens_value, label: s.gardens_label },
    { value: s.clients_value, label: s.clients_label },
    { value: s.hours_value, label: s.hours_label },
  ];

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-bg overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <p className="text-2xl sm:text-3xl lg:text-[2.4rem] leading-snug font-medium text-fg">
              <span className="brand-gradient font-semibold">
                {dict.about.lead_strong}
              </span>
              <span className="text-fg/85">{dict.about.lead_rest}</span>
            </p>
            <p className="mt-7 text-fg-dim/80 text-base leading-relaxed max-w-xl">
              Natur verbinden, Lebensräume schaffen — dieses Motto begleitet uns
              bei jedem Projekt. Vom ersten Schnitt bis zum letzten Detail
              arbeiten wir mit Sorgfalt, Erfahrung und einem klaren Blick für
              das, was Ihren Garten besonders macht.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-border-strong group">
              <img
                src="https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Moderne Gartengestaltung mit Beleuchtung und gepflegten Pflanzen"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-leaf/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-fg/90">
                <span className="divider-dot" />
                Natur verbinden · Lebensräume schaffen
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((st, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="text-center lg:text-left border-t border-border lg:border-0 lg:border-l lg:pl-6 pt-6 lg:pt-2 relative group">
                <div className="hidden lg:block absolute left-0 top-2 w-px h-8 bg-gradient-to-b from-leaf to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-4xl lg:text-[3.25rem] font-bold gold-gradient leading-none">
                  <AnimatedNumber value={st.value} />
                </div>
                <div className="mt-3 text-sm text-muted tracking-wide">
                  {st.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
