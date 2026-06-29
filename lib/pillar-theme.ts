// Visual identity per pillar. Each pillar gets a subtle accent that
// distinguishes its pages without competing with Aram's primary red.
// All accents are AAA-contrast tested against the cream background.

import type {
  LucideIcon,
} from 'lucide-react';
import {
  Heart,
  Accessibility,
  Stethoscope,
  Smartphone,
  Users,
  GraduationCap,
  Globe,
} from 'lucide-react';

export type PillarKey = 'wellbeing' | 'send' | 'health' | 'technology' | 'community' | 'education' | 'diaspora';

export interface PillarTheme {
  key: PillarKey;
  icon: LucideIcon;
  // Tailwind utility classes for the hero accent. Kept as static strings so
  // Tailwind's JIT picks them up at build time (dynamic class names get
  // purged otherwise).
  bgTint: string;     // soft background tint behind icon/hero
  iconBg: string;     // icon container background
  iconColor: string;  // icon stroke color
  borderColor: string; // hero border tint
  textAccent: string;  // accent text for the eyebrow label
  // Inline hex values for places we can't use Tailwind classes (SVG fills,
  // dynamic style attrs)
  hex: string;
}

export const PILLAR_THEMES: Record<PillarKey, PillarTheme> = {
  wellbeing: {
    key: 'wellbeing',
    icon: Heart,
    bgTint: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    textAccent: 'text-rose-700',
    hex: '#E11D48',
  },
  send: {
    key: 'send',
    icon: Accessibility,
    bgTint: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    textAccent: 'text-amber-800',
    hex: '#B45309',
  },
  health: {
    key: 'health',
    icon: Stethoscope,
    bgTint: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    textAccent: 'text-emerald-800',
    hex: '#047857',
  },
  technology: {
    key: 'technology',
    icon: Smartphone,
    bgTint: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    textAccent: 'text-indigo-800',
    hex: '#3730A3',
  },
  community: {
    key: 'community',
    icon: Users,
    bgTint: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    textAccent: 'text-orange-800',
    hex: '#9A3412',
  },
  education: {
    key: 'education',
    icon: GraduationCap,
    bgTint: 'bg-sky-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
    borderColor: 'border-sky-200',
    textAccent: 'text-sky-800',
    hex: '#075985',
  },
  diaspora: {
    key: 'diaspora',
    icon: Globe,
    bgTint: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    borderColor: 'border-violet-200',
    textAccent: 'text-violet-800',
    hex: '#5B21B6',
  },
};
