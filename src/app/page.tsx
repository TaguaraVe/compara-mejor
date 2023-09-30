'use client';
import Script from 'next/script';

import { ContactSection } from '@/components/ContactSection';
import { Hero } from '@/components/Hero/hero';
import { Services } from '@/components/Services';

export default function LandinPage() {
  return (
    <>
      <main className="relative h-full">
        <Hero />
        <Services />
        <ContactSection />
      </main>
      <Script
        id="TagManager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59QFZTHB');`,
        }}
      />
      ;
    </>
  );
}
