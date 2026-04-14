'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import { communityContent } from '@/content/community';
import { Users, TrendingUp } from 'lucide-react';

export default function CommunityPage() {
  const { locale } = useLocale();

  const guides = communityContent.filter(i => i.type === 'guide');
  const explainers = communityContent.filter(i => i.type === 'explainer');
  const resources = communityContent.filter(i => i.type === 'resource');
  const stories = communityContent.filter(i => i.type === 'story');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-text-primary">
            {locale === 'en' ? 'Community Development' : 'சமூக மேம்பாடு'}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {locale === 'en'
            ? 'Build economic resilience and entrepreneurial capability'
            : 'பொருளாதார நெகிழ்திறன் மற்றும் தொழில் முனைவோர் திறனை கட்டமைத்தல்'}
        </p>
      </div>

      {/* Community Economy */}
      <AccordionSection
        title={locale === 'en' ? 'Understanding Your Community Economy' : 'உங்கள் சமூக பொருளாதாரத்தைப் புரிந்துகொள்ளுதல்'}
        defaultOpen
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          {locale === 'en'
            ? 'The Tamil areas of Sri Lanka have a vibrant informal economy driven by resilience and resourcefulness. Women-led microenterprises, agricultural cooperatives, and fishing communities form the backbone of local economies. Digital tools and the creator economy offer new ways to connect local production to wider markets.'
            : 'இலங்கையின் தமிழ் பகுதிகளில் நெகிழ்திறன் மற்றும் வளமிக்க தன்மையால் இயக்கப்படும் ஒரு துடிப்பான முறைசாரா பொருளாதாரம் உள்ளது. பெண்கள் தலைமையிலான நுண் நிறுவனங்கள், வேளாண் கூட்டுறவு சங்கங்கள், மீன்பிடி சமூகங்கள் உள்ளூர் பொருளாதாரங்களின் முதுகெலும்பாக உள்ளன.'}
        </p>
      </AccordionSection>

      {/* Micro-Enterprise */}
      <AccordionSection
        title={locale === 'en' ? 'Starting a Micro-Enterprise' : 'நுண் நிறுவனத்தைத் தொடங்குதல்'}
      >
        <div className="space-y-3">
          {guides.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Financial Basics */}
      <AccordionSection
        title={locale === 'en' ? 'Financial Basics' : 'நிதி அடிப்படைகள்'}
      >
        <div className="space-y-3">
          {explainers.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
          {resources.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Community Voices */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-secondary" aria-hidden="true" />
          <h2 className="text-base font-semibold text-text-primary">
            {locale === 'en' ? 'Community Voices' : 'சமூக குரல்கள்'}
          </h2>
        </div>
        <p className="text-xs text-text-secondary mb-3">
          {locale === 'en'
            ? 'Stories from community members who have built something meaningful'
            : 'அர்த்தமுள்ள ஒன்றை உருவாக்கிய சமூக உறுப்பினர்களின் கதைகள்'}
        </p>
        <div className="space-y-3">
          {stories.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
