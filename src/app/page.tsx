import { ContactSection } from '@/components/ContactSection';
import { Hero } from '@/components/Hero/hero';
import { Services } from '@/components/Services';

export default function LandinPage() {
  return (
    <main className="relative h-full">
      <Hero />
      <Services />
      <ContactSection />
    </main>
  );
}
