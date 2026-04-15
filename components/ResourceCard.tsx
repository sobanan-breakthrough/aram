'use client';

import { useLocale } from '@/lib/locale-context';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import TrainTheTrainerBadge from './TrainTheTrainerBadge';
import type { ContentItem } from '@/lib/types';

interface ResourceCardProps {
  item: ContentItem;
}

export default function ResourceCard({ item }: ResourceCardProps) {
  const { locale } = useLocale();

  const title = locale === 'en' ? item.titleEn : item.titleTa;
  const body = locale === 'en' ? item.bodyEn : item.bodyTa;

  return (
    <article className="rounded-xl bg-surface border border-border p-4 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-text-primary leading-snug flex-1">
          {title}
        </h3>
        {item.trainerResource && <TrainTheTrainerBadge />}
      </div>
      <p className="text-sm text-text-secondary mt-2 leading-relaxed">{body}</p>

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-secondary/10 text-secondary-dark px-2 py-0.5 text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.contact && (
        <dl className="mt-4 pt-3 border-t border-border space-y-2">
          {item.contact.phone && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">{locale === 'en' ? 'Phone' : 'தொலைபேசி'}</dt>
              <dd>
                <a
                  href={`tel:${item.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm text-info hover:underline min-h-[32px]"
                  aria-label={`${locale === 'en' ? 'Call' : 'அழை'} ${item.contact.phone}`}
                >
                  <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {item.contact.phone}
                </a>
              </dd>
            </div>
          )}
          {item.contact.email && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">{locale === 'en' ? 'Email' : 'மின்னஞ்சல்'}</dt>
              <dd>
                <a
                  href={`mailto:${item.contact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-info hover:underline break-all min-h-[32px]"
                  aria-label={`${locale === 'en' ? 'Email' : 'மின்னஞ்சல்'} ${item.contact.email}`}
                >
                  <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {item.contact.email}
                </a>
              </dd>
            </div>
          )}
          {item.contact.website && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">{locale === 'en' ? 'Website' : 'இணையதளம்'}</dt>
              <dd>
                <a
                  href={item.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-info hover:underline break-all min-h-[32px]"
                  aria-label={`${locale === 'en' ? 'Visit website' : 'இணையதளத்தைப் பாருங்கள்'}`}
                >
                  <Globe className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate max-w-[240px]">{item.contact.website}</span>
                </a>
              </dd>
            </div>
          )}
          {item.contact.address && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">{locale === 'en' ? 'Address' : 'முகவரி'}</dt>
              <dd className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                {item.contact.address}
              </dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}
