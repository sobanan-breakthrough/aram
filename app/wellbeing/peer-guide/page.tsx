'use client';

import { useLocale } from '@/lib/locale-context';
import PrintableGuide from '@/components/PrintableGuide';
import TrainTheTrainerBadge from '@/components/TrainTheTrainerBadge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    titleEn: 'Listen actively',
    titleTa: 'கவனமாகக் கேளுங்கள்',
    bodyEn: 'Give the person your full attention. Put away your phone. Make eye contact. Nod to show you are listening. Do not interrupt.',
    bodyTa: 'நபருக்கு உங்கள் முழு கவனத்தையும் கொடுங்கள். உங்கள் தொலைபேசியை வையுங்கள். கண் தொடர்பு கொள்ளுங்கள். கேட்கிறீர்கள் என்பதைக் காட்ட தலையாட்டுங்கள். குறுக்கிடாதீர்கள்.',
  },
  {
    titleEn: 'What to say',
    titleTa: 'என்ன சொல்ல வேண்டும்',
    bodyEn: '"I hear you." "That sounds really difficult." "You are not alone." "Thank you for trusting me." Simple words of acknowledgement go a long way.',
    bodyTa: '"நான் கேட்கிறேன்." "அது மிகவும் கடினமாக இருக்கிறது." "நீங்கள் தனியாக இல்லை." "என்னை நம்பியதற்கு நன்றி." எளிமையான ஒப்புக்கொள்ளும் வார்த்தைகள் பெரிய மாற்றத்தை ஏற்படுத்தும்.',
  },
  {
    titleEn: 'What NOT to say',
    titleTa: 'என்ன சொல்ல வேண்டாம்',
    bodyEn: 'Avoid: "Just be positive." "Others have it worse." "You should be over it by now." "Everything happens for a reason." These phrases dismiss pain and can cause harm.',
    bodyTa: 'தவிர்க்கவும்: "நேர்மறையாக இருங்கள்." "மற்றவர்களுக்கு இன்னும் மோசமாக உள்ளது." "இது போதும், மறந்துவிடுங்கள்." இந்த வாக்கியங்கள் வலியை நிராகரிக்கின்றன.',
  },
  {
    titleEn: 'When to escalate',
    titleTa: 'எப்போது அதிகாரப்பூர்வ உதவி தேவை',
    bodyEn: 'If someone talks about harming themselves or others, or if they seem unable to care for themselves, help them connect with a health professional or call a crisis line. You do not need to handle this alone.',
    bodyTa: 'யாரேனும் தங்களையோ பிறரையோ காயப்படுத்திக்கொள்வதைப் பற்றி பேசினால், அல்லது தங்களைப் பராமரிக்க இயலாத நிலையில் இருந்தால், ஒரு சுகாதார நிபுணர் அல்லது நெருக்கடி எண்ணுடன் இணைக்க உதவுங்கள்.',
  },
  {
    titleEn: 'Taking care of yourself',
    titleTa: 'உங்களைப் பராமரித்துக் கொள்ளுங்கள்',
    bodyEn: 'Supporting others is emotionally demanding. Talk to someone you trust about your own feelings. Take breaks. You cannot pour from an empty cup.',
    bodyTa: 'பிறரை ஆதரிப்பது உணர்வுரீதியாக கடினமானது. உங்கள் உணர்வுகளைப் பற்றி நம்பகமான ஒருவரிடம் பேசுங்கள். இடைவெளி எடுங்கள். வெற்றுக் குவளையிலிருந்து ஊற்ற முடியாது.',
  },
];

export default function PeerGuidePage() {
  const { locale } = useLocale();

  return (
    <div className="space-y-6">
      <div className="no-print">
        <Link
          href="/wellbeing"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4"
          aria-label={locale === 'en' ? 'Back to Wellbeing' : 'நல்வாழ்வுக்கு திரும்பு'}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Back to Wellbeing' : 'நல்வாழ்வுக்கு திரும்பு'}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-text-primary">
          {locale === 'en' ? 'Peer Support Guide' : 'சக ஆதரவு வழிகாட்டி'}
        </h1>
        <TrainTheTrainerBadge />
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">
        {locale === 'en'
          ? 'When you support someone in your community, you are doing important work. This guide will help you listen well and know when to refer someone to professional help.'
          : 'உங்கள் சமூகத்தில் ஒருவரை ஆதரிக்கும்போது, நீங்கள் முக்கியமான வேலையைச் செய்கிறீர்கள். இந்த வழிகாட்டி நன்றாகக் கேட்கவும், தொழில்முறை உதவிக்கு எப்போது ஒருவரை அனுப்ப வேண்டும் என்பதையும் அறிய உதவும்.'}
      </p>

      <PrintableGuide>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="rounded-xl bg-surface border border-border p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-2">
                  {idx + 1}
                </span>
                {locale === 'en' ? step.titleEn : step.titleTa}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed ml-8">
                {locale === 'en' ? step.bodyEn : step.bodyTa}
              </p>
            </div>
          ))}
        </div>
      </PrintableGuide>
    </div>
  );
}
