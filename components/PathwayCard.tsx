'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { ChevronDown, Clock, BarChart3, AlertTriangle, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PathwayCardProps {
  icon: LucideIcon;
  titleEn: string;
  titleTa: string;
  timeToIncomeEn: string;
  timeToIncomeTa: string;
  skillLevelEn: string;
  skillLevelTa: string;
  descriptionEn: string;
  descriptionTa: string;
  stepsEn: string[];
  stepsTa: string[];
  risksEn: string[];
  risksTa: string[];
  resourcesEn: string[];
  resourcesTa: string[];
  resourceLinks?: string[];
}

export default function PathwayCard({
  icon: Icon,
  titleEn,
  titleTa,
  timeToIncomeEn,
  timeToIncomeTa,
  skillLevelEn,
  skillLevelTa,
  descriptionEn,
  descriptionTa,
  stepsEn,
  stepsTa,
  risksEn,
  risksTa,
  resourcesEn,
  resourcesTa,
  resourceLinks,
}: PathwayCardProps) {
  const { locale } = useLocale();
  const [expanded, setExpanded] = useState(false);

  const title = locale === 'en' ? titleEn : titleTa;
  const description = locale === 'en' ? descriptionEn : descriptionTa;
  const timeToIncome = locale === 'en' ? timeToIncomeEn : timeToIncomeTa;
  const skillLevel = locale === 'en' ? skillLevelEn : skillLevelTa;
  const steps = locale === 'en' ? stepsEn : stepsTa;
  const risks = locale === 'en' ? risksEn : risksTa;
  const resources = locale === 'en' ? resourcesEn : resourcesTa;

  return (
    <div className="rounded-xl bg-surface border border-border overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-start gap-3 w-full p-4 text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[10px] text-text-secondary">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {timeToIncome}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-text-secondary">
              <BarChart3 className="h-3 w-3" aria-hidden="true" />
              {skillLevel}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-text-secondary mt-1 flex-shrink-0 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-3">
          {/* Steps */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {locale === 'en' ? 'How to start' : 'எப்படி தொடங்குவது'}
            </h4>
            <ol className="space-y-1.5">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-2 text-xs text-text-secondary">
                  <span className="text-primary font-semibold flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Risks */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              {locale === 'en' ? 'Risks to know' : 'தெரிந்துகொள்ள வேண்டிய அபாயங்கள்'}
            </h4>
            <ul className="space-y-1">
              {risks.map((risk, i) => (
                <li key={i} className="text-xs text-text-secondary flex gap-1.5">
                  <span className="text-secondary-dark" aria-hidden="true">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary mb-2">
              {locale === 'en' ? 'Resources' : 'வளங்கள்'}
            </h4>
            <ul className="space-y-1">
              {resources.map((res, i) => {
                const link = resourceLinks?.[i];
                return (
                  <li key={i} className="text-xs text-info">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {res}
                      </a>
                    ) : (
                      res
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
