# MP Galabau — Garten- & Landschaftsbau

Mehrsprachige Marketing-Website (DE / EN / RO) für MP Galabau. Built mit Next.js 16 (App Router), React 19, Tailwind v4 und Nodemailer.

## Lokal starten

```powershell
npm install
npm run dev
```

Öffnen Sie http://localhost:3000 — Sie werden automatisch zur passenden Sprache weitergeleitet (`/de`, `/en` oder `/ro`).

## Kontakt-Formular einrichten (Gmail)

Das Kontakt-Formular sendet Anfragen über Gmail SMTP per Server Action an `mpetrasco@web.de` (konfigurierbar).

1. Im **Gmail-Konto**, das senden soll, **2-Faktor-Authentifizierung aktivieren**: <https://myaccount.google.com/security>
2. Ein **App-Passwort** erstellen (App: „Mail", Gerät: „Other → MP Galabau Website"): <https://myaccount.google.com/apppasswords>. Es entsteht ein 16-stelliger Code.
3. Im Projektordner die Datei `.env.local.example` zu `.env.local` kopieren und Werte eintragen:

```env
GMAIL_USER=ihr-absender@gmail.com
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
CONTACT_TO=mpetrasco@web.de
```

4. Server neu starten (`npm run dev`).

> **Hinweis:** Das App-Passwort funktioniert nur, wenn 2-Faktor-Authentifizierung am Konto aktiv ist. Normales Gmail-Passwort funktioniert nicht.

### Alternative: anderer SMTP-Anbieter

In `app/[lang]/contact-action.ts` kann `nodemailer.createTransport({ service: 'gmail', ... })` durch einen beliebigen SMTP-Provider (Strato, IONOS, web.de, etc.) ersetzt werden.

## Hero-Video ersetzen

Aktuell zeigt der Hero-Bereich ein Time-Lapse-Video von `/hero.mp4`. Bitte ein eigenes Time-Lapse-Video (Rasenmähen / Garten-Transformation) als `public/hero.mp4` ablegen. Bis dahin wird das Poster-Bild angezeigt.

Empfohlene Spezifikationen:
- Format: MP4 (H.264, AAC stumm wäre noch besser)
- Auflösung: 1920×1080
- Dauer: 8–20 Sekunden, nahtloser Loop
- Dateigröße: < 8 MB für schnelles Laden

## Sprachen

- 🇩🇪 Deutsch (Standard) — `/de`
- 🇬🇧 English — `/en`
- 🇷🇴 Română — `/ro`

Übersetzungen liegen in [`app/[lang]/dictionaries/`](app/%5Blang%5D/dictionaries/).

## Projekt-Struktur

```
app/
  [lang]/
    dictionaries/        # de.json, en.json, ro.json
    dictionaries.ts
    layout.tsx           # Root-Layout (HTML, Fonts, Metadata)
    page.tsx             # Hauptseite mit allen Sektionen
    contact-action.ts    # Server Action → Gmail SMTP
  _components/
    Logo.tsx
    Navbar.tsx
    LanguageSwitcher.tsx
    Hero.tsx
    About.tsx
    Services.tsx
    Contact.tsx
    ContactForm.tsx
    Footer.tsx
  globals.css
proxy.ts                 # Sprache aus Accept-Language ermitteln
```

## Deploy

Vercel ist die einfachste Option (auto-deploy, env vars im Dashboard setzen). Alternativ jeder Node-Host (`npm run build && npm start`).
