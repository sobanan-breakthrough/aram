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
} from 'lucide-react';
import TrainTheTrainerBadge from './TrainTheTrainerBadge';
import type { ContentItem } from '@/lib/types';

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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setShareSupported(typeof navigator !== 'undefined' && 'share' in navigator);
    setSpeechSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      // Stop any in-flight speech when card unmounts
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const title = locale === 'en' ? item.titleEn : item.titleTa;
  const body = locale === 'en' ? item.bodyEn : item.bodyTa;
  const saved = isFavourite(item.id);

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

  const handleSpeak = () => {
    if (!speechSupported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(`${title}. ${body}`);
    utter.lang = locale === 'ta' ? 'ta-LK' : 'en-US';
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utteranceRef.current = utter;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

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
