'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import { diasporaContent } from '@/content/diaspora';
import { Globe, AlertCircle } from 'lucide-react';

export default function DiasporaPage() {
  const { locale } = useLocale();

  const guides = diasporaContent.filter(i => i.type === 'guide');
  const explainers = diasporaContent.filter(i => i.type === 'explainer');
  const resources = diasporaContent.filter(i => i.type === 'resource');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-text-primary">
            {locale === 'en' ? 'Diaspora Reconnection' : 'புலம்பெயர் மீள்இணைப்பு'}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {locale === 'en'
            ? 'Support for Tamil diaspora members connecting with Sri Lanka'
            : 'இலங்கையுடன் இணையும் தமிழ் புலம்பெயர்ந்தோருக்கான ஆதரவு'}
        </p>
      </div>

      {/* Context */}
      <AccordionSection
        title={locale === 'en' ? 'Understanding the Context' : 'சூழலைப் புரிந்துகொள்ளுதல்'}
        defaultOpen
      >
        <div className="flex items-start gap-2 mb-3">
          <AlertCircle className="h-4 w-4 text-info mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-text-secondary leading-relaxed">
            {locale === 'en'
              ? 'The Northern and Eastern Provinces of Sri Lanka have changed significantly since the end of the conflict. Infrastructure has been rebuilt in some areas but remains lacking in others. The economy is recovering but many families still struggle. Political dynamics remain complex. Daily life carries both progress and ongoing challenges.'
              : 'இலங்கையின் வடக்கு மற்றும் கிழக்கு மாகாணங்கள் மோதல் முடிந்ததிலிருந்து குறிப்பிடத்தக்க மாற்றங்களைக் கண்டுள்ளன. உள்கட்டமைப்பு சில பகுதிகளில் மீண்டும் கட்டப்பட்டுள்ளது ஆனால் மற்ற பகுதிகளில் பற்றாக்குறையாக உள்ளது.'}
          </p>
        </div>
      </AccordionSection>

      {/* Visiting */}
      <AccordionSection
        title={locale === 'en' ? 'Visiting Sri Lanka' : 'இலங்கைக்கு வருகை தருதல்'}
      >
        <div className="space-y-3">
          {guides.filter(i => i.tags.includes('visiting')).map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Sending Resources */}
      <AccordionSection
        title={locale === 'en' ? 'Sending Resources Home' : 'வீட்டுக்கு வளங்கள் அனுப்புதல்'}
      >
        <div className="space-y-3">
          {guides.filter(i => i.tags.includes('remittance')).map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
          {explainers.filter(i => i.tags.includes('ethics')).map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Building Connections */}
      <AccordionSection
        title={locale === 'en' ? 'Building Connections' : 'இணைப்புகளை உருவாக்குதல்'}
      >
        <div className="space-y-3">
          {resources.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Returning */}
      <AccordionSection
        title={locale === 'en' ? 'Returning or Investing' : 'திரும்புதல் அல்லது முதலீடு செய்தல்'}
      >
        <div className="space-y-3">
          {explainers.filter(i => i.tags.includes('investment')).map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
