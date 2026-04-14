'use client';

import { useLocale } from '@/lib/locale-context';
import { Printer } from 'lucide-react';

interface PrintableGuideProps {
  children: React.ReactNode;
}

export default function PrintableGuide({ children }: PrintableGuideProps) {
  const { locale } = useLocale();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="no-print mb-4">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/30 transition-colors"
          aria-label={locale === 'en' ? 'Print / Save as PDF' : 'அச்சிடு / PDF ஆக சேமி'}
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Print / Save as PDF' : 'அச்சிடு / PDF ஆக சேமி'}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
