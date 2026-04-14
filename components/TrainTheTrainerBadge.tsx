'use client';

import { useLocale } from '@/lib/locale-context';
import { GraduationCap } from 'lucide-react';

export default function TrainTheTrainerBadge() {
  const { locale } = useLocale();

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-info/10 text-info px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap">
      <GraduationCap className="h-3 w-3" aria-hidden="true" />
      {locale === 'en' ? 'Trainer Resource' : 'பயிற்சியாளர் வளம்'}
    </span>
  );
}
