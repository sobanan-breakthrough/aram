'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const questions = [
  { keyEn: 'I feel safe in my day-to-day life', keyTa: 'எனது அன்றாட வாழ்க்கையில் நான் பாதுகாப்பாக உணர்கிறேன்' },
  { keyEn: 'I have people I can talk to when things are difficult', keyTa: 'கஷ்டமான நேரங்களில் பேசக்கூடிய நபர்கள் என்னிடம் உள்ளனர்' },
  { keyEn: 'I am able to sleep and rest', keyTa: 'என்னால் தூங்கவும் ஓய்வெடுக்கவும் முடிகிறது' },
  { keyEn: 'I feel hopeful about the future', keyTa: 'எதிர்காலத்தைப் பற்றி நம்பிக்கையாக உணர்கிறேன்' },
  { keyEn: 'I am able to do things that matter to me', keyTa: 'எனக்கு முக்கியமான விஷயங்களை என்னால் செய்ய முடிகிறது' },
];

export default function SelfAssessmentTool() {
  const { locale } = useLocale();
  const [answers, setAnswers] = useState<number[]>(Array(5).fill(0));
  const [showResult, setShowResult] = useState(false);

  const total = answers.reduce((a, b) => a + b, 0);
  const allAnswered = answers.every(a => a > 0);

  const getResult = () => {
    if (total <= 10) {
      return locale === 'en'
        ? 'It sounds like things have been difficult lately. You are not alone, and it is okay to ask for help. Consider reaching out to a trusted person in your community, or one of the services listed below.'
        : 'சமீபத்தில் விஷயங்கள் கடினமாக இருந்ததாகத் தெரிகிறது. நீங்கள் தனியாக இல்லை, உதவி கேட்பது சரியே. உங்கள் சமூகத்தில் நம்பகமான ஒருவரிடம் அல்லது கீழே பட்டியலிடப்பட்ட சேவைகளில் ஒன்றிடம் தொடர்பு கொள்ளுங்கள்.';
    }
    if (total <= 18) {
      return locale === 'en'
        ? 'You are managing, but there may be areas where more support could help. Small steps — talking to someone, taking time for rest, or reconnecting with something meaningful — can make a difference.'
        : 'நீங்கள் சமாளிக்கிறீர்கள், ஆனால் கூடுதல் ஆதரவு உதவக்கூடிய பகுதிகள் இருக்கலாம். சிறிய அடிகள் — யாரிடமாவது பேசுவது, ஓய்வெடுப்பது, அர்த்தமுள்ள ஒன்றுடன் மீண்டும் இணைவது — மாற்றத்தை ஏற்படுத்தலாம்.';
    }
    return locale === 'en'
      ? 'You seem to be in a good place. Continue doing what supports your wellbeing, and remember that it is okay to seek help if things change.'
      : 'நீங்கள் நல்ல நிலையில் இருப்பதாகத் தெரிகிறது. உங்கள் நல்வாழ்வை ஆதரிக்கும் செயல்களைத் தொடருங்கள், நிலைமைகள் மாறினால் உதவி நாடுவது சரியே என்பதை நினைவில் கொள்ளுங்கள்.';
  };

  const reset = () => {
    setAnswers(Array(5).fill(0));
    setShowResult(false);
  };

  const scaleLabels = locale === 'en'
    ? ['Not at all', '2', '3', '4', 'Very much']
    : ['இல்லவே இல்லை', '2', '3', '4', 'மிகவும் அதிகமாக'];

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-lg bg-secondary/10 p-3">
        <AlertTriangle className="h-4 w-4 text-secondary-dark mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p className="text-xs text-text-secondary leading-relaxed">
          {locale === 'en'
            ? 'This is not a medical or psychological assessment. If you are in crisis, please contact a health professional.'
            : 'இது மருத்துவ அல்லது உளவியல் மதிப்பீடு அல்ல. நீங்கள் நெருக்கடியில் இருந்தால், ஒரு சுகாதார நிபுணரைத் தொடர்பு கொள்ளுங்கள்.'}
        </p>
      </div>

      {!showResult ? (
        <>
          {questions.map((q, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-sm font-medium text-text-primary">
                {idx + 1}. {locale === 'en' ? q.keyEn : q.keyTa}
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    onClick={() => {
                      const next = [...answers];
                      next[idx] = val;
                      setAnswers(next);
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      answers[idx] === val
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface border-border text-text-secondary hover:border-primary/30'
                    }`}
                    aria-label={`${val} - ${scaleLabels[val - 1]}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-text-secondary px-1">
                <span>{scaleLabels[0]}</span>
                <span>{scaleLabels[4]}</span>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowResult(true)}
            disabled={!allAnswered}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
            aria-label={locale === 'en' ? 'View reflection' : 'பிரதிபலிப்பைக் காண'}
          >
            {locale === 'en' ? 'View reflection' : 'பிரதிபலிப்பைக் காண'}
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-background p-4">
            <p className="text-sm text-text-primary leading-relaxed">{getResult()}</p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 mx-auto py-2.5 px-4 rounded-lg border border-border text-sm text-text-secondary hover:text-text-primary transition-colors"
            aria-label={locale === 'en' ? 'Start over' : 'மீண்டும் தொடங்கு'}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {locale === 'en' ? 'Start over' : 'மீண்டும் தொடங்கு'}
          </button>
        </div>
      )}
    </div>
  );
}
