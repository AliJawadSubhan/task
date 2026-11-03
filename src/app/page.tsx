import { HeroSection } from "@/components/hero";
import { AboutSection } from "@/components/about";
import { ServicesSection } from "@/components/services";
import { WhySection } from "@/components/why";
import { StackingCardsSection } from "@/components/stacking-cards/StackingCardsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/cta/CTASection";
import { FooterSection } from "@/components/footer/FooterSection";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  return (
    <>
      <main data-navbar-theme="light" className="bg-white p-4">
        <HeroSection />
        <div className="h-16 md:h-24" />
        <Reveal className="-mx-4">
          <AboutSection />
        </Reveal>
      </main>
      <StackingCardsSection />
      <div data-navbar-theme="light" className="bg-white p-4">
        <div className="h-16 md:h-24" />
        <ServicesSection />
        <div className="h-16 md:h-24" />
        <Reveal>
          <WhySection />
        </Reveal>
      </div>
      <Reveal>
        <TestimonialsSection />
      </Reveal>
      <Reveal>
        <CTASection />
      </Reveal>
      <div className="bg-white p-4">
        <Reveal>
          <FooterSection />
        </Reveal>
      </div>
    </>
  );
}
