import Script from 'next/script';

import './globals.css';
import { montserrat } from './ui/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ReduxProvider from '@/store/provider';

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
