import { Montserrat } from 'next/font/google';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ReduxProvider from '@/store/provider';

import './globals.css';
import Script from 'next/script';

const montserrat = Montserrat({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const metadata = {
  title: 'Compara Mejor',
  description: 'Mas información, mejores decisiones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ReduxProvider>
          <Header />
          <div className="pt-[var(--header-height)] min-h-[calc(100vh-(var(--header-height)))] bg-myWhite">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
      <Script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-na1.hs-scripts.com/44039423.js"
      />
    </html>
  );
}
