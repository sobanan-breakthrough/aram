import type { ContentItem } from './types';
import { wellbeingContent } from '@/content/wellbeing';
import { sendContent } from '@/content/send';
import { healthContent } from '@/content/health';
import { technologyContent } from '@/content/technology';
import { communityContent } from '@/content/community';
import { educationContent } from '@/content/education';
import { diasporaContent } from '@/content/diaspora';
import { sharedContent } from '@/content/shared';

const allContent: { pillar: string; items: ContentItem[] }[] = [
  { pillar: 'wellbeing', items: wellbeingContent },
  { pillar: 'send', items: sendContent },
  { pillar: 'health', items: healthContent },
  { pillar: 'technology', items: technologyContent },
  { pillar: 'community', items: communityContent },
  { pillar: 'education', items: educationContent },
  { pillar: 'diaspora', items: diasporaContent },
  { pillar: 'shared', items: sharedContent },
];

export function searchAllContent(query: string): { pillar: string; items: ContentItem[] }[] {
  const lower = query.toLowerCase();
  const results: { pillar: string; items: ContentItem[] }[] = [];

  for (const group of allContent) {
    const matches = group.items.filter(
      item =>
        item.titleEn.toLowerCase().includes(lower) ||
        item.titleTa.toLowerCase().includes(lower) ||
        item.bodyEn.toLowerCase().includes(lower) ||
        item.bodyTa.toLowerCase().includes(lower) ||
        item.tags.some(t => t.toLowerCase().includes(lower))
    );
    if (matches.length > 0) {
      results.push({ pillar: group.pillar, items: matches });
    }
  }

  return results;
}

export function getRandomResource(): ContentItem & { pillar: string } {
  const flat = allContent.flatMap(g => g.items.map(item => ({ ...item, pillar: g.pillar })));
  const dayIndex = new Date().getDate() % flat.length;
  return flat[dayIndex];
}
