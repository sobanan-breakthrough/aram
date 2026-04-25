'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/locale-context';
import {
  Megaphone,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Send,
  Heart,
  ShieldCheck,
} from 'lucide-react';

const SUBMISSION_EMAIL = 'sobanan@aram.org.uk';

type Pillar = 'community' | 'wellbeing' | 'health' | 'education' | 'technology' | 'send' | 'diaspora' | 'other';

const pillarOptions: { value: Pillar; en: string; ta: string }[] = [
  { value: 'community', en: 'Starting a business / livelihood', ta: 'வணிகம் / வாழ்வாதாரம்' },
  { value: 'wellbeing', en: 'Healing / mental wellbeing', ta: 'குணமாகுதல் / மனநலம்' },
  { value: 'health', en: 'Health journey', ta: 'சுகாதார பயணம்' },
  { value: 'education', en: 'Education / learning', ta: 'கல்வி / கற்றல்' },
  { value: 'technology', en: 'Using technology', ta: 'தொழில்நுட்பத்தை பயன்படுத்துதல்' },
  { value: 'send', en: 'Disability / SEND', ta: 'குறைபாடு / SEND' },
  { value: 'diaspora', en: 'Returning / connecting', ta: 'திரும்புதல் / இணைதல்' },
  { value: 'other', en: 'Something else', ta: 'வேறு ஏதோ' },
];

