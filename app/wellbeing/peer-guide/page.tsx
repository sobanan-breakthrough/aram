'use client';

import { useLocale } from '@/lib/locale-context';
import PrintableGuide from '@/components/PrintableGuide';
import TrainTheTrainerBadge from '@/components/TrainTheTrainerBadge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    titleEn: 'Listen actively',
    titleTa: 'கவனமாகக் கேளுங்கள்',
    bodyEn: 'Give the person your full attention. Put away your phone, turn off notifications, and face them directly. Make gentle eye contact to show you are present, but do not stare — some people find that uncomfortable. Nod and use small phrases like "I see" or "go on" to show you are following along. Do not interrupt or rush to fill silences; sometimes a pause is what someone needs to gather their thoughts. Your calm, steady presence is more powerful than any advice you could give.',
    bodyTa: 'நபருக்கு உங்கள் முழு கவனத்தையும் கொடுங்கள். உங்கள் தொலைபேசியை ஒதுக்கி வையுங்கள், அறிவிப்புகளை அணையுங்கள், நேரடியாக அவர்களை நோக்கி அமருங்கள். நீங்கள் அங்கு இருக்கிறீர்கள் என்பதைக் காட்ட மெதுவாக கண் தொடர்பு கொள்ளுங்கள், ஆனால் உற்றுப் பார்க்காதீர்கள் — சிலருக்கு அது சங்கடமாக இருக்கும். "புரிகிறது" அல்லது "தொடருங்கள்" போன்ற சிறிய சொற்களைப் பயன்படுத்தி நீங்கள் கவனிக்கிறீர்கள் என்பதைக் காட்டுங்கள். குறுக்கிடாதீர்கள் அல்லது அமைதியை நிரப்ப அவசரப்படாதீர்கள்; சில நேரங்களில் ஒரு இடைநிறுத்தம் அவர்களுக்கு தேவையானது. உங்கள் அமைதியான, நிலையான இருப்பு எந்த ஆலோசனையையும் விட சக்திவாய்ந்தது.',
  },
  {
    titleEn: 'What to say',
    titleTa: 'என்ன சொல்ல வேண்டும்',
    bodyEn: 'Use simple, honest words that show you care. Try phrases like: "I hear you," "That sounds really difficult," "You are not alone," or "Thank you for trusting me with this." You do not need to have all the answers — just acknowledging someone\'s pain can make a real difference. Reflect back what they have told you, for example: "It sounds like you have been carrying this for a long time." Avoid jumping to solutions unless they ask for advice. Let them know that their feelings are valid and that it took courage to speak up.',
    bodyTa: '"நான் கேட்கிறேன்," "அது மிகவும் கடினமாக இருக்கிறது," "நீங்கள் தனியாக இல்லை," அல்லது "இதை என்னிடம் நம்பிச் சொன்னதற்கு நன்றி" போன்ற எளிமையான, நேர்மையான வார்த்தைகளைப் பயன்படுத்துங்கள். உங்களிடம் எல்லா பதில்களும் இருக்க வேண்டியதில்லை — ஒருவரின் வலியை ஒப்புக்கொள்வதே பெரிய மாற்றத்தை ஏற்படுத்தும். அவர்கள் சொன்னதை திரும்பப் பிரதிபலியுங்கள், உதாரணமாக: "நீங்கள் இதை நீண்ட காலமாக சுமந்து வருவது போல் தெரிகிறது." அவர்கள் ஆலோசனை கேட்காத வரை தீர்வுகளுக்கு குதிக்காதீர்கள். அவர்களின் உணர்வுகள் நியாயமானவை என்றும், பேச தைரியம் காட்டியது பாராட்டுக்குரியது என்றும் தெரிவியுங்கள்.',
  },
  {
    titleEn: 'What NOT to say',
    titleTa: 'என்ன சொல்ல வேண்டாம்',
    bodyEn: 'Some well-meaning phrases can actually cause harm. Avoid saying things like: "Just be positive," "Others have it worse," "You should be over it by now," or "Everything happens for a reason." These words dismiss a person\'s pain and can make them feel guilty for struggling. Do not compare their situation to anyone else\'s — everyone\'s suffering is real to them. Resist the urge to say "I know exactly how you feel," because each person\'s experience is unique. Instead of giving opinions, focus on being a safe space where they can express themselves without judgement.',
    bodyTa: 'சில நல்ல நோக்கமுள்ள வாக்கியங்கள் உண்மையில் தீங்கு விளைவிக்கலாம். "நேர்மறையாக இருங்கள்," "மற்றவர்களுக்கு இன்னும் மோசமாக உள்ளது," "இது போதும், மறந்துவிடுங்கள்," அல்லது "எல்லாவற்றுக்கும் ஒரு காரணம் உண்டு" போன்ற வார்த்தைகளைத் தவிர்க்கவும். இந்த வார்த்தைகள் ஒரு நபரின் வலியை நிராகரிக்கின்றன, போராடுவதற்கு குற்ற உணர்வை ஏற்படுத்தலாம். அவர்களின் நிலையை வேறு யாருடனும் ஒப்பிடாதீர்கள் — ஒவ்வொருவரின் துன்பமும் அவர்களுக்கு உண்மையானது. "உங்களுக்கு எப்படி உணர்கிறீர்கள் என்று எனக்கு நன்றாகத் தெரியும்" என்று சொல்வதைத் தவிர்க்கவும், ஏனெனில் ஒவ்வொருவரின் அனுபவமும் தனித்துவமானது. கருத்துக்களைச் சொல்வதற்குப் பதிலாக, அவர்கள் தீர்ப்பு இல்லாமல் தங்களை வெளிப்படுத்தக்கூடிய பாதுகாப்பான இடமாக இருங்கள்.',
  },
  {
    titleEn: 'When to escalate',
    titleTa: 'எப்போது அதிகாரப்பூர்வ உதவி தேவை',
    bodyEn: 'If someone talks about harming themselves or others, or if they seem unable to care for themselves, it is time to involve professional support. You do not need to handle a crisis alone — that is not your role. Calmly let the person know that you care about them and that you would like to help them talk to someone who is trained for this. If the situation feels urgent, stay with them and call a crisis helpline together. Trust your instincts: if something feels seriously wrong, it is always better to act than to wait. Escalating is not a failure — it is the most caring thing you can do.',
    bodyTa: 'யாரேனும் தங்களையோ பிறரையோ காயப்படுத்திக்கொள்வதைப் பற்றி பேசினால், அல்லது தங்களைப் பராமரிக்க இயலாத நிலையில் இருந்தால், தொழில்முறை ஆதரவை ஈடுபடுத்த வேண்டிய நேரம் இது. ஒரு நெருக்கடியை நீங்கள் தனியாக கையாள வேண்டியதில்லை — அது உங்கள் பங்கு அல்ல. நீங்கள் அவர்களைப் பற்றி அக்கறை கொள்கிறீர்கள் என்றும், இதற்குப் பயிற்சி பெற்ற ஒருவரிடம் பேச உதவ விரும்புகிறீர்கள் என்றும் அமைதியாகத் தெரிவியுங்கள். நிலைமை அவசரமாக உணர்ந்தால், அவர்களுடன் இருந்து ஒரு நெருக்கடி உதவி எண்ணை ஒன்றாக அழையுங்கள். உங்கள் உள்ளுணர்வை நம்புங்கள்: ஏதாவது தீவிரமாக தவறாக உணர்ந்தால், காத்திருப்பதை விட செயல்படுவது எப்போதும் சிறந்தது. அதிகாரப்பூர்வ உதவியை நாடுவது தோல்வி அல்ல — அது நீங்கள் செய்யக்கூடிய மிகவும் அக்கறையான செயல்.',
  },
  {
    titleEn: 'Taking care of yourself',
    titleTa: 'உங்களைப் பராமரித்துக் கொள்ளுங்கள்',
    bodyEn: 'Supporting others is emotionally demanding, and your own wellbeing matters just as much. After a heavy conversation, take a moment to check in with yourself — notice how you are feeling in your body and mind. Talk to someone you trust about your own feelings; carrying other people\'s pain in silence can lead to burnout. Set healthy boundaries: it is okay to say "I care about you, but I need a break right now." Make time for activities that recharge you, whether that is a walk, music, prayer, or time with friends. Remember, you cannot pour from an empty cup — looking after yourself is what makes you able to keep showing up for others.',
    bodyTa: 'பிறரை ஆதரிப்பது உணர்வுரீதியாக கடினமானது, உங்கள் சொந்த நல்வாழ்வும் அதே அளவு முக்கியமானது. ஒரு கடினமான உரையாடலுக்குப் பிறகு, உங்களை நீங்களே சரிபார்த்துக் கொள்ளுங்கள் — உங்கள் உடலிலும் மனதிலும் எப்படி உணர்கிறீர்கள் என்பதைக் கவனியுங்கள். உங்கள் உணர்வுகளைப் பற்றி நம்பகமான ஒருவரிடம் பேசுங்கள்; பிறரின் வலியை அமைதியாக சுமப்பது சோர்வுக்கு வழிவகுக்கும். ஆரோக்கியமான எல்லைகளை அமையுங்கள்: "நான் உங்களைப் பற்றி அக்கறை கொள்கிறேன், ஆனால் இப்போது எனக்கு ஓய்வு தேவை" என்று சொல்வது சரிதான். நடைப்பயிற்சி, இசை, பிரார்த்தனை, அல்லது நண்பர்களுடன் நேரம் செலவழிப்பது போன்ற உங்களை புத்துணர்ச்சியூட்டும் செயல்களுக்கு நேரம் ஒதுக்குங்கள். நினைவில் கொள்ளுங்கள், வெற்றுக் குவளையிலிருந்து ஊற்ற முடியாது — உங்களைப் பார்த்துக்கொள்வதே மற்றவர்களுக்காக தொடர்ந்து வருவதை சாத்தியமாக்குகிறது.',
  },
  {
    titleEn: 'How to start a conversation',
    titleTa: 'உரையாடலை எப்படி தொடங்குவது',
    bodyEn: 'If you are worried about someone, do not wait for them to come to you — gently reach out. Choose a quiet, private moment when you will not be overheard or interrupted, such as a walk together or sitting side by side. Start with something simple and non-threatening: "I have noticed you seem a bit down lately — is everything okay?" or "I just wanted to check in with you." Avoid public settings or times when they are rushed or stressed. Let them know there is no pressure to talk right now, but that you are here whenever they are ready. Sometimes just knowing someone has noticed and cared is enough to open the door.',
    bodyTa: 'நீங்கள் ஒருவரைப் பற்றி கவலைப்பட்டால், அவர்கள் உங்களிடம் வரும் வரை காத்திருக்காதீர்கள் — மெதுவாக அணுகுங்கள். யாரும் கேட்காத அல்லது குறுக்கிடாத அமைதியான, தனிப்பட்ட தருணத்தைத் தேர்ந்தெடுங்கள், உதாரணமாக ஒன்றாக நடப்பது அல்லது பக்கத்தில் அமர்வது. எளிமையான, அச்சுறுத்தாத ஒன்றிலிருந்து தொடங்குங்கள்: "நீங்கள் சமீபத்தில் கொஞ்சம் வருத்தமாக இருப்பது போல் தெரிகிறது — எல்லாம் சரியா?" அல்லது "உங்களை நலம் விசாரிக்க விரும்பினேன்." பொது இடங்கள் அல்லது அவர்கள் அவசரமாக இருக்கும் நேரங்களைத் தவிர்க்கவும். இப்போது பேச எந்த அழுத்தமும் இல்லை என்றும், அவர்கள் தயாராக இருக்கும்போது நீங்கள் இங்கே இருக்கிறீர்கள் என்றும் தெரிவியுங்கள். சில நேரங்களில் யாரோ கவனித்துள்ளார்கள், அக்கறை கொண்டுள்ளார்கள் என்பதை அறிவதே கதவைத் திறக்க போதுமானது.',
  },
  {
    titleEn: 'Supporting someone over time',
    titleTa: 'காலப்போக்கில் ஒருவரை ஆதரிப்பது',
    bodyEn: 'Recovery and healing are not one-time events — they happen over weeks and months. After your first conversation, follow up with a simple message: "Just thinking of you — how are you doing today?" Consistency matters more than grand gestures; a short regular check-in shows you have not forgotten about them. Respect their boundaries — if they do not want to talk on a particular day, let them know that is completely fine and you will be here when they are ready. Remember that your role is to be a caring friend, not a therapist. If you notice things getting worse despite your support, gently encourage them to speak with a professional — and remind them that doing so is a sign of strength, not weakness.',
    bodyTa: 'மீட்பும் குணமடைதலும் ஒரு முறை நிகழ்வுகள் அல்ல — அவை வாரங்கள் மற்றும் மாதங்களில் நடக்கின்றன. உங்கள் முதல் உரையாடலுக்குப் பிறகு, ஒரு எளிய செய்தியுடன் தொடருங்கள்: "உங்களை நினைக்கிறேன் — இன்று எப்படி இருக்கிறீர்கள்?" பெரிய சைகைகளை விட நிலைத்தன்மை முக்கியம்; ஒரு சிறிய வழக்கமான நலம் விசாரிப்பு நீங்கள் அவர்களை மறக்கவில்லை என்பதைக் காட்டுகிறது. அவர்களின் எல்லைகளை மதியுங்கள் — ஒரு குறிப்பிட்ட நாளில் பேச விரும்பவில்லை என்றால், அது முற்றிலும் சரி என்றும், அவர்கள் தயாராக இருக்கும்போது நீங்கள் இங்கே இருப்பீர்கள் என்றும் தெரிவியுங்கள். உங்கள் பங்கு ஒரு அக்கறையுள்ள நண்பராக இருப்பது, ஒரு சிகிச்சையாளர் அல்ல என்பதை நினைவில் கொள்ளுங்கள். உங்கள் ஆதரவு இருந்தும் நிலைமை மோசமாவதைக் கவனித்தால், ஒரு நிபுணரிடம் பேச மென்மையாக ஊக்குவியுங்கள் — அவ்வாறு செய்வது பலவீனம் அல்ல, வலிமையின் அடையாளம் என்று நினைவூட்டுங்கள்.',
  },
  {
    titleEn: 'Working with professionals',
    titleTa: 'நிபுணர்களுடன் இணைந்து செயல்படுதல்',
    bodyEn: 'Sometimes the best thing you can do is help someone connect with a trained counsellor or mental health professional. You can say: "Would you like me to help you find someone to talk to?" or "I can sit with you while you make the call." If they are nervous about a referral, explain what to expect: a first appointment is usually a conversation where the professional listens and asks some questions — there is no judgement. Offer to accompany them to their first visit if that would help them feel safer. Share the contact details of local services so they have them when they are ready. Remember, connecting someone with professional support is one of the most valuable things you can do as a peer supporter — it does not mean you have failed, it means you are helping them get the right kind of care.',
    bodyTa: 'சில நேரங்களில் நீங்கள் செய்யக்கூடிய சிறந்த விஷயம், பயிற்சி பெற்ற ஆலோசகர் அல்லது மனநல நிபுணருடன் ஒருவரை இணைக்க உதவுவதுதான். "பேச யாரையாவது கண்டுபிடிக்க நான் உதவட்டுமா?" அல்லது "நீங்கள் அழைக்கும்போது நான் உங்களுடன் அமர்ந்திருக்கிறேன்" என்று சொல்லலாம். பரிந்துரை பற்றி அவர்கள் பதற்றமாக இருந்தால், என்ன எதிர்பார்க்கலாம் என்பதை விளக்குங்கள்: முதல் சந்திப்பு பொதுவாக நிபுணர் கேட்டு சில கேள்விகள் கேட்கும் ஒரு உரையாடல் — எந்த தீர்ப்பும் இல்லை. அவர்கள் பாதுகாப்பாக உணர உதவும் என்றால், முதல் வருகைக்கு உடன் செல்ல முன்வாருங்கள். உள்ளூர் சேவைகளின் தொடர்பு விவரங்களை பகிருங்கள், அவர்கள் தயாராக இருக்கும்போது அவை அவர்களிடம் இருக்கும். நினைவில் கொள்ளுங்கள், ஒருவரை தொழில்முறை ஆதரவுடன் இணைப்பது ஒரு சக ஆதரவாளராக நீங்கள் செய்யக்கூடிய மிக மதிப்புமிக்க விஷயங்களில் ஒன்று — நீங்கள் தோற்றுவிட்டீர்கள் என்று அர்த்தமல்ல, சரியான வகையான பராமரிப்பைப் பெற உதவுகிறீர்கள் என்று அர்த்தம்.',
  },
];

