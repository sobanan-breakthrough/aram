import type { ContentItem } from '@/lib/types';

export const educationContent: ContentItem[] = [
  // === SUPPORTING CHILDREN ===
  {
    id: 'edu-home-support',
    titleEn: 'Supporting Learning at Home — Practical Tips',
    titleTa: 'வீட்டில் கற்றலை ஆதரித்தல் — நடைமுறை குறிப்புகள்',
    bodyEn: 'You do not need expensive materials to support your child\'s education. Powerful free strategies: 1) Read together daily — even a newspaper, sign, or label in a shop. 2) Ask your child to explain what they learned at school each day — explaining helps them remember. 3) Create a quiet homework space — even a corner of a room with a mat and good light. 4) Show interest — attend school meetings, talk to teachers, look at their work. 5) Use everyday activities to teach: cooking teaches maths (measuring, fractions), shopping teaches money skills, gardening teaches science. 6) Limit screen time and encourage play — children learn through playing. 7) Never punish a child for not understanding — encourage questions instead. 8) If your child is struggling, talk to the teacher before it becomes a crisis.',
    bodyTa: 'உங்கள் குழந்தையின் கல்வியை ஆதரிக்க விலையுயர்ந்த பொருட்கள் தேவையில்லை. சக்திவாய்ந்த இலவச உத்திகள்: 1) தினமும் ஒன்றாக படியுங்கள் — செய்தித்தாள், அறிவிப்பு, கடை லேபிள் கூட போதும். 2) பள்ளியில் கற்றதை ஒவ்வொரு நாளும் விளக்கச் சொல்லுங்கள் — விளக்குவது நினைவில் நிறுத்த உதவும். 3) அமைதியான வீட்டுப்பாட இடத்தை உருவாக்குங்கள். 4) ஆர்வம் காட்டுங்கள் — பள்ளி கூட்டங்களில் கலந்துகொள்ளுங்கள். 5) அன்றாட நடவடிக்கைகளை கற்பிக்க பயன்படுத்துங்கள்: சமையல் கணிதம் கற்பிக்கிறது, கொள்முதல் பண திறன்களை கற்பிக்கிறது.',
    tags: ['home learning', 'parents', 'children', 'practical tips', 'free'],
    region: 'all',
    type: 'guide',
  },
  {
    id: 'edu-working-teachers',
    titleEn: 'Working with Teachers — A Parent\'s Guide',
    titleTa: 'ஆசிரியர்களுடன் பணியாற்றுதல் — பெற்றோர் வழிகாட்டி',
    bodyEn: 'Your child\'s teacher is your partner, not your opponent. How to build a good relationship: visit the school at the start of each term to introduce yourself, ask the teacher what your child is doing well and where they need help, share any important information (health issues, family changes, things that worry your child), attend parent-teacher meetings even if it means taking time off work, thank teachers for their effort — they work hard in difficult conditions. If your child has a problem at school: talk to the teacher first (calmly and respectfully), ask what solution they suggest, follow up to check if things improve. If the issue is not resolved, speak to the school principal.',
    bodyTa: 'உங்கள் குழந்தையின் ஆசிரியர் உங்கள் பங்காளி, எதிரி அல்ல. நல்ல உறவை கட்டமைப்பது: ஒவ்வொரு பருவத்தின் தொடக்கத்திலும் பள்ளிக்கு சென்று உங்களை அறிமுகப்படுத்துங்கள், உங்கள் குழந்தை எதில் நன்றாக செய்கிறார், எங்கு உதவி தேவை என்று கேளுங்கள், முக்கியமான தகவல்களை பகிருங்கள் (சுகாதார பிரச்சனைகள், குடும்ப மாற்றங்கள்). பெற்றோர்-ஆசிரியர் கூட்டங்களில் கலந்துகொள்ளுங்கள்.',
    tags: ['parents', 'teachers', 'school', 'communication', 'partnership'],
    region: 'all',
    type: 'guide',
  },

  // === ONLINE LEARNING RESOURCES ===
  {
    id: 'edu-khan-tamil',
    titleEn: 'Khan Academy — Free Learning in Tamil',
    titleTa: 'கான் அகாடமி — தமிழில் இலவச கற்றல்',
    bodyEn: 'Khan Academy offers free courses in Tamil covering maths (primary through A/L), science, computing, and economics. Works on any smartphone with internet. Features: video lessons you can pause and replay, practice exercises with instant feedback, progress tracking. Ideal for: students preparing for O/L and A/L exams, children who need extra support in maths or science, and adults wanting to learn new skills. No account needed to start watching, but creating a free account lets you track your progress. Download videos on WiFi to watch offline when internet is unavailable.',
    bodyTa: 'கான் அகாடமி தமிழில் இலவச படிப்புகளை வழங்குகிறது — கணிதம் (ஆரம்ப முதல் A/L வரை), அறிவியல், கணினி, பொருளாதாரம். எந்த ஸ்மார்ட்ஃபோனிலும் இணையத்துடன் வேலை செய்யும். அம்சங்கள்: இடைநிறுத்தி மீண்டும் இயக்கக்கூடிய வீடியோ பாடங்கள், உடனடி கருத்துடன் பயிற்சி பயிற்சிகள், முன்னேற்ற கண்காணிப்பு. O/L மற்றும் A/L தேர்வுகளுக்கு தயாராகும் மாணவர்கள், கணிதம் அல்லது அறிவியலில் கூடுதல் ஆதரவு தேவைப்படும் குழந்தைகள், புதிய திறன்களை கற்க விரும்பும் பெரியவர்களுக்கு ஏற்றது.',
    tags: ['online learning', 'free', 'maths', 'science', 'Tamil', 'O/L', 'A/L', 'children', 'adult'],
    region: 'all',
    contact: {
      website: 'https://ta.khanacademy.org',
    },
    type: 'resource',
  },
  {
    id: 'edu-youtube',
    titleEn: 'YouTube Tamil Education Channels',
    titleTa: 'YouTube தமிழ் கல்வி சேனல்கள்',
    bodyEn: 'YouTube has many free Tamil-language education channels. Recommended: Tamil maths and science channels for O/L and A/L preparation, English language learning channels (learn English through Tamil), computer skills channels (basic computer literacy in Tamil), and vocational skills channels (cooking, tailoring, agriculture techniques). Tip: subscribe to channels you find useful so new videos appear automatically. Download videos on WiFi for offline viewing later. Be selective — stick to channels recommended by teachers or trusted community members. Avoid channels that promise exam papers or shortcuts.',
    bodyTa: 'YouTube-இல் பல இலவச தமிழ் மொழி கல்வி சேனல்கள் உள்ளன. பரிந்துரைக்கப்படுபவை: O/L மற்றும் A/L தயாரிப்புக்கான தமிழ் கணிதம் மற்றும் அறிவியல் சேனல்கள், ஆங்கில மொழி கற்றல் சேனல்கள் (தமிழ் மூலம் ஆங்கிலம் கற்க), கணினி திறன் சேனல்கள், தொழிற்திறன் சேனல்கள் (சமையல், தையல், விவசாய நுட்பங்கள்). குறிப்பு: பயனுள்ள சேனல்களில் சந்தா செய்யுங்கள்.',
    tags: ['online learning', 'YouTube', 'free', 'Tamil', 'O/L', 'A/L', 'skills'],
    region: 'all',
    contact: {
      website: 'https://www.youtube.com',
    },
    type: 'resource',
  },

  // === HIGHER EDUCATION ===
  {
    id: 'edu-university',
    titleEn: 'University Pathways for Tamil Students',
    titleTa: 'தமிழ் மாணவர்களுக்கான பல்கலைக்கழக பாதைகள்',
    bodyEn: 'Main options: 1) University of Jaffna — offers degree programmes in arts, science, medicine, engineering, management, and agriculture. Tamil medium available for most programmes. Entry through A/L examination results and UGC selection. 2) Eastern University — degree programmes in arts, science, commerce, agriculture, and technology. Tamil medium available. Based in Batticaloa with campuses in Trincomalee. 3) Open University of Sri Lanka — distance learning for those who cannot attend full-time. Study centres in Jaffna, Batticaloa, and Trincomalee. Flexible schedule. 4) Technical colleges and vocational training institutes — shorter programmes in practical trades (IT, hospitality, electrical, automotive). Ask at your nearest National Apprentice and Industrial Training Authority (NAITA) centre.',
    bodyTa: 'முக்கிய விருப்பங்கள்: 1) யாழ்ப்பாண பல்கலைக்கழகம் — கலை, அறிவியல், மருத்துவம், பொறியியல், நிர்வாகம், விவசாயம் ஆகிய துறைகளில் பட்டப்படிப்புகள். பெரும்பாலான திட்டங்களுக்கு தமிழ் மொழி கிடைக்கும். 2) கிழக்கு பல்கலைக்கழகம் — கலை, அறிவியல், வணிகம், விவசாயம், தொழில்நுட்பம். 3) இலங்கை திறந்த பல்கலைக்கழகம் — முழுநேரம் கலந்துகொள்ள இயலாதவர்களுக்கு தொலைதூர கற்றல். 4) தொழில்நுட்ப கல்லூரிகள் மற்றும் தொழிற்பயிற்சி நிறுவனங்கள்.',
    tags: ['university', 'higher education', 'Tamil medium', 'Jaffna', 'Eastern', 'Open University'],
    region: 'national',
    contact: {
      website: 'https://www.jfn.ac.lk',
    },
    type: 'explainer',
  },
  {
    id: 'edu-scholarships',
    titleEn: 'Scholarships for Tamil Students',
    titleTa: 'தமிழ் மாணவர்களுக்கான புலமைப்பரிசில்கள்',
    bodyEn: 'Several organisations offer scholarships for students from the North and East: 1) Government Mahapola scholarships — for university students based on A/L results and financial need. Apply through your university. 2) Diaspora-funded scholarships — multiple Tamil diaspora organisations offer school and university scholarships. Check with your school principal or university student affairs office at the start of each academic year. 3) NGO educational support — some NGOs provide school supplies, uniforms, and tuition support. Contact your local Divisional Secretariat for current programmes. 4) Private bursaries — some private companies and foundations offer merit-based scholarships. Watch for announcements in newspapers and on university notice boards. Tip: apply to multiple scholarships — do not rely on a single application.',
    bodyTa: 'பல நிறுவனங்கள் வடக்கு மற்றும் கிழக்கிலிருந்து மாணவர்களுக்கு புலமைப்பரிசில்களை வழங்குகின்றன: 1) அரசாங்க மகாபொல புலமைப்பரிசில்கள் — A/L முடிவுகள் மற்றும் நிதி தேவையின் அடிப்படையில். 2) புலம்பெயர்ந்தோர் நிதியுதவி புலமைப்பரிசில்கள் — பல தமிழ் புலம்பெயர் நிறுவனங்கள் பள்ளி மற்றும் பல்கலைக்கழக புலமைப்பரிசில்களை வழங்குகின்றன. 3) NGO கல்வி ஆதரவு. 4) தனியார் உதவித்தொகைகள்.',
    tags: ['scholarships', 'financial aid', 'university', 'school', 'Mahapola', 'diaspora'],
    region: 'all',
    contact: {
      website: 'https://www.jfn.ac.lk',
    },
    type: 'resource',
  },

  // === ADULT EDUCATION ===
  {
    id: 'edu-adult-literacy',
    titleEn: 'Adult Literacy and Non-Formal Education',
    titleTa: 'பெரியவர் எழுத்தறிவு மற்றும் முறைசாரா கல்வி',
    bodyEn: 'If you missed formal schooling, it is never too late to learn. Options: 1) National Institute of Education adult literacy programmes — free classes in reading, writing, and basic maths. Ask at your Divisional Secretariat. 2) NGO-run vocational programmes — some NGOs in the North and East offer free training in trades like carpentry, electrical work, IT skills, beautician training, and sewing. 3) Community learning centres — some areas have community-run centres offering basic education for adults. 4) Phone-based learning — Khan Academy and YouTube offer free Tamil-language lessons you can access on your phone. Start with what interests you most — you do not need to follow a formal curriculum.',
    bodyTa: 'முறையான பள்ளிக்கல்வியை இழந்திருந்தால், கற்க ஒருபோதும் தாமதமாகாது. விருப்பங்கள்: 1) தேசிய கல்வி நிறுவனம் பெரியவர் எழுத்தறிவு திட்டங்கள் — வாசிப்பு, எழுதுதல், அடிப்படை கணிதத்தில் இலவச வகுப்புகள். 2) NGO நடத்தும் தொழிற்பயிற்சி திட்டங்கள் — தச்சு, மின்சார வேலை, IT திறன்கள், அழகு நிலையம் பயிற்சி, தையல். 3) சமூக கற்றல் மையங்கள். 4) தொலைபேசி அடிப்படையிலான கற்றல் — Khan Academy மற்றும் YouTube.',
    tags: ['adult education', 'literacy', 'vocational', 'non-formal', 'free', 'adult'],
    region: 'all',
    contact: {
      website: 'https://nie.lk',
    },
    type: 'explainer',
  },
  {
    id: 'edu-english',
    titleEn: 'Learning English — Free Resources',
    titleTa: 'ஆங்கிலம் கற்றல் — இலவச வளங்கள்',
    bodyEn: 'English skills open doors to employment, education, and online earning. Free ways to learn: 1) Duolingo app — free, game-like English lessons on your phone (set it to learn English from Tamil). 2) YouTube channels — search "learn English through Tamil" for structured lessons. 3) BBC Learning English — free website and app with lessons from beginner to advanced. 4) Practice daily — label objects in your home in English, listen to English news for 10 minutes daily, try thinking in English for short periods. 5) Find a practice partner — someone also learning English whom you can practise with regularly. The key is daily practice, even if just 10–15 minutes. Consistency beats intensity.',
    bodyTa: 'ஆங்கில திறன்கள் வேலை, கல்வி, ஆன்லைன் வருமானத்திற்கு கதவுகளைத் திறக்கின்றன. இலவசமாக கற்க: 1) Duolingo செயலி — உங்கள் தொலைபேசியில் இலவச, விளையாட்டு போன்ற ஆங்கில பாடங்கள் (தமிழிலிருந்து ஆங்கிலம் கற்க அமையுங்கள்). 2) YouTube சேனல்கள் — "learn English through Tamil" தேடுங்கள். 3) BBC Learning English — இலவச இணையதளம் மற்றும் செயலி. 4) தினமும் பயிற்சி செய்யுங்கள். 5) பயிற்சி பங்காளியை கண்டறியுங்கள்.',
    tags: ['English', 'language learning', 'free', 'Duolingo', 'adult', 'skills', 'employment'],
    region: 'all',
    type: 'resource',
    contact: {
      website: 'https://www.duolingo.com',
    },
  },

  // === EARLY YEARS ===
  {
    id: 'edu-early-years',
    titleEn: 'Early Years Learning (0–5 years)',
    titleTa: 'ஆரம்ப ஆண்டுகள் கற்றல் (0–5 வயது)',
    bodyEn: 'The first five years are when the brain develops fastest. What helps: talk to your baby and toddler constantly — describe what you are doing, name objects, sing songs. Read to them daily, even before they understand words — it builds language and bonding. Let them play freely — sand, water, stacking objects, drawing. Limit screen time (no screens before age 2, and maximum 1 hour per day for ages 2–5). Let them explore safely — climbing, running, manipulating objects builds physical and cognitive skills. Do not force formal academic learning before age 5 — play IS learning at this age. Preschool or montessori (if available and affordable) provides social skills and school readiness.',
    bodyTa: 'முதல் ஐந்து ஆண்டுகளில் மூளை மிக வேகமாக வளர்ச்சியடைகிறது. உதவுவது: உங்கள் குழந்தையிடம் தொடர்ந்து பேசுங்கள் — நீங்கள் என்ன செய்கிறீர்கள் என்று விவரியுங்கள், பொருட்களுக்கு பெயர் சொல்லுங்கள், பாடல்கள் பாடுங்கள். வார்த்தைகளை புரிந்துகொள்வதற்கு முன்பே தினமும் படியுங்கள். சுதந்திரமாக விளையாட அனுமதியுங்கள் — மணல், தண்ணீர், அடுக்குதல், ஓவியம். 5 வயதுக்கு முன் முறையான கல்வி கற்றலை கட்டாயப்படுத்தாதீர்கள் — விளையாட்டே கற்றல்.',
    tags: ['early years', 'children', 'parents', 'play', 'development', '0-5'],
    region: 'all',
    type: 'guide',
  },

  // === ADDITIONAL EDUCATION CONTENT ===
  {
    id: 'edu-exam-tips',
    titleEn: 'Study Tips for O/L and A/L Students',
    titleTa: 'O/L மற்றும் A/L மாணவர்களுக்கான படிப்பு குறிப்புகள்',
    bodyEn: 'Smart study habits matter more than hours spent. Effective strategies: 1) Study in short focused blocks (25 minutes study, 5 minutes break — the Pomodoro technique). 2) Test yourself rather than just re-reading notes — try to recall information from memory. 3) Study the hardest subject first when your mind is freshest. 4) Create summary sheets for each topic — condensing information helps you remember. 5) Study past exam papers — patterns repeat. Your school library or teacher may have copies. 6) Form a small study group (2–4 students) to discuss and quiz each other. 7) Sleep well the night before an exam — your brain consolidates memories during sleep. 8) During the exam: read ALL questions first, start with the ones you know, manage your time (divide total time by number of questions). Free resources: Khan Academy Tamil for maths and science revision, YouTube O/L and A/L channels.',
    bodyTa: 'புத்திசாலித்தனமான படிப்பு பழக்கங்கள் செலவழிக்கும் மணி நேரங்களை விட முக்கியம். பயனுள்ள உத்திகள்: 1) குறுகிய கவனமான தொகுதிகளில் படியுங்கள் (25 நிமிட படிப்பு, 5 நிமிட இடைவெளி). 2) குறிப்புகளை மீண்டும் படிப்பதை விட உங்களை நீங்களே சோதியுங்கள். 3) மனம் புத்துணர்வாக இருக்கும்போது கடினமான பாடத்தை முதலில் படியுங்கள். 4) ஒவ்வொரு தலைப்புக்கும் சுருக்க தாள்களை உருவாக்குங்கள். 5) கடந்த தேர்வு தாள்களை படியுங்கள். 6) விவாதிக்க சிறிய படிப்பு குழுவை உருவாக்குங்கள். 7) தேர்வுக்கு முந்தைய இரவு நன்றாக தூங்குங்கள். 8) தேர்வின் போது: முதலில் எல்லா கேள்விகளையும் படியுங்கள், நீங்கள் அறிந்தவற்றுடன் தொடங்குங்கள்.',
    tags: ['study tips', 'O/L', 'A/L', 'exams', 'students', 'secondary'],
    region: 'all',
    type: 'guide',
  },
  {
    id: 'edu-teacher-support',
    titleEn: 'Resources for Teachers — Supporting Every Student',
    titleTa: 'ஆசிரியர்களுக்கான வளங்கள் — ஒவ்வொரு மாணவரையும் ஆதரித்தல்',
    bodyEn: 'Teaching in post-conflict communities comes with unique challenges. Many students carry trauma, some have gaps in their education, others have unidentified learning difficulties. Practical approaches: 1) Start each day with a calm, predictable routine — this helps anxious students feel safe. 2) Use multiple ways to teach the same concept (visual, verbal, hands-on) — not all students learn the same way. 3) Give clear, simple instructions — one step at a time. 4) Notice behavioural changes — a child who suddenly becomes withdrawn or aggressive may be struggling with something at home. 5) Build relationships with parents — a brief positive message home goes a long way. 6) Take care of your own wellbeing — you cannot support students if you are burning out. The SEND section of this app has specific guidance on inclusive classroom practices.',
    bodyTa: 'மோதலுக்குப் பிந்தைய சமூகங்களில் கற்பித்தல் தனித்துவமான சவால்களுடன் வருகிறது. பல மாணவர்கள் அதிர்ச்சியை சுமக்கிறார்கள், சிலருக்கு கல்வியில் இடைவெளிகள் உள்ளன, மற்றவர்களுக்கு அடையாளம் காணப்படாத கற்றல் சிரமங்கள் உள்ளன. நடைமுறை அணுகுமுறைகள்: 1) ஒவ்வொரு நாளும் அமைதியான, கணிக்கக்கூடிய வழக்கத்துடன் தொடங்குங்கள். 2) ஒரே கருத்தை கற்பிக்க பல வழிகளை பயன்படுத்துங்கள் (காட்சி, சொல், நடைமுறை). 3) தெளிவான, எளிய அறிவுறுத்தல்கள் கொடுங்கள். 4) நடத்தை மாற்றங்களை கவனியுங்கள். 5) பெற்றோருடன் உறவுகளை கட்டமையுங்கள். 6) உங்கள் சொந்த நல்வாழ்வை கவனியுங்கள்.',
    tags: ['teachers', 'training', 'inclusive education', 'classroom', 'trauma-informed'],
    region: 'all',
    type: 'guide',
    trainerResource: true,
  },
  {
    id: 'edu-digital-learning',
    titleEn: 'Using Your Phone for Education',
    titleTa: 'கல்விக்கு உங்கள் தொலைபேசியைப் பயன்படுத்துதல்',
    bodyEn: 'Your smartphone is a powerful learning tool. Here is how to use it effectively: 1) Download Khan Academy — it has free Tamil-language courses for maths, science, and computing from primary through A/L level. Works offline once downloaded. 2) Use YouTube as a tutor — search for your specific topic in Tamil (e.g., "O/L chemistry Tamil" or "A/L physics Tamil"). Many teachers upload full lesson series. 3) Google Translate can help you read English-language textbooks — point your camera at the text for instant translation. 4) Duolingo for learning English — 10 minutes a day builds language skills gradually. 5) Voice typing lets you take notes quickly — tap the microphone on your keyboard. 6) Download educational apps on WiFi, then use them offline when data is expensive. Pro tip: set a daily learning alarm — consistency is what creates results.',
    bodyTa: 'உங்கள் ஸ்மார்ட்ஃபோன் சக்திவாய்ந்த கற்றல் கருவி. பயனுள்ள முறையில் பயன்படுத்துவது: 1) Khan Academy பதிவிறக்கம் செய்யுங்கள் — ஆரம்ப முதல் A/L வரை கணிதம், அறிவியல், கணினி ஆகியவற்றில் இலவச தமிழ் படிப்புகள். பதிவிறக்கம் செய்தபின் ஆஃப்லைனில் வேலை செய்யும். 2) YouTube-ஐ ஆசிரியராக பயன்படுத்துங்கள் — உங்கள் குறிப்பிட்ட தலைப்பை தமிழில் தேடுங்கள். 3) Google Translate ஆங்கில பாடப்புத்தகங்களை படிக்க உதவும் — உடனடி மொழிபெயர்ப்புக்கு கேமராவை உரையை நோக்கி காட்டுங்கள். 4) ஆங்கிலம் கற்க Duolingo — நாளுக்கு 10 நிமிடங்கள் படிப்படியாக மொழி திறன்களை வளர்க்கும். 5) விரைவாக குறிப்புகள் எடுக்க குரல் தட்டச்சு.',
    tags: ['smartphone', 'digital learning', 'apps', 'Khan Academy', 'YouTube', 'students'],
    region: 'all',
    type: 'guide',
    contact: {
      website: 'https://ta.khanacademy.org',
    },
  },
];
