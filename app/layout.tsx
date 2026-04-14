import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Tamil } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { LocaleProvider } from '@/lib/locale-context';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: '--font-noto-sans-tamil',
  subsets: ['tamil'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aram | அறம் — Community Resource Platform',
  description:
    'Resources for stronger communities. Built with you, not for you. A bilingual platform for war-affected Tamil communities in Sri Lanka.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Aram',
  },
};

export const viewport: Viewport = {
  themeColor: '#D4282B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansTamil.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider>
            <TopBar />
            <main className="flex-1 pb-20 px-4 py-4 max-w-lg mx-auto w-full">
              {children}
            </main>
            <BottomNav />
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
