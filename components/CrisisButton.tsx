'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import { LifeBuoy, X, Phone, Heart } from 'lucide-react';

type Hotline = {
  number: string;
  nameEn: string;
  nameTa: string;
  descriptionEn: string;
  descriptionTa: string;
  category: 'mental' | 'medical' | 'safety';
};

const hotlines: Hotline[] = [
  {
    number: '+94 11 268 2535',
    nameEn: 'Sumithrayo (24/7 Emotional Crisis)',
    nameTa: 'சுமித்ரயோ (24/7 உணர்வுப்பூர்வ நெருக்கடி)',
    descriptionEn: 'Confidential support if you feel overwhelmed, hopeless, or are thinking about ending your life. Tamil, Sinhala, English.',
    descriptionTa: 'நீங்கள் அதிகப்படியான அழுத்தம், நம்பிக்கையின்மை அல்லது வாழ்க்கையை முடித்துக்கொள்ளும் எண்ணம் இருந்தால் ரகசிய ஆதரவு. தமிழ், சிங்களம், ஆங்கிலம்.',
    category: 'mental',
  },
  {
    number: '1990',
    nameEn: 'Suwa Seriya — Free Ambulance',
    nameTa: 'சுவ சேரிய — இலவச ஆம்புலன்ஸ்',
    descriptionEn: 'Medical emergency. Free, 24/7, available across Sri Lanka including the North and East.',
    descriptionTa: 'மருத்துவ அவசரநிலை. இலவசம், 24/7, வடக்கு கிழக்கு உட்பட இலங்கை முழுவதும்.',
    category: 'medical',
  },
  {
    number: '1938',
    nameEn: 'Women & Children Helpline',
    nameTa: 'பெண்கள் & குழந்தைகள் உதவி எண்',
    descriptionEn: 'For domestic violence, abuse, or exploitation. Confidential. National Child Protection Authority.',
    descriptionTa: 'வீட்டு வன்முறை, துஷ்பிரயோகம் அல்லது சுரண்டலுக்கு. ரகசியமானது. தேசிய குழந்தை பாதுகாப்பு ஆணையம்.',
    category: 'safety',
  },
  {
    number: '119',
    nameEn: 'Police Emergency',
    nameTa: 'காவல் அவசரநிலை',
    descriptionEn: 'For immediate danger or witnessing violence.',
    descriptionTa: 'உடனடி ஆபத்து அல்லது வன்முறையை சாட்சியாக கண்டால்.',
    category: 'safety',
  },
  {
    number: '110',
    nameEn: 'Fire & Rescue',
    nameTa: 'தீ & மீட்பு',
    descriptionEn: 'Fire emergencies, building collapses, water rescue.',
    descriptionTa: 'தீ அவசரநிலைகள், கட்டிட இடிபாடுகள், நீர் மீட்பு.',
    category: 'safety',
  },
  {
    number: '1926',
    nameEn: 'National Mental Health Helpline',
    nameTa: 'தேசிய மனநல உதவி எண்',
    descriptionEn: 'Government mental health helpline (8am–4pm, Mon–Fri). Tamil-speaking counsellors.',
    descriptionTa: 'அரசாங்க மனநல உதவி எண் (காலை 8 - மாலை 4, திங்கள் - வெள்ளி). தமிழ் ஆலோசகர்கள்.',
    category: 'mental',
  },
];

export default function CrisisButton() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open]);

  // Don't show on the assistant page (that page already has crisis info inline)
  if (pathname === '/assistant') return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={
          locale === 'en'
            ? 'Get help now — emergency contacts'
            : 'இப்போது உதவி பெற — அவசர தொடர்புகள்'
        }
        className="fixed z-40 bottom-[5.5rem] md:bottom-6 left-4 md:left-6 inline-flex items-center gap-2 rounded-full bg-white text-primary border-2 border-primary shadow-lg hover:bg-primary hover:text-white active:scale-95 transition-all no-print px-4 py-3"
      >
        <LifeBuoy className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold whitespace-nowrap">
          {locale === 'en' ? 'Get Help' : 'உதவி'}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm no-print"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="crisis-title"
        >
          <div
            className="bg-surface w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
                  <LifeBuoy className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="crisis-title" className="text-base font-bold text-text-primary leading-tight">
                    {locale === 'en' ? 'Get help now' : 'இப்போது உதவி பெற'}
                  </h2>
                  <p className="text-[11px] text-text-secondary leading-snug mt-0.5">
                    {locale === 'en' ? 'Free, 24/7 services in Sri Lanka' : 'இலங்கையில் இலவச, 24/7 சேவைகள்'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-background transition-colors"
                aria-label={locale === 'en' ? 'Close' : 'மூடு'}
              >
                <X className="h-5 w-5 text-text-secondary" aria-hidden="true" />
              </button>
            </div>

            {/* Reassurance message */}
            <div className="px-5 pt-4">
              <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/20 p-3">
                <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="text-[13px] text-text-primary leading-relaxed">
                  {locale === 'en'
                    ? "You don't have to handle this alone. Tap any number to call. All services are free and confidential."
                    : 'நீங்கள் இதை தனியாக சமாளிக்க வேண்டியதில்லை. அழைக்க எந்த எண்ணையும் தட்டுங்கள். எல்லா சேவைகளும் இலவசம், ரகசியமானவை.'}
                </p>
              </div>
            </div>

            {/* Hotline list */}
            <div className="px-5 py-4 space-y-3">
              {hotlines.map(h => (
                <a
                  key={h.number}
                  href={`tel:${h.number.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-primary/5 active:scale-[0.99] transition-all p-3.5"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white flex-shrink-0">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-text-primary leading-tight">
                        {locale === 'en' ? h.nameEn : h.nameTa}
                      </p>
                      <span className="text-base font-bold text-primary whitespace-nowrap">
                        {h.number}
                      </span>
                    </div>
                    <p className="text-[12px] text-text-secondary mt-1 leading-snug">
                      {locale === 'en' ? h.descriptionEn : h.descriptionTa}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-5 pb-5 pt-1">
              <p className="text-[11px] text-text-secondary text-center leading-relaxed">
                {locale === 'en'
                  ? 'These services are provided by the Government of Sri Lanka and registered NGOs. Aram is not affiliated with any of them.'
                  : 'இந்த சேவைகள் இலங்கை அரசு மற்றும் பதிவு செய்யப்பட்ட NGO-களால் வழங்கப்படுகின்றன. அறம் அவர்களுடன் இணைந்திருக்கவில்லை.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
