# MP Galabau — Garten- & Landschaftsbau

Mehrsprachige Marketing-Website (DE / EN / RO) für MP Galabau. Built mit Next.js 16 (App Router), React 19, Tailwind v4 und Nodemailer.

## Lokal starten

```powershell
npm install
npm run dev
```

Öffnen Sie http://localhost:3000 — Sie werden automatisch zur passenden Sprache weitergeleitet (`/de`, `/en` oder `/ro`).

## Kontakt-Formular einrichten (web.de)

Das Kontakt-Formular sendet Anfragen per Server Action direkt über den SMTP-Server von web.de (`smtp.web.de:587`, STARTTLS) an `mpetrasco@web.de` (konfigurierbar über `CONTACT_TO`).

1. Bei **web.de** einloggen → **Einstellungen → POP3/IMAP Abruf** → „POP3 und IMAP Zugriff erlauben" aktivieren (sonst lehnt web.de den SMTP-Versand ab).
2. Ist die 2-Faktor-Anmeldung aktiv, ein **anwendungsspezifisches Passwort** erstellen und dieses verwenden.
3. `.env.local.example` zu `.env.local` kopieren und Werte eintragen (auf Vercel dieselben Variablen unter *Settings → Environment Variables* setzen und neu deployen):

```env
WEBDE_USER=mpetrasco@web.de
WEBDE_PASSWORD=ihr-web.de-passwort
CONTACT_TO=mpetrasco@web.de
```

4. Server neu starten (`npm run dev`).

> **Fallback:** Sind `WEBDE_USER` / `WEBDE_PASSWORD` nicht gesetzt, wird – falls vorhanden – Gmail SMTP mit `GMAIL_USER` / `GMAIL_APP_PASSWORD` verwendet.

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
    contact-action.ts    # Server Action → web.de SMTP
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
