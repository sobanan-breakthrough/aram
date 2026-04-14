'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3.5 text-left bg-surface hover:bg-background transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-text-primary pr-2">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-text-secondary flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}
