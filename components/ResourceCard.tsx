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
    <div className="rounded-xl bg-surface border border-border p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {item.trainerResource && <TrainTheTrainerBadge />}
      </div>
      <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{body}</p>

      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="inline-block rounded-full bg-secondary/15 text-secondary-dark px-2 py-0.5 text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.contact && (
        <div className="mt-3 pt-3 border-t border-border space-y-1.5">
          {item.contact.phone && (
            <a
              href={`tel:${item.contact.phone}`}
              className="flex items-center gap-2 text-xs text-info hover:underline"
              aria-label={`${locale === 'en' ? 'Call' : 'அழை'} ${item.contact.phone}`}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {item.contact.phone}
            </a>
          )}
          {item.contact.email && (
            <a
              href={`mailto:${item.contact.email}`}
              className="flex items-center gap-2 text-xs text-info hover:underline"
              aria-label={`${locale === 'en' ? 'Email' : 'மின்னஞ்சல்'} ${item.contact.email}`}
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {item.contact.email}
            </a>
          )}
          {item.contact.website && (
            <a
              href={item.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-info hover:underline"
              aria-label={`${locale === 'en' ? 'Visit website' : 'இணையதளத்தைப் பாருங்கள்'}`}
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              {item.contact.website}
            </a>
          )}
          {item.contact.address && (
            <div className="flex items-start gap-2 text-xs text-text-secondary">
              <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
              {item.contact.address}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
