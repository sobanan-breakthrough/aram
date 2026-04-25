'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  Heart,
  Stethoscope,
  Smartphone,
  Users,
  GraduationCap,
  Accessibility,
  Globe,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Step1Choice = 'self' | 'someone-else' | 'community';
type Step2Choice = 'feelings' | 'health' | 'money' | 'children' | 'learning' | 'abroad' | 'unsure';

interface Recommendation {
  pillar: string;
  href: string;
  titleEn: string;
  titleTa: string;
  reasonEn: string;
  reasonTa: string;
  icon: LucideIcon;
}

const recommendations: Record<Step2Choice, Recommendation[]> = {
  feelings: [
    { pillar: 'wellbeing', href: '/wellbeing', titleEn: 'Wellbeing', titleTa: 'நல்வாழ்வு', icon: Heart,
      reasonEn: 'Mental, emotional, and spiritual support — including a private wellbeing check-in and crisis hotlines.',
      reasonTa: 'மன, உணர்வு மற்றும் ஆன்மீக ஆதரவு — தனிப்பட்ட நல்வாழ்வு சோதனை மற்றும் நெருக்கடி உதவி எண்கள் உட்பட.' },
    { pillar: 'assistant', href: '/assistant', titleEn: 'Ask Aram', titleTa: 'அறத்திடம் கேளுங்கள்', icon: Sparkles,
      reasonEn: 'Talk to our bilingual AI guide — it can listen and signpost you to the right support.',
      reasonTa: 'எங்கள் இரு மொழி AI வழிகாட்டியுடன் பேசுங்கள் — அது கேட்கும், சரியான ஆதரவை குறிப்பிடும்.' },
  ],
  health: [
    { pillar: 'health', href: '/health', titleEn: 'Healthcare', titleTa: 'சுகாதாரம்', icon: Stethoscope,
      reasonEn: 'Health topics, hospital information, and how to navigate the Sri Lankan health system.',
      reasonTa: 'சுகாதார தலைப்புகள், மருத்துவமனை தகவல், இலங்கை சுகாதார முறையை எப்படி வழிசெலுத்துவது.' },
  ],
  money: [
    { pillar: 'community', href: '/community', titleEn: 'Community Development', titleTa: 'சமூக மேம்பாடு', icon: Users,
      reasonEn: 'Starting a business, financial basics, business models, and stories from people who have done it.',
      reasonTa: 'வணிகம் தொடங்குதல், நிதி அடிப்படைகள், வணிக மாதிரிகள், செய்தவர்களின் கதைகள்.' },
    { pillar: 'technology', href: '/technology', titleEn: 'Technology', titleTa: 'தொழில்நுட்பம்', icon: Smartphone,
      reasonEn: 'Earn with your phone — four creator economy pathways with detailed steps.',
      reasonTa: 'உங்கள் தொலைபேசியில் சம்பாதியுங்கள் — விரிவான படிகளுடன் நான்கு படைப்பாளர் பாதைகள்.' },
  ],
  children: [
    { pillar: 'education', href: '/education', titleEn: 'Education', titleTa: 'கல்வி', icon: GraduationCap,
      reasonEn: 'Supporting your child at school, free learning resources, scholarships, and exam tips.',
      reasonTa: 'பள்ளியில் உங்கள் குழந்தைக்கு ஆதரவு, இலவச கற்றல் வளங்கள், புலமைப்பரிசில்கள், தேர்வு குறிப்புகள்.' },
    { pillar: 'send', href: '/send', titleEn: 'SEND Support', titleTa: 'SEND ஆதரவு', icon: Accessibility,
      reasonEn: 'For children with additional needs (autism, dyslexia, hearing/vision, physical disabilities).',
      reasonTa: 'கூடுதல் தேவைகள் கொண்ட குழந்தைகளுக்கு (மன இயல்புத்தன்மை, டிஸ்லெக்சியா, கேள்வி/பார்வை, உடல் குறைபாடுகள்).' },
  ],
  learning: [
    { pillar: 'education', href: '/education', titleEn: 'Education', titleTa: 'கல்வி', icon: GraduationCap,
      reasonEn: 'Adult literacy, online courses, university pathways, and learning English.',
      reasonTa: 'பெரியவர் எழுத்தறிவு, ஆன்லைன் படிப்புகள், பல்கலைக்கழக பாதைகள், ஆங்கிலம் கற்றல்.' },
    { pillar: 'technology', href: '/technology', titleEn: 'Technology', titleTa: 'தொழில்நுட்பம்', icon: Smartphone,
      reasonEn: 'Use your phone to learn — Khan Academy, free apps, AI tools in Tamil.',
      reasonTa: 'கற்க உங்கள் தொலைபேசியைப் பயன்படுத்துங்கள் — Khan Academy, இலவச செயலிகள், தமிழில் AI கருவிகள்.' },
  ],
  abroad: [
    { pillar: 'diaspora', href: '/diaspora', titleEn: 'Diaspora Reconnection', titleTa: 'புலம்பெயர் மீள்இணைப்பு', icon: Globe,
      reasonEn: 'Visiting Sri Lanka, sending money, donating skills, and reconnecting with culture.',
      reasonTa: 'இலங்கைக்கு வருகை, பணம் அனுப்புதல், திறன்களை நன்கொடை செய்தல், கலாச்சாரத்துடன் மீள்இணைப்பு.' },
  ],
  unsure: [
    { pillar: 'assistant', href: '/assistant', titleEn: 'Ask Aram', titleTa: 'அறத்திடம் கேளுங்கள்', icon: Sparkles,
      reasonEn: 'If you are not sure where to start, our AI guide can listen and point you in the right direction.',
      reasonTa: 'எங்கு தொடங்குவது என்று தெரியவில்லை என்றால், எங்கள் AI வழிகாட்டி கேட்டு சரியான திசையில் வழிநடத்தும்.' },
  ],
};

