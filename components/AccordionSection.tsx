'use client';

import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3.5 text-left hover:bg-background transition-colors"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-[15px] font-semibold text-text-primary pr-3 leading-snug">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-text-secondary flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          id={contentId}
          className="px-4 pb-4 pt-1 border-t border-border"
        >
          {children}
        </div>
      )}
    </div>
  );
}
