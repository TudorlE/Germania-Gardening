import type { Metadata } from 'next';
import { Geist, Dancing_Script } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { hasLocale, locales, type Locale } from './dictionaries';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const dancing = Dancing_Script({
  variable: '--font-script',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mp-galabau.de'),
  title: {
    default: 'MP Galabau — Garten- & Landschaftsbau | Wir gestalten Ihre Natur',
    template: '%s · MP Galabau',
  },
  description:
    'MP Galabau — Garten- und Landschaftsbau. Gartenpflege, Pflasterarbeiten, Heckenschnitt, Baumfällung, Rollrasen und Winterdienst. Qualität, die man sieht.',
  applicationName: 'MP Galabau',
  authors: [{ name: 'MP Galabau' }],
  keywords: [
    'MP Galabau',
    'Garten- und Landschaftsbau',
    'Gartenpflege',
    'Pflasterarbeiten',
    'Heckenschnitt',
    'Baumfällung',
    'Rollrasen',
    'Winterdienst',
  ],
  openGraph: {
    type: 'website',
    title: 'MP Galabau — Wir gestalten Ihre Natur',
    description:
      'Garten- und Landschaftsbau. Qualität, die man sieht. Service, der überzeugt.',
    siteName: 'MP Galabau',
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
