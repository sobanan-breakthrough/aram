'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import PillarHero from '@/components/PillarHero';
import { educationContent } from '@/content/education';

const ageGroups = [
  { key: 'all', labelEn: 'All', labelTa: 'அனைத்தும்' },
  { key: 'early', labelEn: 'Early Years (0–5)', labelTa: 'ஆரம்ப ஆண்டுகள் (0–5)' },
  { key: 'primary', labelEn: 'Primary (6–11)', labelTa: 'ஆரம்பக்கல்வி (6–11)' },
  { key: 'secondary', labelEn: 'Secondary (12–18)', labelTa: 'இரண்டாம் நிலை (12–18)' },
  { key: 'adult', labelEn: 'Adult', labelTa: 'பெரியவர்' },
];

const ageTagMap: Record<string, string[]> = {
  early: ['children', 'parents'],
  primary: ['children', 'parents', 'home learning'],
  secondary: ['higher education', 'scholarships', 'online learning'],
  adult: ['adult education', 'literacy', 'vocational', 'online learning'],
};

export default function EducationPage() {
  const { locale } = useLocale();
  const [ageFilter, setAgeFilter] = useState('all');

  const filteredContent = ageFilter === 'all'
    ? educationContent
    : educationContent.filter(item =>
        item.tags.some(tag => ageTagMap[ageFilter]?.includes(tag))
      );

  return (
    <div className="space-y-6">
      <PillarHero
        pillar="education"
        titleEn="Education"
        titleTa="கல்வி"
        subtitleEn="Support for children, adult learners, and everyone in between. From early years through O/L, A/L, and university pathways."
        subtitleTa="குழந்தைகள், பெரியவர் கற்போருக்கு ஆதரவு. ஆரம்ப ஆண்டுகள் முதல் O/L, A/L, பல்கலைக்கழக பாதைகள் வரை."
      />

      {/* Age group filter */}
      <div>
        <h2 className="text-xs font-semibold text-text-secondary mb-2">
          {locale === 'en' ? 'Filter by age group' : 'வயது குழுவின்படி வடிகட்டு'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map(group => (
            <button
              key={group.key}
              onClick={() => setAgeFilter(group.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                ageFilter === group.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface text-text-secondary border-border hover:border-primary/30'
              }`}
              aria-label={locale === 'en' ? group.labelEn : group.labelTa}
              aria-pressed={ageFilter === group.key}
            >
              {locale === 'en' ? group.labelEn : group.labelTa}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered content */}
      <div className="space-y-3">
        {filteredContent.length > 0 ? (
          filteredContent.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-sm text-text-secondary text-center py-4">
            {locale === 'en' ? 'No resources found for this age group' : 'இந்த வயது குழுவுக்கான வளங்கள் கிடைக்கவில்லை'}
          </p>
        )}
      </div>
    </div>
  );
}
