import type { ContentItem } from './types';
import { wellbeingContent } from '@/content/wellbeing';
import { sendContent } from '@/content/send';
import { healthContent } from '@/content/health';
import { technologyContent } from '@/content/technology';
import { communityContent } from '@/content/community';
import { educationContent } from '@/content/education';
import { diasporaContent } from '@/content/diaspora';
import { sharedContent } from '@/content/shared';

export type Pillar =
  | 'wellbeing'
  | 'send'
  | 'health'
  | 'technology'
  | 'community'
  | 'education'
  | 'diaspora'
  | 'shared';

export const pillarPaths: Record<Pillar, string> = {
  wellbeing: '/wellbeing',
  send: '/send',
  health: '/health',
  technology: '/technology',
  community: '/community',
  education: '/education',
  diaspora: '/diaspora',
  shared: '/',
};

export const pillarLabelsEn: Record<Pillar, string> = {
  wellbeing: 'Wellbeing',
  send: 'SEND',
  health: 'Healthcare',
  technology: 'Technology',
  community: 'Community',
  education: 'Education',
  diaspora: 'Diaspora',
  shared: 'Shared',
};

export const pillarLabelsTa: Record<Pillar, string> = {
  wellbeing: 'நல்வாழ்வு',
  send: 'SEND',
  health: 'சுகாதாரம்',
  technology: 'தொழில்நுட்பம்',
  community: 'சமூகம்',
  education: 'கல்வி',
  diaspora: 'புலம்பெயர்வு',
  shared: 'பகிரப்பட்டது',
};

export const allContentByPillar: { pillar: Pillar; items: ContentItem[] }[] = [
  { pillar: 'wellbeing', items: wellbeingContent },
  { pillar: 'send', items: sendContent },
  { pillar: 'health', items: healthContent },
  { pillar: 'technology', items: technologyContent },
  { pillar: 'community', items: communityContent },
  { pillar: 'education', items: educationContent },
  { pillar: 'diaspora', items: diasporaContent },
  { pillar: 'shared', items: sharedContent },
];

// Flat lookup of every content item by id, with pillar metadata attached
export const allContentMap: Map<string, { item: ContentItem; pillar: Pillar }> = (() => {
  const map = new Map<string, { item: ContentItem; pillar: Pillar }>();
  for (const group of allContentByPillar) {
    for (const item of group.items) {
      map.set(item.id, { item, pillar: group.pillar });
    }
  }
  return map;
})();

export function getItemById(id: string): { item: ContentItem; pillar: Pillar } | undefined {
  return allContentMap.get(id);
}

// All trainer-flagged resources, with pillar tags
export const trainerResources: { item: ContentItem; pillar: Pillar }[] = (() => {
  const out: { item: ContentItem; pillar: Pillar }[] = [];
  for (const group of allContentByPillar) {
    for (const item of group.items) {
      if (item.trainerResource) {
        out.push({ item, pillar: group.pillar });
      }
    }
  }
  return out;
})();
