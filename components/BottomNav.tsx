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
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, labelEn: 'Home', labelTa: 'முகப்பு' },
  { href: '/wellbeing', icon: Heart, labelEn: 'Wellbeing', labelTa: 'நல்வாழ்வு' },
  { href: '/send', icon: Accessibility, labelEn: 'SEND', labelTa: 'SEND' },
  { href: '/health', icon: Stethoscope, labelEn: 'Health', labelTa: 'சுகாதாரம்' },
  { href: '/technology', icon: Smartphone, labelEn: 'Tech', labelTa: 'தொழில்நுட்பம்' },
  { href: '/community', icon: Users, labelEn: 'Community', labelTa: 'சமூகம்' },
  { href: '/education', icon: GraduationCap, labelEn: 'Education', labelTa: 'கல்வி' },
  { href: '/diaspora', icon: Globe, labelEn: 'Diaspora', labelTa: 'புலம்பெயர்வு' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { locale } = useLocale();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border no-print safe-area-bottom"
      aria-label={locale === 'en' ? 'Main navigation' : 'முதன்மை வழிசெலுத்தல்'}
    >
      <div className="grid grid-cols-4 gap-0">
        {navItems.map(item => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          const label = locale === 'en' ? item.labelEn : item.labelTa;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] mt-0.5 leading-tight text-center truncate w-full">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
