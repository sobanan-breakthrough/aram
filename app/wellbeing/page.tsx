'use client';

import { useLocale } from '@/lib/locale-context';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import SelfAssessmentTool from '@/components/SelfAssessmentTool';
import TrainTheTrainerBadge from '@/components/TrainTheTrainerBadge';
import { wellbeingContent } from '@/content/wellbeing';
import { Heart, BookOpen, Flower2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WellbeingPage() {
  const { locale } = useLocale();
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const resources = wellbeingContent.filter(
    item => item.type === 'resource' && (regionFilter === 'all' || item.region === regionFilter || item.region === 'all' || item.region === 'national')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold text-text-primary">
            {locale === 'en' ? 'Wellbeing' : 'நல்வாழ்வு'}
          </h1>
        </div>
        <p className="text-sm text-text-secondary">
          {locale === 'en'
            ? 'Holistic mental, emotional, and spiritual wellbeing support'
            : 'முழுமையான மன, உணர்வு மற்றும் ஆன்மீக நல்வாழ்வு ஆதரவு'}
        </p>
      </div>

      {/* Understanding Wellbeing */}
      <AccordionSection
        title={locale === 'en' ? 'Understanding Wellbeing' : 'நல்வாழ்வைப் புரிந்துகொள்ளுதல்'}
        defaultOpen
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          {locale === 'en'
            ? 'Wellbeing is not just the absence of illness. It is feeling safe, connected, and hopeful. After years of conflict, displacement, and loss, it is natural to carry grief and stress. Healing does not mean forgetting — it means finding ways to live with what has happened while building a life of meaning and dignity.'
            : 'நல்வாழ்வு என்பது நோய் இல்லாத நிலை மட்டுமல்ல. பாதுகாப்பாக, இணைக்கப்பட்டதாக, நம்பிக்கையுடன் உணர்வது. பல ஆண்டுகால மோதல், இடப்பெயர்வு, இழப்புக்குப் பிறகு, துக்கம் மற்றும் மன அழுத்தத்தை சுமப்பது இயற்கையானது. குணமடைவது மறப்பது அல்ல — நடந்ததை ஏற்றுக்கொண்டு அர்த்தமுள்ள வாழ்க்கையை கட்டமைப்பது.'}
        </p>
      </AccordionSection>

      {/* Self-Assessment */}
      <AccordionSection
        title={locale === 'en' ? 'Wellbeing Check-in' : 'நல்வாழ்வு சோதனை'}
      >
        <SelfAssessmentTool />
      </AccordionSection>

      {/* Peer Support Guide Link */}
      <Link
        href="/wellbeing/peer-guide"
        className="flex items-center gap-3 rounded-xl bg-surface border border-border p-4 hover:border-primary/30 transition-colors"
        aria-label={locale === 'en' ? 'Peer Support Guide' : 'சக ஆதரவு வழிகாட்டி'}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-info/10 flex-shrink-0">
          <BookOpen className="h-5 w-5 text-info" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-text-primary">
              {locale === 'en' ? 'Peer Support Guide' : 'சக ஆதரவு வழிகாட்டி'}
            </h3>
            <TrainTheTrainerBadge />
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            {locale === 'en'
              ? 'A step-by-step guide for supporting someone in distress'
              : 'துன்பத்தில் உள்ள ஒருவரை ஆதரிப்பதற்கான படிப்படியான வழிகாட்டி'}
          </p>
        </div>
      </Link>

      {/* Resources */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-text-primary">
            {locale === 'en' ? 'Resources & Services' : 'வளங்கள் & சேவைகள்'}
          </h2>
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="text-xs border border-border rounded-lg px-2 py-1.5 bg-surface text-text-primary"
            aria-label={locale === 'en' ? 'Filter by region' : 'பிராந்தியத்தின்படி வடிகட்டு'}
          >
            <option value="all">{locale === 'en' ? 'All regions' : 'அனைத்து பிராந்தியங்கள்'}</option>
            <option value="north">{locale === 'en' ? 'Northern Province' : 'வட மாகாணம்'}</option>
            <option value="east">{locale === 'en' ? 'Eastern Province' : 'கிழக்கு மாகாணம்'}</option>
          </select>
        </div>
        <div className="space-y-3">
          {resources.map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Spiritual Wellbeing */}
      <AccordionSection
        title={locale === 'en' ? 'Spiritual & Cultural Wellbeing' : 'ஆன்மீக & கலாச்சார நல்வாழ்வு'}
      >
        <div className="flex items-start gap-2 mb-3">
          <Flower2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-text-secondary leading-relaxed">
            {locale === 'en'
              ? 'Temple, prayer, community gathering, and cultural practice have always been sources of strength for Tamil communities. Healing is not only clinical — it is also found in ritual, in song, in the support of elders, and in the rhythms of daily life.'
              : 'கோயில், வழிபாடு, சமூக கூட்டம், கலாச்சார நடைமுறைகள் எப்போதும் தமிழ் சமூகங்களுக்கு வலிமையின் ஊற்றாக இருந்துள்ளன. குணமடைவது மருத்துவ ரீதியானது மட்டுமல்ல — சடங்குகளிலும், பாடல்களிலும், பெரியோர்களின் ஆதரவிலும், அன்றாட வாழ்க்கையின் ஓட்டத்திலும் உள்ளது.'}
          </p>
        </div>
        {wellbeingContent
          .filter(item => item.type === 'explainer')
          .map(item => (
            <ResourceCard key={item.id} item={item} />
          ))}
      </AccordionSection>
    </div>
  );
}
