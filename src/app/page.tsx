import { HeroSliderSection } from '@/components/Hero';
import { ContactSection } from '@/components/ContactSection';

export default function LandinPage() {
  return (
    <main className="relative h-full">
      <h1>Compara Mejor</h1>
      <HeroSliderSection />
      <ContactSection />
      {/* <Services /> */}
      {/* <VideoSection title={'¿Cómo funciona?'} /> */}
      {/* <Pricing /> */}
      {/* <Faq /> */}
    </main>
  );
}
