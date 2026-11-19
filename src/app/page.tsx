import { CategoriesSection } from '@/components/home/categories-section';
import { FeaturedServices } from '@/components/home/featured-services';
import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <CategoriesSection />
      <WhyChooseSection />
      <HowItWorksSection />
    </>
  );
}
