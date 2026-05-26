import { ContactForm } from './ContactForm';
import { Reveal } from './Reveal';
import type { Dictionary } from '../[lang]/dictionaries';

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-bg overflow-hidden"
    >
      <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full bg-leaf/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 left-1/4 w-[420px] h-[420px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <Reveal as="div" className="lg:col-span-2">
            <p className="eyebrow mb-4">{dict.contact.title}</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-fg">
              {dict.contact.title}
            </h2>
            <p className="mt-4 text-fg-dim/85 text-base lg:text-lg max-w-lg">
              {dict.contact.subtitle}
            </p>

            <ul className="mt-10 space-y-3 text-sm">
              <ContactRow
                href="tel:+4917662528728"
                label={dict.contact.phone_label}
                value="0176 62528728"
                icon={<PhoneIcon />}
              />
              <ContactRow
                href="https://wa.me/4917681022990"
                external
                label={dict.contact.whatsapp_label}
                value="0176 81022990"
                icon={<WhatsAppIcon />}
              />
              <ContactRow
                href="mailto:mpetrasco@web.de"
                label={dict.contact.email_label}
                value="mpetrasco@web.de"
                icon={<MailIcon />}
              />
            </ul>
          </Reveal>

          <Reveal as="div" delay={150} className="lg:col-span-3">
            <ContactForm dict={dict} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex items-center gap-3 p-3 -mx-3 rounded-xl text-fg hover:bg-bg-card/60 transition-colors"
      >
        <IconBadge>{icon}</IconBadge>
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {label}
          </div>
          <div className="font-medium group-hover:text-leaf transition-colors">
            {value}
          </div>
        </div>
        <span className="ml-auto text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </li>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-11 h-11 rounded-full border border-border bg-bg-card flex items-center justify-center text-leaf group-hover:border-leaf/60 group-hover:bg-leaf/10 transition-all duration-400 ease-out">
      {children}
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 12a8 8 0 1 1-3.5-6.6L20 4l-1.4 3.6A8 8 0 0 1 20 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 9c0 4 2 6 6 6l1.5-1.5-2-1-1 .8c-1 0-2.3-1.3-2.3-2.3l.8-1-1-2L9 9z"
        fill="currentColor"
      />
    </svg>
  );
}
