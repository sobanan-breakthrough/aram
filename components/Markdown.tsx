// Lightweight markdown-lite renderer for content body text.
//
// Rules applied (in order):
//   1. Double-newline → paragraph break.
//   2. Lines starting with "- " or "• " → bulleted list (consecutive lines
//      collapse into one <ul>).
//   3. Lines starting with "1. " / "1) " → numbered list. We also detect
//      INLINE step patterns ("Step 1:" / "1)") in flowing prose and split
//      them out into a list so long step-by-step guides become readable.
//   4. **bold** and __bold__ → <strong>.
//   5. Inline links [text](url) → <a> (rare in our content, but safe).
//
// This is intentionally not a full markdown parser. The content is hand-
// authored and well-controlled, so we keep the parser simple and predictable.

import React from 'react';

interface MarkdownProps {
  text: string;
  className?: string;
}

// Replace **bold** / __bold__ → <strong>, and [text](url) → <a>.
// We process inline-by-inline using a single regex pass with a tagged union
// so we don't have to worry about React-key uniqueness inside nested arrays.
function renderInline(text: string, keyPrefix = ''): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // bold first, then links — order matters only when the patterns can overlap,
  // which they don't here.
  const tokenRegex = /\*\*([^*]+)\*\*|__([^_]+)__|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let counter = 0;
  while ((m = tokenRegex.exec(text))) {
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }
    if (m[1] || m[2]) {
      const bold = m[1] || m[2];
      parts.push(
        <strong key={`${keyPrefix}b${counter++}`} className="font-semibold text-text-primary">
          {bold}
        </strong>
      );
    } else if (m[3] && m[4]) {
      // External link guard: open in new tab if it's a URL
      const href = m[4];
      const external = /^https?:\/\//.test(href);
      parts.push(
        <a
          key={`${keyPrefix}l${counter++}`}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-info hover:underline"
        >
          {m[3]}
        </a>
      );
    }
    lastIndex = tokenRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

// Detect inline step lists in flowing prose. Authors often write:
//   "Step 1: Do this. Step 2: Do that. Step 3: Then this."
//   "1) First option — explanation. 2) Second option — explanation."
// We split these into discrete steps so they render as numbered lists.
function extractInlineSteps(text: string): string[] | null {
  // Match "Step 1:" / "Step 2:" etc., or standalone "1)" / "2)" markers.
  // Require at least 3 markers in sequence to avoid false positives on
  // sentences like "Open Settings > 2) Tap Privacy".
  const stepMarkers = text.match(/\b(Step\s+\d+:|\b\d+\))/g);
  if (!stepMarkers || stepMarkers.length < 3) return null;

  // Split on the markers, capturing them so we keep the numbering.
  const pieces = text.split(/\b(Step\s+\d+:|\b\d+\))/);
  // pieces will alternate: [intro?, marker1, body1, marker2, body2, ...]
  const items: string[] = [];
  let intro: string | null = null;
  for (let i = 0; i < pieces.length; i++) {
    const p = pieces[i].trim();
    if (!p) continue;
    const isMarker = /^Step\s+\d+:$|^\d+\)$/.test(p);
    if (isMarker) {
      const body = (pieces[i + 1] ?? '').trim();
      if (body) items.push(body);
      i++; // consume the body
    } else if (items.length === 0 && intro === null) {
      intro = p;
    }
  }
  if (items.length < 3) return null;
  return intro ? [`__intro__${intro}`, ...items] : items;
}

function renderParagraph(p: string, key: string): React.ReactNode {
  // 1. Multi-line bullet list ("- " at start of each line)
  const lines = p.split('\n').map(l => l.trim()).filter(Boolean);
  const isBulletList = lines.length > 1 && lines.every(l => /^[-•]\s+/.test(l));
  if (isBulletList) {
    return (
      <ul key={key} className="list-disc list-outside pl-5 space-y-1 my-3">
        {lines.map((l, i) => (
          <li key={i} className="leading-relaxed">
            {renderInline(l.replace(/^[-•]\s+/, ''), `${key}-${i}-`)}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Multi-line numbered list ("1. " or "1) " at start of each line)
  const isNumberedList = lines.length > 1 && lines.every(l => /^\d+[.)]\s+/.test(l));
  if (isNumberedList) {
    return (
      <ol key={key} className="list-decimal list-outside pl-5 space-y-1 my-3">
        {lines.map((l, i) => (
          <li key={i} className="leading-relaxed">
            {renderInline(l.replace(/^\d+[.)]\s+/, ''), `${key}-${i}-`)}
          </li>
        ))}
      </ol>
    );
  }

  // 3. Inline step list — common in our content
  const steps = extractInlineSteps(p);
  if (steps) {
    const intro = steps[0]?.startsWith('__intro__') ? steps[0].slice(9) : null;
    const items = intro ? steps.slice(1) : steps;
    return (
      <div key={key} className="my-2">
        {intro && <p className="mb-3 leading-relaxed">{renderInline(intro, `${key}-intro-`)}</p>}
        <ol className="list-decimal list-outside pl-5 space-y-2">
          {items.map((it, i) => (
            <li key={i} className="leading-relaxed pl-1">
              {renderInline(it, `${key}-${i}-`)}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // 4. Plain paragraph
  return (
    <p key={key} className="leading-relaxed">
      {renderInline(p, `${key}-`)}
    </p>
  );
}

export default function Markdown({ text, className }: MarkdownProps) {
  if (!text) return null;
  // Split on double newlines for paragraph boundaries.
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  return (
    <div className={`space-y-3 ${className ?? ''}`}>
      {paragraphs.map((p, i) => renderParagraph(p, `p${i}`))}
    </div>
  );
}

// Estimate reading time in minutes. Counts both Latin words and Tamil
// character clusters (Tamil words don't separate cleanly on whitespace alone
// for fluent reading; we approximate via character density).
export function readingTimeMinutes(text: string): number {
  if (!text) return 0;
  const hasTamil = /[஀-௿]/.test(text);
  if (hasTamil) {
    // Tamil reads ~150-180 chars/min for native speakers
    return Math.max(1, Math.round(text.length / 160));
  }
  // English ~220 words/min average reading
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 220));
}
