'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/locale-context';
import {
  Home,
  Heart,
  Accessibility,
  Stethoscope,
  Smartphone,
  Users,
  GraduationCap,
  Globe,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, labelEn: 'Home', labelTa: 'முகப்பு' },
  { href: '/wellbeing', icon: Heart, labelEn: 'Wellbeing', labelTa: 'நல்வாழ்வு' },
  { href: '/send', icon: Accessibility, labelEn: 'SEND', labelTa: 'SEND' },
  { href: '/health', icon: Stethoscope, labelEn: 'Health', labelTa: 'சுகாதாரம்' },
  { href: '/technology', icon: Smartphone, labelEn: 'Technology', labelTa: 'தொழில்நுட்பம்' },
  { href: '/community', icon: Users, labelEn: 'Community', labelTa: 'சமூகம்' },
  { href: '/education', icon: GraduationCap, labelEn: 'Education', labelTa: 'கல்வி' },
  { href: '/diaspora', icon: Globe, labelEn: 'Diaspora', labelTa: 'புலம்பெயர்வு' },
  { href: '/assistant', icon: Sparkles, labelEn: 'Ask Aram', labelTa: 'அறம்' },
];

export default function TopTabNav() {
  const pathname = usePathname();
  const { locale } = useLocale();

  return (
    <nav
      className="hidden md:block sticky top-14 z-30 bg-surface/95 backdrop-blur-md border-b border-border no-print"
      aria-label={locale === 'en' ? 'Main navigation' : 'முதன்மை வழிசெலுத்தல்'}
    >
      <div className="max-w-5xl mx-auto flex items-center gap-0 px-4 overflow-x-auto scrollbar-hide">
        {navItems.map(item => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          const label = locale === 'en' ? item.labelEn : item.labelTa;
          const isAssistant = item.href === '/assistant';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 py-3 px-3 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                isActive
                  ? isAssistant
                    ? 'text-primary border-primary'
                    : 'text-primary border-primary'
                  : isAssistant
                  ? 'text-primary border-transparent hover:border-primary/40'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={isActive ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
