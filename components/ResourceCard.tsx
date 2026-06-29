'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from '@/lib/locale-context';
import { useFavourites } from '@/lib/favourites-context';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Share2,
  Volume2,
  Square,
  Clock,
  BookOpen,
  Building2,
  Quote,
  Lightbulb,
  Route,
} from 'lucide-react';
import TrainTheTrainerBadge from './TrainTheTrainerBadge';
import Markdown, { readingTimeMinutes } from './Markdown';
import type { ContentItem } from '@/lib/types';
import { speak, isSpeechSupported, type ActiveSpeech } from '@/lib/speech';

// Type label config — small icon + label shown on each card so users can
// scan and find what kind of content it is at a glance.
const TYPE_LABELS: Record<
  ContentItem['type'],
  { icon: typeof BookOpen; en: string; ta: string }
> = {
  resource: { icon: Building2, en: 'Service', ta: 'சேவை' },
  guide: { icon: BookOpen, en: 'Guide', ta: 'வழிகாட்டி' },
  story: { icon: Quote, en: 'Story', ta: 'கதை' },
  explainer: { icon: Lightbulb, en: 'Explainer', ta: 'விளக்கம்' },
  pathway: { icon: Route, en: 'Pathway', ta: 'பாதை' },
};

interface ResourceCardProps {
  item: ContentItem;
}

export default function ResourceCard({ item }: ResourceCardProps) {
  const { locale } = useLocale();
  const { isFavourite, toggleFavourite } = useFavourites();
  const [shareSupported, setShareSupported] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [shareJustCopied, setShareJustCopied] = useState(false);
  const activeSpeechRef = useRef<ActiveSpeech | null>(null);

  useEffect(() => {
    setShareSupported(typeof navigator !== 'undefined' && 'share' in navigator);
    setSpeechSupported(isSpeechSupported());
    return () => {
      activeSpeechRef.current?.stop();
    };
  }, []);

  const title = locale === 'en' ? item.titleEn : item.titleTa;
  const body = locale === 'en' ? item.bodyEn : item.bodyTa;
  const saved = isFavourite(item.id);
  const readingMinutes = readingTimeMinutes(body);

  const handleShare = async () => {
    const shareText = `${title}\n\n${body}\n\n— Aram | அறம் (https://aram-vert.vercel.app)`;
    const shareData = {
      title,
      text: shareText,
    };

    try {
      if (shareSupported) {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      // User cancelled or share failed — fall through to clipboard
      if (err instanceof Error && err.name === 'AbortError') return;
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setShareJustCopied(true);
      setTimeout(() => setShareJustCopied(false), 2000);
    } catch {
      // Last resort: WhatsApp link
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const handleSpeak = async () => {
    if (!speechSupported) return;
    if (speaking) {
      activeSpeechRef.current?.stop();
      activeSpeechRef.current = null;
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    const active = await speak({
      text: `${title}. ${body}`,
      locale,
      onStart: () => setSpeaking(true),
      onEnd: () => {
        setSpeaking(false);
        activeSpeechRef.current = null;
      },
      onError: () => {
        setSpeaking(false);
        activeSpeechRef.current = null;
      },
    });
    activeSpeechRef.current = active;
  };

  return (
    <article className="rounded-xl bg-surface border border-border p-4 sm:p-5 hover:border-primary/20 transition-colors">
      {/* Eyebrow row: content type + reading time */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {(() => {
            const meta = TYPE_LABELS[item.type];
            const Icon = meta.icon;
            return (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                <Icon className="h-3 w-3" aria-hidden="true" />
                {locale === 'en' ? meta.en : meta.ta}
              </span>
            );
          })()}
          {readingMinutes >= 2 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-text-secondary">
              <span className="text-border" aria-hidden="true">·</span>
              <Clock className="h-3 w-3" aria-hidden="true" />
              {readingMinutes} {locale === 'en' ? 'min read' : 'நிமிட வாசிப்பு'}
            </span>
          )}
        </div>
        {item.trainerResource && <TrainTheTrainerBadge />}
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-text-primary leading-snug">
        {title}
      </h3>

      {/* Body — now markdown-aware. Bigger text and tighter measure for
          comfortable reading on long content. */}
      <div className="mt-2 text-[15px] text-text-secondary max-w-prose">
        <Markdown text={body} />
      </div>

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

      {/* Action buttons: bookmark, share, listen */}
      <div className="mt-3 pt-3 border-t border-border flex items-center gap-1 -ml-1.5">
        <button
          onClick={() => toggleFavourite(item.id)}
          className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors"
          aria-label={
            saved
              ? locale === 'en' ? 'Remove from saved' : 'சேமிப்பிலிருந்து அகற்று'
              : locale === 'en' ? 'Save for later' : 'பின்னர் பார்க்க சேமி'
          }
          aria-pressed={saved}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden="true" fill="currentColor" />
          ) : (
            <Bookmark className="h-4 w-4" aria-hidden="true" />
          )}
          <span className={saved ? 'text-primary' : ''}>
            {saved ? (locale === 'en' ? 'Saved' : 'சேமித்தது') : (locale === 'en' ? 'Save' : 'சேமி')}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors"
          aria-label={locale === 'en' ? 'Share this resource' : 'இந்த வளத்தைப் பகிர்'}
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span>
            {shareJustCopied
              ? locale === 'en' ? 'Copied!' : 'நகலெடுக்கப்பட்டது!'
              : locale === 'en' ? 'Share' : 'பகிர்'}
          </span>
        </button>

        {speechSupported && (
          <button
            onClick={handleSpeak}
            className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-primary hover:bg-background transition-colors"
            aria-label={
              speaking
                ? locale === 'en' ? 'Stop reading' : 'வாசிப்பதை நிறுத்து'
                : locale === 'en' ? 'Read aloud' : 'சத்தமாக வாசி'
            }
            aria-pressed={speaking}
          >
            {speaking ? (
              <Square className="h-4 w-4 text-primary" aria-hidden="true" fill="currentColor" />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
            <span className={speaking ? 'text-primary' : ''}>
              {speaking
                ? locale === 'en' ? 'Stop' : 'நிறுத்து'
                : locale === 'en' ? 'Listen' : 'கேட்க'}
            </span>
          </button>
        )}
      </div>
    </article>
  );
}
