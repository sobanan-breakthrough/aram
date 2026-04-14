'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import PathwayCard from '@/components/PathwayCard';
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
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-text-primary">
            {locale === 'en' ? 'Technology' : 'தொழில்நுட்பம்'}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {locale === 'en'
            ? 'Digital and AI literacy for economic participation'
            : 'பொருளாதார பங்கேற்பிற்கான டிஜிட்டல் மற்றும் AI எழுத்தறிவு'}
        </p>
      </div>

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
