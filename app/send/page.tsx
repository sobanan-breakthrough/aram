'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import { sendContent } from '@/content/send';
import { Accessibility, Heart } from 'lucide-react';

export default function SendPage() {
  const { locale } = useLocale();

  const explainers = sendContent.filter(i => i.type === 'explainer');
  const guides = sendContent.filter(i => i.type === 'guide');
  const resources = sendContent.filter(i => i.type === 'resource');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Accessibility className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-text-primary">
            {locale === 'en' ? 'SEND' : 'SEND'}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {locale === 'en'
            ? 'Support for children and adults with Special Educational Needs and Disabilities'
            : 'சிறப்புக் கல்வித் தேவைகள் மற்றும் குறைபாடுகள் உள்ள குழந்தைகள் மற்றும் பெரியவர்களுக்கான ஆதரவு'}
        </p>
      </div>

      {/* Affirming message */}
      <div className="flex items-start gap-3 rounded-xl bg-success/5 border border-success/20 p-4">
        <Heart className="h-5 w-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm text-text-primary leading-relaxed font-medium">
          {locale === 'en'
            ? 'Your child is not broken. They simply learn and experience the world differently. With understanding and the right support, every person can thrive.'
            : 'உங்கள் குழந்தை உடைந்தவர் அல்ல. அவர்கள் வெறுமனே உலகத்தை வேறுவிதமாக கற்றுக்கொள்கிறார்கள் மற்றும் அனுபவிக்கிறார்கள். புரிதல் மற்றும் சரியான ஆதரவுடன், ஒவ்வொரு நபரும் செழிக்க முடியும்.'}
        </p>
      </div>

      {/* Understanding SEND */}
      <AccordionSection
        title={locale === 'en' ? 'Understanding SEND' : 'SEND-ஐப் புரிந்துகொள்ளுதல்'}
        defaultOpen
      >
        <div className="space-y-3">
          {explainers.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Support at Home & School */}
      <AccordionSection
        title={locale === 'en' ? 'Support at Home & School' : 'வீட்டிலும் பள்ளியிலும் ஆதரவு'}
      >
        <div className="space-y-3">
          {guides.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </AccordionSection>

      {/* Services */}
      <div>
        <h2 className="text-base font-semibold text-text-primary mb-3">
          {locale === 'en' ? 'Services & Organisations' : 'சேவைகள் & நிறுவனங்கள்'}
        </h2>
        <div className="space-y-3">
          {resources.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