const step2Options: { key: Step2Choice; labelEn: string; labelTa: string }[] = [
  { key: 'feelings', labelEn: 'Feelings, stress, mental health', labelTa: 'உணர்வுகள், மன அழுத்தம், மனநலம்' },
  { key: 'health', labelEn: 'Physical health & medical questions', labelTa: 'உடல் ஆரோக்கியம் & மருத்துவ கேள்விகள்' },
  { key: 'money', labelEn: 'Earning money or starting work', labelTa: 'பணம் சம்பாதித்தல் அல்லது வேலை தொடங்குதல்' },
  { key: 'children', labelEn: 'A child in your family', labelTa: 'உங்கள் குடும்பத்தில் ஒரு குழந்தை' },
  { key: 'learning', labelEn: 'Education or learning', labelTa: 'கல்வி அல்லது கற்றல்' },
  { key: 'abroad', labelEn: 'Living abroad / connecting with home', labelTa: 'வெளிநாட்டில் வாழ்தல் / தாயகத்துடன் இணைதல்' },
  { key: 'unsure', labelEn: "I'm not sure", labelTa: 'எனக்கு தெரியவில்லை' },
];

export default function HelpFinder() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [step1, setStep1] = useState<Step1Choice | null>(null);
  const [step2, setStep2] = useState<Step2Choice | null>(null);

  const reset = () => {
    setStep(1);
    setStep1(null);
    setStep2(null);
  };
  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const recs = step2 ? recommendations[step2] : [];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between rounded-2xl bg-secondary/15 hover:bg-secondary/20 border border-secondary/30 p-4 sm:p-5 transition-all active:scale-[0.99] text-left"
        aria-label={locale === 'en' ? 'Find help — guided 30-second wizard' : 'உதவி கண்டறி — வழிகாட்டப்பட்ட 30-வினாடி வழிகாட்டி'}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/30 flex-shrink-0">
            <Compass className="h-5 w-5 text-secondary-dark" aria-hidden="true" />
          </div>
          <div>
            <p className="text-base font-semibold text-text-primary leading-tight">
              {locale === 'en' ? 'Not sure where to start?' : 'எங்கு தொடங்குவது என்று தெரியவில்லையா?'}
            </p>
            <p className="text-xs text-text-secondary mt-0.5">
              {locale === 'en' ? '30 seconds — we will guide you' : '30 வினாடிகள் — நாங்கள் வழிகாட்டுவோம்'}
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-secondary-dark flex-shrink-0" aria-hidden="true" />
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm no-print p-0 md:p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="helpfinder-title"
    >
      <div
        className="bg-surface w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary/20">
              <Compass className="h-5 w-5 text-secondary-dark" aria-hidden="true" />
            </div>
            <div>
              <h2 id="helpfinder-title" className="text-base font-bold text-text-primary leading-tight">
                {locale === 'en' ? 'Find what you need' : 'உங்களுக்கு தேவையானதை கண்டறியுங்கள்'}
              </h2>
              <p className="text-[11px] text-text-secondary mt-0.5">
                {locale === 'en' ? `Step ${step} of 3` : `படி ${step} / 3`}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-background transition-colors"
            aria-label={locale === 'en' ? 'Close' : 'மூடு'}
          >
            <X className="h-5 w-5 text-text-secondary" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-5">
          {step === 1 && (
            <>
              <h3 className="text-base font-semibold text-text-primary mb-1">
                {locale === 'en' ? 'Who are you looking for help for?' : 'நீங்கள் யாருக்கு உதவி தேடுகிறீர்கள்?'}
              </h3>
              <p className="text-[13px] text-text-secondary mb-4">
                {locale === 'en' ? 'There are no wrong answers.' : 'தவறான பதில்கள் இல்லை.'}
              </p>
              <div className="space-y-2">
                {([
                  { key: 'self' as const, en: 'Myself', ta: 'என்னை' },
                  { key: 'someone-else' as const, en: 'A family member, friend, or neighbour', ta: 'குடும்ப உறுப்பினர், நண்பர் அல்லது அண்டை வீட்டார்' },
                  { key: 'community' as const, en: 'My community / I am a worker / volunteer', ta: 'என் சமூகம் / நான் பணியாளர் / தன்னார்வலர்' },
                ]).map(o => (
                  <button
                    key={o.key}
                    onClick={() => { setStep1(o.key); setStep(2); }}
                    className="block w-full text-left rounded-xl bg-surface border border-border p-3.5 text-sm text-text-primary hover:border-primary/40 hover:bg-background transition-colors"
                  >
                    {locale === 'en' ? o.en : o.ta}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-base font-semibold text-text-primary mb-1">
                {locale === 'en' ? 'What is it about?' : 'அது எதைப் பற்றியது?'}
              </h3>
              <p className="text-[13px] text-text-secondary mb-4">
                {locale === 'en'
                  ? 'Pick the closest one. You can explore other areas too.'
                  : 'மிக நெருக்கமான ஒன்றை தேர்வு செய்யுங்கள். மற்ற பகுதிகளையும் ஆராயலாம்.'}
              </p>
              <div className="space-y-2">
                {step2Options.map(o => (
                  <button
                    key={o.key}
                    onClick={() => { setStep2(o.key); setStep(3); }}
                    className="block w-full text-left rounded-xl bg-surface border border-border p-3.5 text-sm text-text-primary hover:border-primary/40 hover:bg-background transition-colors"
                  >
                    {locale === 'en' ? o.labelEn : o.labelTa}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {locale === 'en' ? 'Back' : 'பின்செல்'}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-base font-semibold text-text-primary mb-1">
                {locale === 'en' ? 'Here is where to start' : 'இங்கே தொடங்கலாம்'}
              </h3>
              <p className="text-[13px] text-text-secondary mb-4">
                {locale === 'en'
                  ? 'These sections of Aram have what you are looking for.'
                  : 'அறத்தின் இந்த பகுதிகளில் நீங்கள் தேடுவது உள்ளது.'}
              </p>
              <div className="space-y-3">
                {recs.map(r => {
                  const Icon = r.icon;
                  return (
                    <Link
                      key={r.href}
                      href={r.href}
                      onClick={close}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-primary/5 transition-all p-4"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary leading-tight">
                          {locale === 'en' ? r.titleEn : r.titleTa}
                        </p>
                        <p className="text-[12px] text-text-secondary mt-1 leading-snug">
                          {locale === 'en' ? r.reasonEn : r.reasonTa}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {locale === 'en' ? 'Choose something different' : 'வேறு ஒன்றைத் தேர்வுசெய்க'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
