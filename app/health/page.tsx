'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import TrainTheTrainerBadge from '@/components/TrainTheTrainerBadge';
import { healthContent } from '@/content/health';
import { Stethoscope, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function HealthPage() {
  const { locale } = useLocale();
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const topics = healthContent.filter(i => i.type === 'explainer');
  const hospitals = healthContent.filter(
    i => i.type === 'resource' && (regionFilter === 'all' || i.region === regionFilter || i.region === 'national')
  );
  const guides = healthContent.filter(i => i.type === 'guide');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Stethoscope className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-text-primary">
            {locale === 'en' ? 'Healthcare' : 'சுகாதாரம்'}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {locale === 'en'
            ? 'Health education, awareness, and peer-to-peer signposting'
            : 'சுகாதார கல்வி, விழிப்புணர்வு மற்றும் சக வழிகாட்டல்'}
        </p>
      </div>

      {/* Health Topics */}
      <AccordionSection
        title={locale === 'en' ? 'Health Awareness Topics' : 'சுகாதார விழிப்புணர்வு தலைப்புகள்'}
        defaultOpen
      >
        <div className="space-y-3">
          {topics.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Finding Healthcare */}
      <AccordionSection
        title={locale === 'en' ? 'Finding Healthcare' : 'சுகாதார சேவையைக் கண்டறிதல்'}
      >
        <div className="space-y-3">
          <div className="flex items-start gap-2 mb-2">
            <Building2 className="h-4 w-4 text-info mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-text-secondary leading-relaxed">
              {locale === 'en'
                ? 'Sri Lanka has a public healthcare system accessible to all citizens. The Medical Officer of Health (MOH) system provides primary care at the divisional level. Divisional hospitals handle common conditions. Teaching hospitals in Jaffna and Batticaloa serve as referral centres for the North and East.'
                : 'இலங்கையில் அனைத்து குடிமக்களுக்கும் அணுகக்கூடிய பொது சுகாதார முறை உள்ளது. சுகாதார அலுவலர் (MOH) முறை பிரிவு மட்டத்தில் அடிப்படை சுகாதாரத்தை வழங்குகிறது.'}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-text-primary">
              {locale === 'en' ? 'Hospitals' : 'மருத்துவமனைகள்'}
            </h3>
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="text-xs border border-border rounded-lg px-2 py-1.5 bg-surface text-text-primary"
              aria-label={locale === 'en' ? 'Filter by region' : 'பிராந்தியத்தின்படி வடிகட்டு'}
            >
              <option value="all">{locale === 'en' ? 'All regions' : 'அனைத்தும்'}</option>
              <option value="north">{locale === 'en' ? 'Northern Province' : 'வட மாகாணம்'}</option>
              <option value="east">{locale === 'en' ? 'Eastern Province' : 'கிழக்கு மாகாணம்'}</option>
            </select>
          </div>
          {hospitals.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Peer Health Guide */}
      <AccordionSection
        title={locale === 'en' ? 'Peer Health Supporter Guide' : 'சக சுகாதார ஆதரவாளர் வழிகாட்டி'}
      >
        <div className="space-y-3">
          {guides.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
