import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import { Navbar } from '../_components/Navbar';
import { Hero } from '../_components/Hero';
import { About } from '../_components/About';
import { Services } from '../_components/Services';
import { Showcase } from '../_components/Showcase';
import { Contact } from '../_components/Contact';
import { Footer } from '../_components/Footer';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar locale={lang} dict={dict} />
      <main className="flex-1">
        <Hero locale={lang} dict={dict} />
        <About dict={dict} />
        <Services dict={dict} />
        <Showcase dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer locale={lang} dict={dict} />
    </>
  );
}
