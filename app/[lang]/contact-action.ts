'use server';

import nodemailer from 'nodemailer';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const REQUIRED = ['name', 'email', 'message'] as const;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — silently succeed for bots
  if ((formData.get('website') as string | null)?.trim()) {
    return { status: 'success', message: 'ok' };
  }

  const data = {
    name: (formData.get('name') as string | null)?.trim() ?? '',
    email: (formData.get('email') as string | null)?.trim() ?? '',
    phone: (formData.get('phone') as string | null)?.trim() ?? '',
    service: (formData.get('service') as string | null)?.trim() ?? '',
    message: (formData.get('message') as string | null)?.trim() ?? '',
  };

  for (const k of REQUIRED) {
    if (!data[k]) {
      return { status: 'error', message: `Missing field: ${k}` };
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { status: 'error', message: 'Invalid email' };
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO || 'mpetrasco@web.de';

  if (!user || !pass) {
    console.error(
      '[contact] GMAIL_USER / GMAIL_APP_PASSWORD environment variables are not set.',
    );
    return { status: 'error', message: 'mail-config' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const subject = `Neue Anfrage von ${data.name}${
    data.service ? ` — ${data.service}` : ''
  }`;

  const text = [
    `Neue Kontaktanfrage über mp-galabau.de`,
    ``,
    `Name:    ${data.name}`,
    `E-Mail:  ${data.email}`,
    `Telefon: ${data.phone || '—'}`,
    `Service: ${data.service || '—'}`,
    ``,
    `Nachricht:`,
    data.message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background:#0a0e0a; color:#f5f5f0; border-radius: 16px;">
      <h2 style="color:#bdf25b; margin:0 0 16px;">Neue Anfrage</h2>
      <p style="color:#a3aba0; margin:0 0 24px;">Eingegangen über mp-galabau.de</p>
      <table style="width:100%; border-collapse: collapse; font-size:14px;">
        <tr><td style="padding:6px 0; color:#a3aba0; width:90px;">Name</td><td style="padding:6px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:6px 0; color:#a3aba0;">E-Mail</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#d4af37;">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:6px 0; color:#a3aba0;">Telefon</td><td style="padding:6px 0;">${escapeHtml(data.phone) || '—'}</td></tr>
        <tr><td style="padding:6px 0; color:#a3aba0;">Service</td><td style="padding:6px 0;">${escapeHtml(data.service) || '—'}</td></tr>
      </table>
      <div style="margin-top:20px; padding:16px; background:#11161a; border-radius:12px; white-space:pre-wrap; line-height:1.5;">${escapeHtml(data.message)}</div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"MP Galabau Website" <${user}>`,
      to,
      replyTo: data.email,
      subject,
      text,
      html,
    });
    return { status: 'success', message: 'ok' };
  } catch (err) {
    console.error('[contact] sendMail failed:', err);
    return { status: 'error', message: 'send-failed' };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