export default function PeerGuidePage() {
  const { locale } = useLocale();

  return (
    <div className="space-y-6">
      <div className="no-print">
        <Link
          href="/wellbeing"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4"
          aria-label={locale === 'en' ? 'Back to Wellbeing' : 'நல்வாழ்வுக்கு திரும்பு'}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {locale === 'en' ? 'Back to Wellbeing' : 'நல்வாழ்வுக்கு திரும்பு'}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-text-primary">
          {locale === 'en' ? 'Peer Support Guide' : 'சக ஆதரவு வழிகாட்டி'}
        </h1>
        <TrainTheTrainerBadge />
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">
        {locale === 'en'
          ? 'When you support someone in your community, you are doing important work. This guide will help you listen well and know when to refer someone to professional help.'
          : 'உங்கள் சமூகத்தில் ஒருவரை ஆதரிக்கும்போது, நீங்கள் முக்கியமான வேலையைச் செய்கிறீர்கள். இந்த வழிகாட்டி நன்றாகக் கேட்கவும், தொழில்முறை உதவிக்கு எப்போது ஒருவரை அனுப்ப வேண்டும் என்பதையும் அறிய உதவும்.'}
      </p>

      <PrintableGuide>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="rounded-xl bg-surface border border-border p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold mr-2">
                  {idx + 1}
                </span>
                {locale === 'en' ? step.titleEn : step.titleTa}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed ml-8">
                {locale === 'en' ? step.bodyEn : step.bodyTa}
              </p>
            </div>
          ))}
        </div>
      </PrintableGuide>

      {/* Key Emergency Numbers */}
      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4">
        <h2 className="text-sm font-bold text-red-800 dark:text-red-300 mb-3">
          {locale === 'en' ? 'Key Emergency Numbers' : 'முக்கிய அவசர எண்கள்'}
        </h2>
        <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[120px]">Sumithrayo</span>
            <span>
              {locale === 'en'
                ? '— 24/7 emotional support & crisis helpline'
                : '— 24/7 உணர்வு ஆதரவு & நெருக்கடி உதவி எண்'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[120px]">1926</span>
            <span>
              {locale === 'en'
                ? '— National mental health helpline'
                : '— தேசிய மனநல உதவி எண்'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[120px]">1938</span>
            <span>
              {locale === 'en'
                ? '— Women & children helpline'
                : '— பெண்கள் & குழந்தைகள் உதவி எண்'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold min-w-[120px]">1990</span>
            <span>
              {locale === 'en'
                ? '— Suwa Seriya (emergency ambulance)'
                : '— சுவ செரிய (அவசர ஆம்புலன்ஸ்)'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
