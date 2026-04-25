'use client';

import Link from 'next/link';
import { useFavourites } from '@/lib/favourites-context';
import { useLocale } from '@/lib/locale-context';
import { allContentMap, pillarPaths, pillarLabelsEn, pillarLabelsTa } from '@/lib/all-content';
import ResourceCard from '@/components/ResourceCard';
import { Bookmark, ArrowLeft } from 'lucide-react';

export default function SavedPage() {
  const { locale } = useLocale();
  const { favourites } = useFavourites();

  // Group saved items by pillar
  const grouped = new Map<string, typeof allContentMap extends Map<string, infer V> ? V[] : never>();
  for (const id of favourites) {
    const entry = allContentMap.get(id);
    if (!entry) continue;
    const list = grouped.get(entry.pillar) ?? [];
    list.push(entry);
    grouped.set(entry.pillar, list);
  }

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-3"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Back to home' : 'முகப்புக்கு திரும்பு'}
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0">
            <Bookmark className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary leading-tight">
              {locale === 'en' ? 'Saved resources' : 'சேமித்த வளங்கள்'}
            </h1>
            <p className="text-[13px] text-text-secondary mt-0.5 leading-snug">
              {favourites.size === 0
                ? locale === 'en'
                  ? 'Tap the bookmark on any resource to save it'
                  : 'எந்த வளத்தையும் சேமிக்க புத்தக அடையாளத்தை தட்டுங்கள்'
                : locale === 'en'
                ? `${favourites.size} item${favourites.size === 1 ? '' : 's'} available offline`
                : `${favourites.size} உருப்படி${favourites.size === 1 ? '' : 'கள்'} ஆஃப்லைனில் கிடைக்கும்`}
            </p>
          </div>
        </div>
      </div>

      {favourites.size === 0 ? (
        <div className="rounded-2xl bg-surface border-2 border-dashed border-border p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-3">
            <Bookmark className="h-6 w-6 text-text-secondary" aria-hidden="true" />
          </div>
          <h2 className="text-base font-semibold text-text-primary mb-1.5">
            {locale === 'en' ? 'Nothing saved yet' : 'எதுவும் சேமிக்கப்படவில்லை'}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
            {locale === 'en'
              ? 'When you find a useful resource — a hospital, a guide, a story — tap the bookmark to save it. Your saved items work offline.'
              : 'ஒரு பயனுள்ள வளத்தைக் கண்டால் — ஒரு மருத்துவமனை, வழிகாட்டி, கதை — அதை சேமிக்க புத்தக அடையாளத்தை தட்டுங்கள். உங்கள் சேமித்த உருப்படிகள் ஆஃப்லைனில் வேலை செய்யும்.'}
          </p>
          <Link
            href="/"
            className="inline-block mt-4 rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {locale === 'en' ? 'Browse resources' : 'வளங்களை உலாவு'}
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([pillar, items]) => (
            <section key={pillar}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
                  {locale === 'en'
                    ? pillarLabelsEn[pillar as keyof typeof pillarLabelsEn]
                    : pillarLabelsTa[pillar as keyof typeof pillarLabelsTa]}
                </h2>
                <Link
                  href={pillarPaths[pillar as keyof typeof pillarPaths]}
                  className="text-xs text-primary hover:underline"
                >
                  {locale === 'en' ? 'View all →' : 'அனைத்தையும் பார்க்க →'}
                </Link>
              </div>
              <div className="space-y-3">
                {items.map(({ item }) => (
                  <ResourceCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
