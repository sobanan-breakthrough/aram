'use client';

import { useLocale } from '@/lib/locale-context';
import PillarCard from '@/components/PillarCard';
import AccordionSection from '@/components/AccordionSection';
import ResourceCard from '@/components/ResourceCard';
import { getRandomResource } from '@/lib/search';
import {
  Heart,
  Accessibility,
  Stethoscope,
  Smartphone,
  Users,
  GraduationCap,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: Heart,
    titleEn: 'Wellbeing',
    titleTa: 'நல்வாழ்வு',
    descriptionEn: 'Mental, emotional, and spiritual support',
    descriptionTa: 'மன, உணர்வு மற்றும் ஆன்மீக ஆதரவு',
    href: '/wellbeing',
  },
  {
    icon: Accessibility,
    titleEn: 'SEND',
    titleTa: 'SEND',
    descriptionEn: 'Special Educational Needs & Disabilities',
    descriptionTa: 'சிறப்புக் கல்வித் தேவைகள் & குறைபாடுகள்',
    href: '/send',
  },
  {
    icon: Stethoscope,
    titleEn: 'Healthcare',
    titleTa: 'சுகாதாரம்',
    descriptionEn: 'Health education and signposting',
    descriptionTa: 'சுகாதார கல்வி மற்றும் வழிகாட்டல்',
    href: '/health',
  },
  {
    icon: Smartphone,
    titleEn: 'Technology',
    titleTa: 'தொழில்நுட்பம்',
    descriptionEn: 'Digital skills and the creator economy',
    descriptionTa: 'டிஜிட்டல் திறன்கள் மற்றும் படைப்பாளர் பொருளாதாரம்',
    href: '/technology',
  },
  {
    icon: Users,
    titleEn: 'Community',
    titleTa: 'சமூகம்',
    descriptionEn: 'Enterprise and economic resilience',
    descriptionTa: 'நிறுவனம் மற்றும் பொருளாதார நெகிழ்திறன்',
    href: '/community',
  },
  {
    icon: GraduationCap,
    titleEn: 'Education',
    titleTa: 'கல்வி',
    descriptionEn: 'Learning support for all ages',
    descriptionTa: 'அனைத்து வயதினருக்கான கற்றல் ஆதரவு',
    href: '/education',
  },
  {
    icon: Globe,
    titleEn: 'Diaspora',
    titleTa: 'புலம்பெயர்வு',
    descriptionEn: 'Connect with and support Sri Lanka',
    descriptionTa: 'இலங்கையுடன் இணையுங்கள் மற்றும் ஆதரியுங்கள்',
    href: '/diaspora',
  },
];

export default function HomePage() {
  const { locale } = useLocale();
  const todaysResource = getRandomResource();

  return (
    <div className="space-y-5">
      {/* Bilingual welcome — intentionally both languages shown */}
      <header className="text-center py-2 sm:py-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary leading-tight">
          Welcome to Aram
        </h1>
        <p className="text-xl sm:text-2xl font-bold text-primary font-tamil mt-0.5 leading-tight">
          அறத்திற்கு வரவேற்கிறோம்
        </p>
        <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-md mx-auto leading-relaxed">
          {locale === 'en'
            ? 'Resources for stronger communities. Built with you, not for you.'
            : 'வலுவான சமூகங்களுக்கான வளங்கள். உங்களுக்காக அல்ல, உங்களுடன் கட்டப்பட்டது.'}
        </p>
      </header>

      {/* Ask Aram — AI assistant callout (moved above pillars for prominence) */}
      <Link
        href="/assistant"
        className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
        aria-label={locale === 'en' ? 'Ask Aram — AI assistant' : 'அறத்திடம் கேளுங்கள் — AI உதவியாளர்'}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 flex-shrink-0">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-base font-semibold leading-tight">
              {locale === 'en' ? 'Ask Aram' : 'அறத்திடம் கேளுங்கள்'}
            </p>
            <p className="text-xs opacity-90 mt-0.5">
              {locale === 'en'
                ? 'Your bilingual AI guide'
                : 'உங்கள் இரு மொழி AI வழிகாட்டி'}
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      </Link>

      {/* Pillar grid — responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
      <section aria-label={locale === 'en' ? 'Resource pillars' : 'வளத் தூண்கள்'}>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          {locale === 'en' ? 'Explore resources' : 'வளங்களை ஆராயுங்கள்'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {pillars.map(pillar => (
            <PillarCard key={pillar.href} {...pillar} />
          ))}
        </div>
      </section>

      {/* Today's Resource */}
      <section>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          {locale === 'en' ? "Today's Resource" : 'இன்றைய வளம்'}
        </h2>
        <ResourceCard item={todaysResource} />
      </section>

      {/* Diaspora callout */}
      <Link
        href="/diaspora"
        className="flex items-center justify-between rounded-xl bg-primary/5 border border-primary/20 p-4 hover:bg-primary/10 transition-colors"
        aria-label={locale === 'en' ? 'Coming from abroad? Start here' : 'வெளிநாட்டிலிருந்து வருகிறீர்களா? இங்கே தொடங்குங்கள்'}
      >
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium text-text-primary">
            {locale === 'en' ? 'Coming from abroad? Start here' : 'வெளிநாட்டிலிருந்து வருகிறீர்களா? இங்கே தொடங்குங்கள்'}
          </span>
        </div>
        <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
      </Link>

      {/* How to use */}
      <AccordionSection
        title={locale === 'en' ? 'How to use this app' : 'இந்த செயலியை எப்படி பயன்படுத்துவது'}
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          {locale === 'en'
            ? 'Aram is a community resource platform with seven pillars of support. Tap any pillar above to explore resources, guides, and tools. Use the language toggle (EN/த) at the top to switch between English and Tamil. All content works offline once loaded.'
            : 'அறம் ஏழு தூண்களின் ஆதரவுடன் ஒரு சமூக வள தளமாகும். எந்த தூணையும் தட்டி வளங்கள், வழிகாட்டிகள் மற்றும் கருவிகளை ஆராயுங்கள். மேலே உள்ள மொழி மாற்றியை (EN/த) பயன்படுத்தி ஆங்கிலம் மற்றும் தமிழ் இடையே மாறுங்கள். ஒருமுறை ஏற்றப்பட்ட அனைத்து உள்ளடக்கமும் இணைப்பில்லாமலும் செயல்படும்.'}
        </p>
      </AccordionSection>
    </div>
  );
}
