'use client';

import { HeroSection } from './HeroSection';
import { BentoGrid } from './BentoGrid';
import { ExperienceTimeline } from './ExperienceTimeline';
import { FeaturedProjects } from './FeaturedProjects';
import { ContactCta } from './ContactCta';

const PageClient = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BentoGrid />
      <ExperienceTimeline />
      <FeaturedProjects />
      <ContactCta />
    </div>
  );
};

export { PageClient };
