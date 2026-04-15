'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import type { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  icon: LucideIcon;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  href: string;
}

export default function PillarCard({
  icon: Icon,
  titleEn,
  titleTa,
  descriptionEn,
  descriptionTa,
  href,
}: PillarCardProps) {
  const { locale } = useLocale();

  return (
    <Link
      href={href}
      className="group flex flex-col gap-2.5 rounded-xl bg-surface border border-border p-3.5 hover:border-primary/40 hover:shadow-sm active:scale-[0.98] transition-all min-h-[120px]"
      aria-label={locale === 'en' ? titleEn : titleTa}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
        <Icon className="h-[18px] w-[18px] text-primary" aria-hidden="true" strokeWidth={2.25} />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-text-primary leading-tight">
          {locale === 'en' ? titleEn : titleTa}
        </h3>
        <p className="text-[13px] text-text-secondary mt-1 leading-snug">
          {locale === 'en' ? descriptionEn : descriptionTa}
        </p>
      </div>
    </Link>
  );
}
