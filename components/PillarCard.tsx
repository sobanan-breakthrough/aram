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
      className="flex flex-col items-start gap-2 rounded-xl bg-surface border border-border p-4 hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.98]"
      aria-label={locale === 'en' ? titleEn : titleTa}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-primary leading-snug">
          {locale === 'en' ? titleEn : titleTa}
        </h3>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
          {locale === 'en' ? descriptionEn : descriptionTa}
        </p>
      </div>
    </Link>
  );
}
