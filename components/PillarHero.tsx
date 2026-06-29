'use client';

import { useLocale } from '@/lib/locale-context';
import { PILLAR_THEMES, type PillarKey } from '@/lib/pillar-theme';

interface PillarHeroProps {
  pillar: PillarKey;
  titleEn: string;
  titleTa: string;
  subtitleEn: string;
  subtitleTa: string;
  // Optional eyebrow ("pillar 1 of 7", etc.)
  eyebrowEn?: string;
  eyebrowTa?: string;
}

// Hero block at the top of each pillar page. Gives the section identity
// instead of just stacking content right below the nav.
export default function PillarHero({
  pillar,
  titleEn,
  titleTa,
  subtitleEn,
  subtitleTa,
  eyebrowEn,
  eyebrowTa,
}: PillarHeroProps) {
  const { locale } = useLocale();
  const theme = PILLAR_THEMES[pillar];
  const Icon = theme.icon;

  const title = locale === 'en' ? titleEn : titleTa;
  const subtitle = locale === 'en' ? subtitleEn : subtitleTa;
  const eyebrow = locale === 'en' ? eyebrowEn : eyebrowTa;

  return (
    <section
      className={`relative rounded-2xl ${theme.bgTint} ${theme.borderColor} border p-5 sm:p-7 overflow-hidden`}
      aria-labelledby="pillar-hero-title"
    >
      {/* Decorative oversized icon, subtle, top-right */}
      <Icon
        className={`absolute -top-3 -right-3 h-28 w-28 sm:h-36 sm:w-36 ${theme.iconColor} opacity-[0.08]`}
        aria-hidden="true"
        strokeWidth={1.5}
      />

      <div className="relative">
        {/* Icon + eyebrow row */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${theme.iconBg}`}>
            <Icon className={`h-5 w-5 ${theme.iconColor}`} aria-hidden="true" strokeWidth={2.25} />
          </div>
          {eyebrow && (
            <span className={`text-[11px] font-semibold uppercase tracking-wider ${theme.textAccent}`}>
              {eyebrow}
            </span>
          )}
        </div>

        <h1
          id="pillar-hero-title"
          className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight tracking-tight"
        >
          {title}
        </h1>
        <p className="text-[15px] sm:text-base text-text-secondary mt-2 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
