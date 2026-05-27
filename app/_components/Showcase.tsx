import type { Dictionary } from '../[lang]/dictionaries';
import { CompareSlider } from './CompareSlider';
import { Reveal } from './Reveal';

const PAIRS = [
  {
    key: 'rasen' as const,
    before: '/showcase-1-before.jpg',
    after: '/showcase-1-after.jpg',
  },
  {
    key: 'fassade' as const,
    before: '/showcase-2-before.jpg',
    after: '/showcase-2-after.jpg',
  },
  {
    key: 'pflaster' as const,
    before: '/showcase-3-before.jpg',
    after: '/showcase-3-after.jpg',
  },
];

export function Showcase({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="showcase"
      className="relative py-24 lg:py-32 bg-bg overflow-hidden"
    >
      <div className="absolute -top-32 right-0 w-[460px] h-[460px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">{dict.showcase.title}</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-fg">
              {dict.showcase.title}
            </h2>
            <p className="mt-4 text-fg-dim/75 text-base lg:text-lg leading-relaxed">
              {dict.showcase.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIRS.map((p, i) => (
            <Reveal key={p.key} delay={i * 100}>
              <div className="flex flex-col gap-3">
                <CompareSlider
                  before={p.before}
                  after={p.after}
                  alt={dict.showcase.items[p.key]}
                  beforeLabel={dict.showcase.before}
                  afterLabel={dict.showcase.after}
                />
                <p className="px-1 text-sm font-medium text-fg/90 tracking-wide">
                  {dict.showcase.items[p.key]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
