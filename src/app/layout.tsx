import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ReduxProvider from '@/store/provider';

import './globals.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

// Font files can be colocated inside of `app`
export const myTitle = localFont({
  src: '/fonts/coolvetica/coolvetica_rg.otf',
  display: 'swap',
});

// Font files can be colocated inside of `app`
export const mySubtitle = localFont({
  src: '/fonts/ailerons/Ailerons-Typeface.otf',
  display: 'swap',
});

// Font files can be colocated inside of `app`
export const Tahoma = localFont({
  src: '/fonts/tahoma.woff',
  display: 'swap',
});

const metadata = {
  title: 'Taguara Digital',
  description: 'Te conecta con tu audiencia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Tahoma.className} min-h-screen`}>
        <ReduxProvider>
          <Header />
          <div className="pt-[var(--header-height)] h-[calc(100vh-(var(--header-height)))]">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
