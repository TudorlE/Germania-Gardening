import type { Dictionary } from '../[lang]/dictionaries';
import { Reveal } from './Reveal';

type ServiceKey =
  | 'gartenpflege'
  | 'pflasterarbeiten'
  | 'heckenschnitt'
  | 'baumfaellung'
  | 'rollrasen'
  | 'winterdienst';

const SERVICES: {
  key: ServiceKey;
  image: string;
  video?: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'gartenpflege',
    image:
      'https://images.pexels.com/photos/589/garden-green-trees-back-yard.jpg?auto=compress&cs=tinysrgb&w=900',
    video: '/videos/garden-care.mp4',
    icon: <LeafIcon />,
  },
  {
    key: 'pflasterarbeiten',
    image:
      'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=900',
    video: '/videos/paving.mp4',
    icon: <BrickIcon />,
  },
  {
    key: 'heckenschnitt',
    image:
      'https://images.pexels.com/photos/2519390/pexels-photo-2519390.jpeg?auto=compress&cs=tinysrgb&w=900',
    video: '/videos/hedge-trimming.mp4',
    icon: <ShearsIcon />,
  },
  {
    key: 'baumfaellung',
    image:
      'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=900',
    video: '/videos/tree-felling.mp4',
    icon: <TreeIcon />,
  },
  {
    key: 'rollrasen',
    image:
      'https://images.pexels.com/photos/130328/pexels-photo-130328.jpeg?auto=compress&cs=tinysrgb&w=900',
    video: '/videos/roll-lawn.mp4',
    icon: <GrassIcon />,
  },
  {
    key: 'winterdienst',
    image:
      'https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=900',
    video: '/videos/winter-service.mp4',
    icon: <SnowIcon />,
  },
];

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 bg-bg-soft overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">{dict.services.title}</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-fg">
              {dict.services.title}
            </h2>
            <p className="mt-4 text-fg-dim/85 text-base lg:text-lg">
              {dict.services.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const item = dict.services.items[s.key];
            return (
              <Reveal key={s.key} as="article" delay={i * 80}>
                <div className="card h-full flex flex-col">
                  <div
                    className={`relative overflow-hidden ${
                      s.video ? 'aspect-[3/4]' : 'aspect-[4/3]'
                    }`}
                  >
                    {s.video ? (
                      <>
                        <video
                          src={s.video}
                          poster={s.image}
                          className="absolute inset-0 w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={item.name}
                        />
                        <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur border border-leaf/30 text-leaf">
                          <PlayIcon />
                          Video
                        </span>
                      </>
                    ) : (
                      <img
                        src={s.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-card/85 to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-bg/80 backdrop-blur flex items-center justify-center text-leaf border border-leaf/30 shadow-lg shadow-black/30">
                      {s.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-fg">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-fg-dim/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M3 1.5v9l8-4.5z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19l6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BrickIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7h18M3 12h18M3 17h18M7 7v5M11 12v5M15 7v5M19 12v5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function ShearsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9l11 11M9 15L20 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function TreeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l5 7h-3l4 6H6l4-6H7z M12 16v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function GrassIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 20c2-6 4-9 6-9M9 20c1-7 3-10 5-10M15 20c0-5 2-8 4-8M3 20h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SnowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
