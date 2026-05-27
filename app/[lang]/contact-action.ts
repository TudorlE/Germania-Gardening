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

  const html = buildEmailHtml(data);

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

type ContactData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function buildEmailHtml(data: ContactData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const service = escapeHtml(data.service);
  const message = escapeHtml(data.message).replace(/\n/g, '<br>');
  const initials = (data.name.match(/\b\w/g) ?? ['?'])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const sentAt = new Date().toLocaleString('de-DE', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  });

  const phoneRow = phone
    ? row(
        'Telefon',
        `<a href="tel:${phone.replace(/[^+\d]/g, '')}" style="color:#d4af37; text-decoration:none; font-weight:600;">${phone}</a>`,
      )
    : '';
  const serviceRow = service
    ? row(
        'Service',
        `<span style="display:inline-block; padding:4px 12px; background:#1f2d24; border:1px solid #3a5a3f; border-radius:9999px; color:#a8e052; font-size:13px; font-weight:600;">${service}</span>`,
      )
    : '';

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Neue Anfrage – MP Galabau</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0e0a; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; color:#f1ece1;">
  <div style="display:none; max-height:0; overflow:hidden;">Neue Kontaktanfrage von ${name}${service ? ` zum Thema ${service}` : ''}.</div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#0a0e0a; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size:18px; font-weight:700; letter-spacing:1px; color:#e0b94a;">
                    MP&nbsp;GALABAU
                  </td>
                  <td align="right" style="font-size:12px; color:#7a8580; letter-spacing:1px; text-transform:uppercase;">
                    Neue Anfrage
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="font-size:11px; color:#7a8580; letter-spacing:2px; text-transform:uppercase; padding-top:4px;">
                    Garten &amp; Landschaftsbau
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#121d17; border:1px solid rgba(224,185,74,0.18); border-radius:16px; overflow:hidden;">

              <!-- Top accent bar -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="background:linear-gradient(90deg,#a8e052 0%,#e0b94a 100%); height:3px; line-height:3px; font-size:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Greeting -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding:32px 32px 8px 32px;">
                    <p style="margin:0 0 6px 0; font-size:12px; color:#a8e052; letter-spacing:2px; text-transform:uppercase; font-weight:600;">
                      ${sentAt} (MEZ)
                    </p>
                    <h1 style="margin:0; font-size:26px; line-height:1.25; color:#f1ece1; font-weight:700;">
                      Neue Kontaktanfrage
                    </h1>
                    <p style="margin:8px 0 0 0; font-size:14px; color:#9aa39c; line-height:1.5;">
                      Eingegangen über das Kontaktformular auf mp-galabau.de.
                    </p>
                  </td>
                </tr>

                <!-- Contact card -->
                <tr>
                  <td style="padding:24px 32px 8px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#18241d; border:1px solid rgba(255,255,255,0.06); border-radius:12px;">
                      <tr>
                        <td style="padding:20px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="56" valign="top">
                                <div style="width:48px; height:48px; border-radius:9999px; background:linear-gradient(135deg,#a8e052,#e0b94a); color:#07120c; font-weight:700; font-size:18px; line-height:48px; text-align:center; letter-spacing:1px;">${initials}</div>
                              </td>
                              <td valign="middle" style="padding-left:14px;">
                                <div style="font-size:18px; font-weight:700; color:#f1ece1; line-height:1.3;">${name}</div>
                                <div style="margin-top:4px;">
                                  <a href="mailto:${email}" style="color:#d4af37; text-decoration:none; font-size:14px;">${email}</a>
                                </div>
                              </td>
                            </tr>
                          </table>

                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:20px; border-top:1px solid rgba(255,255,255,0.06); padding-top:16px;">
                            ${phoneRow}
                            ${serviceRow}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:16px 32px 8px 32px;">
                    <div style="font-size:11px; color:#7a8580; letter-spacing:2px; text-transform:uppercase; font-weight:600; margin-bottom:10px;">
                      Nachricht
                    </div>
                    <div style="position:relative; background-color:#18241d; border-left:3px solid #a8e052; border-radius:0 12px 12px 0; padding:18px 20px; font-size:15px; line-height:1.65; color:#e8e3d8;">
                      ${message}
                    </div>
                  </td>
                </tr>

                <!-- Reply button -->
                <tr>
                  <td style="padding:24px 32px 32px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-radius:9999px; background:linear-gradient(135deg,#b6ec5d,#8fd13f);">
                          <a href="mailto:${email}?subject=${encodeURIComponent('Re: Ihre Anfrage bei MP Galabau')}" style="display:inline-block; padding:13px 28px; font-size:14px; font-weight:700; color:#07120c; text-decoration:none; letter-spacing:0.3px;">
                            Direkt antworten →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 8px 0 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size:12px; color:#7a8580; line-height:1.6;">
                    <strong style="color:#9aa39c;">MP Galabau</strong> · Garten- &amp; Landschaftsbau<br>
                    <a href="tel:+4917662528728" style="color:#9aa39c; text-decoration:none;">0176 62528728</a> &nbsp;·&nbsp;
                    <a href="https://wa.me/4917681022990" style="color:#9aa39c; text-decoration:none;">WhatsApp 0176 81022990</a><br>
                    <span style="color:#5a635e;">Diese Nachricht wurde automatisch durch das Kontaktformular generiert. Antworten Sie direkt, um mit dem Absender in Kontakt zu treten.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td width="80" style="padding:6px 0; font-size:11px; color:#7a8580; letter-spacing:1.5px; text-transform:uppercase; font-weight:600; vertical-align:middle;">${label}</td>
      <td style="padding:6px 0; font-size:14px; color:#f1ece1; vertical-align:middle;">${value}</td>
    </tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
