'use client';

import { useActionState } from 'react';
import { sendContactMessage, type ContactState } from '../[lang]/contact-action';
import type { Dictionary } from '../[lang]/dictionaries';

const initialState: ContactState = { status: 'idle', message: '' };

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="relative rounded-2xl border border-border-strong bg-bg-card p-6 sm:p-8 space-y-5 shadow-2xl shadow-black/30 overflow-hidden"
      noValidate
    >
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-leaf/5 blur-3xl pointer-events-none" />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={dict.contact.name} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={dict.contact.name_placeholder}
            className={inputCls}
          />
        </Field>
        <Field label={dict.contact.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={dict.contact.email_placeholder}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={dict.contact.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={dict.contact.phone_placeholder}
            className={inputCls}
          />
        </Field>
        <Field label={dict.contact.service} htmlFor="service">
          <select
            id="service"
            name="service"
            defaultValue=""
            className={inputCls}
          >
            <option value="">{dict.contact.service_placeholder}</option>
            {Object.values(dict.services.items).map((it) => (
              <option key={it.name} value={it.name}>
                {it.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={dict.contact.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={dict.contact.message_placeholder}
          className={`${inputCls} resize-y min-h-[120px]`}
        />
      </Field>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p
          aria-live="polite"
          className={`text-sm min-h-[1.25rem] ${
            state.status === 'success'
              ? 'text-leaf'
              : state.status === 'error'
                ? 'text-red-400'
                : 'text-muted'
          }`}
        >
          {state.status === 'success'
            ? dict.contact.success
            : state.status === 'error'
              ? dict.contact.error
              : ''}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium disabled:opacity-60 disabled:cursor-not-allowed min-w-[180px]"
        >
          {pending ? (
            <>
              <Spinner />
              {dict.contact.sending}
            </>
          ) : (
            <>
              {dict.contact.submit}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  'w-full rounded-xl border border-border bg-bg-soft px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:outline-none focus:border-leaf focus:ring-4 focus:ring-leaf/15 focus:bg-bg-elevated transition-all duration-300';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-xs uppercase tracking-[0.16em] text-muted mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
