'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { trainerResources, pillarPaths, pillarLabelsEn, pillarLabelsTa, type Pillar } from '@/lib/all-content';
import ResourceCard from '@/components/ResourceCard';
import { GraduationCap, ArrowLeft, BookOpenCheck } from 'lucide-react';

const allPillarsKey = 'all';

export default function TrainerToolkitPage() {
  const { locale } = useLocale();
  const [filter, setFilter] = useState<Pillar | typeof allPillarsKey>(allPillarsKey);

  // All unique pillars present in trainer resources
  const presentPillars = Array.from(new Set(trainerResources.map(r => r.pillar))) as Pillar[];

  const filtered = filter === allPillarsKey
    ? trainerResources
    : trainerResources.filter(r => r.pillar === filter);

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
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-info/10 flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-info" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-text-primary leading-tight">
              {locale === 'en' ? 'Trainer Toolkit' : 'பயிற்சியாளர் கருவித்தொகுதி'}
            </h1>
            <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
              {locale === 'en'
                ? 'Resources for community health workers, peer supporters, teachers, and anyone helping others in their community.'
                : 'சமூக சுகாதார ஊழியர்கள், சக ஆதரவாளர்கள், ஆசிரியர்கள், மற்றும் தங்கள் சமூகத்தில் மற்றவர்களுக்கு உதவும் எவருக்கும் வளங்கள்.'}
            </p>
          </div>
        </div>
      </div>

      {/* How to use this toolkit */}
      <div className="rounded-xl bg-info/5 border border-info/20 p-4">
        <div className="flex items-start gap-2">
          <BookOpenCheck className="h-4 w-4 text-info mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-semibold text-text-primary mb-1">
              {locale === 'en' ? 'How to use this toolkit' : 'இந்த கருவித்தொகுதியை எப்படி பயன்படுத்துவது'}
            </h2>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              {locale === 'en'
                ? 'Each resource here is designed to be shared. Read it yourself first, then bring it into your community work — print it, share it on WhatsApp, run a session around it, or refer back to it during conversations. You are part of a wider network of people doing this work — you are not alone.'
                : 'இங்குள்ள ஒவ்வொரு வளமும் பகிரப்படுவதற்காக வடிவமைக்கப்பட்டுள்ளது. முதலில் நீங்களே படியுங்கள், பின்னர் உங்கள் சமூக வேலையில் கொண்டு வாருங்கள் — அச்சிடுங்கள், WhatsApp-இல் பகிருங்கள், அதைச் சுற்றி ஒரு அமர்வை நடத்துங்கள், அல்லது உரையாடல்களின் போது அதைக் குறிப்பிடுங்கள். இந்த வேலையை செய்யும் ஒரு பெரிய நெட்வொர்க்கின் பகுதி நீங்கள் — தனியாக இல்லை.'}
            </p>
          </div>
        </div>
      </div>

      {/* Pillar filter */}
      <div>
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
          {locale === 'en' ? 'Filter by area' : 'பகுதி வாரியாக வடிகட்டு'}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(allPillarsKey)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
              filter === allPillarsKey
                ? 'bg-primary text-white border-primary'
                : 'bg-surface text-text-secondary border-border hover:border-primary/30'
            }`}
            aria-pressed={filter === allPillarsKey}
          >
            {locale === 'en' ? `All (${trainerResources.length})` : `அனைத்தும் (${trainerResources.length})`}
          </button>
          {presentPillars.map(p => {
            const count = trainerResources.filter(r => r.pillar === p).length;
            return (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                  filter === p
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-text-secondary border-border hover:border-primary/30'
                }`}
                aria-pressed={filter === p}
              >
                {locale === 'en' ? pillarLabelsEn[p] : pillarLabelsTa[p]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-3">
        {filtered.map(({ item, pillar }) => (
          <div key={item.id}>
            <div className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mb-1.5 px-1">
              <Link href={pillarPaths[pillar]} className="hover:text-primary">
                {locale === 'en' ? pillarLabelsEn[pillar] : pillarLabelsTa[pillar]}
              </Link>
            </div>
            <ResourceCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
