import { Montserrat } from 'next/font/google';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ReduxProvider from '@/store/provider';
import Script from 'next/script';

import './globals.css';

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
      <body className={`${montserrat.className} min-h-screen`}>
        <ReduxProvider>
          <Header />
          <div className="pt-[var(--header-height)] min-h-[calc(100vh-(var(--header-height)))]">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RT8CNZEZRE"
        />
        <Script
          id="GoogleAnalitic"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'G-RT8CNZEZRE');`,
          }}
        />
      </body>
    </html>
  );
}
