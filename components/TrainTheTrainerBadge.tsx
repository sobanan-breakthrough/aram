'use client';

import { useLocale } from '@/lib/locale-context';
import { GraduationCap } from 'lucide-react';

export default function TrainTheTrainerBadge() {
  const { locale } = useLocale();

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-info/10 text-info px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap flex-shrink-0">
      <GraduationCap className="h-3 w-3" aria-hidden="true" />
      {locale === 'en' ? 'Trainer' : 'பயிற்சி'}
    </span>
  );
}
