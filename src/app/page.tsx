import { CategoriesSection } from '@/components/home/categories-section';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <WhyChooseSection />
      <HowItWorksSection />
    </>
  );
}
