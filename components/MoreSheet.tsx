'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import {
  X,
  Heart,
  Accessibility,
  Stethoscope,
  Smartphone,
  Users,
  GraduationCap,
  Globe,
  GraduationCap as TrainerIcon,
  Megaphone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Item = {
  href: string;
  icon: LucideIcon;
  labelEn: string;
  labelTa: string;
  descEn: string;
  descTa: string;
};

const sections: { headingEn: string; headingTa: string; items: Item[] }[] = [
  {
    headingEn: 'Explore resources',
    headingTa: 'வளங்களை ஆராயுங்கள்',
    items: [
      { href: '/wellbeing', icon: Heart, labelEn: 'Wellbeing', labelTa: 'நல்வாழ்வு',
        descEn: 'Mental, emotional, spiritual', descTa: 'மன, உணர்வு, ஆன்மீக' },
      { href: '/send', icon: Accessibility, labelEn: 'SEND', labelTa: 'SEND',
        descEn: 'Special Educational Needs', descTa: 'சிறப்பு கல்வித் தேவைகள்' },
      { href: '/health', icon: Stethoscope, labelEn: 'Healthcare', labelTa: 'சுகாதாரம்',
        descEn: 'Health topics and services', descTa: 'சுகாதார தலைப்புகள்' },
      { href: '/technology', icon: Smartphone, labelEn: 'Technology', labelTa: 'தொழில்நுட்பம்',
        descEn: 'Digital skills, AI, earning', descTa: 'டிஜிட்டல் திறன்கள்' },
      { href: '/community', icon: Users, labelEn: 'Community', labelTa: 'சமூகம்',
        descEn: 'Enterprise, livelihoods', descTa: 'நிறுவனம், வாழ்வாதாரம்' },
      { href: '/education', icon: GraduationCap, labelEn: 'Education', labelTa: 'கல்வி',
        descEn: 'Learning for all ages', descTa: 'அனைத்து வயதினருக்கு' },
      { href: '/diaspora', icon: Globe, labelEn: 'Diaspora', labelTa: 'புலம்பெயர்வு',
        descEn: 'Connect with Sri Lanka', descTa: 'இலங்கையுடன் இணை' },
    ],
  },
  {
    headingEn: 'More',
    headingTa: 'மேலும்',
    items: [
      { href: '/trainer-toolkit', icon: TrainerIcon, labelEn: 'Trainer Toolkit', labelTa: 'பயிற்சியாளர் கருவித்தொகுதி',
        descEn: 'For community workers', descTa: 'சமூக ஊழியர்களுக்கு' },
      { href: '/share-your-story', icon: Megaphone, labelEn: 'Share your story', labelTa: 'உங்கள் கதையைப் பகிருங்கள்',
        descEn: 'Submit your experience', descTa: 'உங்கள் அனுபவத்தை சமர்ப்பியுங்கள்' },
    ],
  },
];

interface MoreSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function MoreSheet({ open, onClose }: MoreSheetProps) {
  const { locale } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', esc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm no-print md:hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="more-sheet-title"
    >
      <div
        className="bg-surface w-full max-h-[85vh] overflow-y-auto rounded-t-2xl shadow-2xl safe-bottom"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" aria-hidden="true" />
        </div>

        <div className="sticky top-0 bg-surface px-5 pt-1 pb-3 flex items-center justify-between border-b border-border">
          <h2 id="more-sheet-title" className="text-base font-bold text-text-primary">
            {locale === 'en' ? 'All sections' : 'அனைத்து பகுதிகளும்'}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-background transition-colors"
            aria-label={locale === 'en' ? 'Close' : 'மூடு'}
          >
            <X className="h-5 w-5 text-text-secondary" aria-hidden="true" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-5">
          {sections.map(section => (
            <div key={section.headingEn}>
              <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2 px-1">
                {locale === 'en' ? section.headingEn : section.headingTa}
              </h3>
              <div className="grid grid-cols-1 gap-1.5">
                {section.items.map(item => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-background text-text-primary'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                          isActive ? 'bg-primary text-white' : 'bg-background text-text-secondary'
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight">
                          {locale === 'en' ? item.labelEn : item.labelTa}
                        </p>
                        <p className={`text-[12px] mt-0.5 leading-snug ${isActive ? 'text-primary/80' : 'text-text-secondary'}`}>
                          {locale === 'en' ? item.descEn : item.descTa}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
