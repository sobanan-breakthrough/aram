'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import PathwayCard from '@/components/PathwayCard';
import PillarHero from '@/components/PillarHero';
import { technologyContent, technologyPathways } from '@/content/technology';
import { Smartphone, Video, Store, Briefcase, GraduationCap } from 'lucide-react';

const pathwayIcons: Record<string, typeof Video> = {
  video: Video,
  store: Store,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
};

export default function TechnologyPage() {
  const { locale } = useLocale();

  const guides = technologyContent.filter(i => i.type === 'guide');
  const explainers = technologyContent.filter(i => i.type === 'explainer');
  const resources = technologyContent.filter(i => i.type === 'resource');

  return (
    <div className="space-y-6">
      <PillarHero
        pillar="technology"
        titleEn="Technology"
        titleTa="தொழில்நுட்பம்"
        subtitleEn="Digital literacy, AI tools in Tamil, and four creator economy pathways for earning with your smartphone. Built for beginners and intermediate users."
        subtitleTa="டிஜிட்டல் எழுத்தறிவு, தமிழில் AI கருவிகள், உங்கள் ஸ்மார்ட்ஃபோனில் சம்பாதிக்க நான்கு படைப்பாளர் பாதைகள். தொடக்கநிலை மற்றும் இடைநிலை பயனர்களுக்கு."
      />

      {/* Getting Started */}
      <AccordionSection
        title={locale === 'en' ? 'Getting Started' : 'தொடங்குதல்'}
        defaultOpen
      >
        <div className="space-y-3">
          {guides.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Understanding AI */}
      <AccordionSection
        title={locale === 'en' ? 'Understanding AI' : 'AI-ஐ புரிந்துகொள்ளுதல்'}
      >
        <div className="space-y-3">
          {explainers
            .filter(i => i.tags.includes('AI'))
            .map(item => (
              <ResourceCard key={item.id} item={item} />
            ))}
        </div>
      </AccordionSection>

      {/* Creator Economy Pathways */}
      <div>
        <h2 className="text-base font-semibold text-text-primary mb-1">
          {locale === 'en' ? 'Creator Economy Pathways' : 'படைப்பாளர் பொருளாதார பாதைகள்'}
        </h2>
        <p className="text-xs text-text-secondary mb-3">
          {locale === 'en'
            ? 'Four proven paths to earning income with your smartphone'
            : 'உங்கள் ஸ்மார்ட்ஃபோனில் வருமானம் ஈட்ட நான்கு நிரூபிக்கப்பட்ட வழிகள்'}
        </p>
        <div className="space-y-3">
          {technologyPathways.map(pathway => (
            <PathwayCard
              key={pathway.id}
              icon={pathwayIcons[pathway.icon] || Smartphone}
              titleEn={pathway.titleEn}
              titleTa={pathway.titleTa}
              timeToIncomeEn={pathway.timeToIncomeEn}
              timeToIncomeTa={pathway.timeToIncomeTa}
              skillLevelEn={pathway.skillLevelEn}
              skillLevelTa={pathway.skillLevelTa}
              descriptionEn={pathway.descriptionEn}
              descriptionTa={pathway.descriptionTa}
              stepsEn={pathway.stepsEn}
              stepsTa={pathway.stepsTa}
              risksEn={pathway.risksEn}
              risksTa={pathway.risksTa}
              resourcesEn={pathway.resourcesEn}
              resourcesTa={pathway.resourcesTa}
              resourceLinks={pathway.resourceLinks}
            />
          ))}
        </div>
      </div>

      {/* Tools & Resources */}
      <AccordionSection
        title={locale === 'en' ? 'Tools & Resources' : 'கருவிகள் & வளங்கள்'}
      >
        <div className="space-y-3">
          {resources.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
          {explainers
            .filter(i => i.tags.includes('income'))
            .map(item => (
              <ResourceCard key={item.id} item={item} />
            ))}
        </div>
      </AccordionSection>
    </div>
  );
}