export default function ShareYourStoryPage() {
  const { locale } = useLocale();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [pillar, setPillar] = useState<Pillar>('community');
  const [story, setStory] = useState('');
  const [contact, setContact] = useState('');
  const [permission, setPermission] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!story.trim() || !permission) return;

    const subject = encodeURIComponent(
      `Aram story submission — ${pillar} — ${name || 'Anonymous'}`
    );
    const body = encodeURIComponent(
      `Submission language: ${locale === 'en' ? 'English' : 'Tamil'}\n` +
      `Pillar: ${pillar}\n` +
      `Name: ${name || '(not provided — anonymous)'}\n` +
      `Location: ${location || '(not provided)'}\n` +
      `Contact (optional): ${contact || '(not provided)'}\n\n` +
      `--- STORY ---\n\n${story}\n\n` +
      `--- PERMISSIONS ---\n` +
      `The submitter has confirmed they wrote this themselves and grant permission for Aram to publish (with editing for length/clarity), use first name only, and decline to share contact details unless requested.\n`
    );

    window.location.href = `mailto:${SUBMISSION_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-5">
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-3"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Back to Community' : 'சமூகத்திற்கு திரும்பு'}
        </Link>
        <div className="rounded-2xl bg-success/10 border border-success/30 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/20 mb-3">
            <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-2">
            {locale === 'en' ? 'Thank you for sharing your story' : 'உங்கள் கதையை பகிர்ந்ததற்கு நன்றி'}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
            {locale === 'en'
              ? 'Your email app should have opened with your story ready to send. Once you press send, our team will read it carefully. If we publish it, we will get in touch first if you provided contact details.'
              : 'உங்கள் கதையுடன் உங்கள் மின்னஞ்சல் செயலி திறந்திருக்க வேண்டும். அனுப்பு பொத்தானை அழுத்தியதும், எங்கள் குழு அதை கவனமாக படிக்கும். வெளியிட்டால், நீங்கள் தொடர்பு விவரங்களை வழங்கியிருந்தால் முதலில் தொடர்பு கொள்வோம்.'}
          </p>
          <div className="flex gap-3 justify-center mt-5">
            <Link
              href="/community"
              className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {locale === 'en' ? 'Back to Community' : 'சமூகத்திற்கு திரும்பு'}
            </Link>
            <button
              onClick={() => { setSubmitted(false); setStory(''); }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              {locale === 'en' ? 'Share another story' : 'மற்றொரு கதை பகிர'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/community"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-3"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Back to Community' : 'சமூகத்திற்கு திரும்பு'}
        </Link>
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/20 flex-shrink-0">
            <Megaphone className="h-5 w-5 text-secondary-dark" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-text-primary leading-tight">
              {locale === 'en' ? 'Share your story' : 'உங்கள் கதையைப் பகிருங்கள்'}
            </h1>
            <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
              {locale === 'en'
                ? 'Your story can help someone else who is struggling with the same thing. We will read every submission. If we publish it, we will edit gently for clarity and respect your wishes about anonymity.'
                : 'உங்கள் கதை அதே விஷயத்துடன் போராடும் மற்றொரு நபருக்கு உதவலாம். ஒவ்வொரு சமர்ப்பணத்தையும் படிப்போம். வெளியிட்டால், தெளிவுக்காக மென்மையாக திருத்துவோம், அநாமதேயம் பற்றிய உங்கள் விருப்பங்களை மதிப்போம்.'}
            </p>
          </div>
        </div>
      </div>

      {/* Reassurance */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 space-y-2.5">
        <div className="flex items-start gap-2">
          <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-[13px] text-text-primary leading-relaxed">
            {locale === 'en'
              ? 'There is no right way to write this. Use your own words.'
              : 'இதை எழுத சரியான வழி இல்லை. உங்கள் சொந்த வார்த்தைகளில் எழுதுங்கள்.'}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-[13px] text-text-primary leading-relaxed">
            {locale === 'en'
              ? 'You can use only your first name, or stay fully anonymous.'
              : 'உங்கள் முதல் பெயரை மட்டும் பயன்படுத்தலாம், அல்லது முழுமையாக அநாமதேயமாக இருக்கலாம்.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pillar */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            {locale === 'en' ? 'What is your story about?' : 'உங்கள் கதை எதைப் பற்றியது?'}
          </label>
          <select
            value={pillar}
            onChange={e => setPillar(e.target.value as Pillar)}
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary/40"
          >
            {pillarOptions.map(o => (
              <option key={o.value} value={o.value}>
                {locale === 'en' ? o.en : o.ta}
              </option>
            ))}
          </select>
        </div>

        {/* Name (optional) */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
            {locale === 'en' ? 'First name (optional)' : 'முதல் பெயர் (விருப்பத்தேர்வு)'}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={60}
            placeholder={locale === 'en' ? 'e.g. Priyanka — leave blank for anonymous' : 'உதா: பிரியங்கா — அநாமதேயத்திற்கு காலியாக விடவும்'}
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40"
          />
        </div>

        {/* Location (optional) */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-1.5">
            {locale === 'en' ? 'Where are you? (optional)' : 'நீங்கள் எங்கே இருக்கிறீர்கள்? (விருப்பத்தேர்வு)'}
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            maxLength={80}
            placeholder={locale === 'en' ? 'e.g. Kilinochchi, or London' : 'உதா: கிளிநொச்சி, அல்லது லண்டன்'}
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40"
          />
        </div>

        {/* Story */}
        <div>
          <label htmlFor="story" className="block text-sm font-medium text-text-primary mb-1.5">
            {locale === 'en' ? 'Your story' : 'உங்கள் கதை'} <span className="text-primary">*</span>
          </label>
          <textarea
            id="story"
            required
            value={story}
            onChange={e => setStory(e.target.value)}
            rows={8}
            maxLength={4000}
            placeholder={
              locale === 'en'
                ? 'Tell us what happened. What did you struggle with? What helped? What would you tell someone going through the same thing?'
                : 'என்ன நடந்தது என்று எங்களுக்குச் சொல்லுங்கள். எதனுடன் போராடினீர்கள்? எது உதவியது? அதே நிலையில் இருக்கும் ஒருவரிடம் என்ன சொல்வீர்கள்?'
            }
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40 resize-y"
          />
          <p className="text-[11px] text-text-secondary mt-1">
            {story.length} / 4000 {locale === 'en' ? 'characters' : 'எழுத்துக்கள்'}
          </p>
        </div>

        {/* Contact (optional) */}
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-text-primary mb-1.5">
            {locale === 'en' ? 'How can we reach you? (optional)' : 'உங்களை எப்படி அடைய முடியும்? (விருப்பத்தேர்வு)'}
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={e => setContact(e.target.value)}
            maxLength={120}
            placeholder={locale === 'en' ? 'WhatsApp, email, or phone number' : 'WhatsApp, மின்னஞ்சல், அல்லது தொலைபேசி எண்'}
            className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40"
          />
          <p className="text-[11px] text-text-secondary mt-1">
            {locale === 'en'
              ? 'Only used if we want to ask follow-up questions. Never shared.'
              : 'பின்தொடர் கேள்விகள் கேட்க விரும்பினால் மட்டுமே பயன்படுத்தப்படும். ஒருபோதும் பகிரப்படாது.'}
          </p>
        </div>

        {/* Permission */}
        <div className="rounded-xl border border-border bg-surface p-3.5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={permission}
              onChange={e => setPermission(e.target.checked)}
              required
              className="mt-1 h-4 w-4 accent-primary"
            />
            <span className="text-[13px] text-text-primary leading-relaxed">
              {locale === 'en'
                ? 'I wrote this myself, and I give permission for Aram to read it. I understand that if Aram chooses to publish it, they will edit it gently for clarity and only use the name (or anonymity) I have chosen. I can ask for it to be removed at any time.'
                : 'இதை நானே எழுதினேன், அறம் அதைப் படிக்க அனுமதி தருகிறேன். அறம் வெளியிட தேர்வு செய்தால், தெளிவுக்காக மென்மையாக திருத்தி, நான் தேர்ந்தெடுத்த பெயரை (அல்லது அநாமதேயத்தை) மட்டுமே பயன்படுத்தும் என்பதை புரிந்துகொள்கிறேன். எந்த நேரத்திலும் அகற்றக் கேட்கலாம்.'}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!story.trim() || !permission}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white py-3 text-sm font-semibold hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Send your story' : 'உங்கள் கதையை அனுப்புங்கள்'}
        </button>

        <p className="text-[11px] text-text-secondary text-center leading-relaxed flex items-center justify-center gap-1.5">
          <Mail className="h-3 w-3" aria-hidden="true" />
          {locale === 'en'
            ? 'Submitting opens your email app to send the story to our team.'
            : 'சமர்ப்பிப்பது எங்கள் குழுவிற்கு கதையை அனுப்ப உங்கள் மின்னஞ்சல் செயலியை திறக்கும்.'}
        </p>
      </form>
    </div>
  );
}
