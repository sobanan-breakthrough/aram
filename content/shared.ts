import type { ContentItem } from '@/lib/types';

export const sharedContent: ContentItem[] = [
  // === EMERGENCY NUMBERS ===
  {
    id: 'shared-emergency-ambulance',
    titleEn: '1990 — Emergency Ambulance (Free)',
    titleTa: '1990 — அவசர ஆம்புலன்ஸ் (இலவசம்)',
    bodyEn: 'Dial 1990 for the free national emergency ambulance service (Suwa Seriya). Available across Sri Lanka including Northern and Eastern Provinces. Ambulances are equipped with basic life support and staffed by trained emergency medical technicians. No cost to the patient. Average response time: 10–20 minutes in urban areas.',
    bodyTa: '1990 என்று டயல் செய்யுங்கள் — இலவச தேசிய அவசர ஆம்புலன்ஸ் சேவை (சுவ சேரிய). வடக்கு மற்றும் கிழக்கு மாகாணங்கள் உட்பட இலங்கை முழுவதும் கிடைக்கும். ஆம்புலன்ஸ்கள் அடிப்படை உயிர் ஆதரவுடன் பொருத்தப்பட்டுள்ளன. நோயாளிக்கு கட்டணம் இல்லை.',
    tags: ['emergency', 'ambulance', '24/7', '1990', 'free'],
    region: 'national',
    contact: {
      phone: '1990',
    },
    type: 'resource',
  },
  {
    id: 'shared-emergency-police',
    titleEn: '119 — Police Emergency',
    titleTa: '119 — காவல் அவசரநிலை',
    bodyEn: 'Dial 119 for police emergencies. Available 24/7 across Sri Lanka. For non-emergency police matters, visit your nearest police station during office hours.',
    bodyTa: 'காவல் அவசரநிலைகளுக்கு 119 என்று டயல் செய்யுங்கள். இலங்கை முழுவதும் 24/7 கிடைக்கும்.',
    tags: ['emergency', 'police', '119', '24/7'],
    region: 'national',
    contact: {
      phone: '119',
    },
    type: 'resource',
  },
  {
    id: 'shared-emergency-fire',
    titleEn: '110 — Fire & Rescue',
    titleTa: '110 — தீ & மீட்பு',
    bodyEn: 'Dial 110 for fire and rescue services. Available 24/7.',
    bodyTa: 'தீ மற்றும் மீட்பு சேவைகளுக்கு 110 என்று டயல் செய்யுங்கள். 24/7 கிடைக்கும்.',
    tags: ['emergency', 'fire', '110', '24/7'],
    region: 'national',
    contact: {
      phone: '110',
    },
    type: 'resource',
  },
  {
    id: 'shared-emergency-women',
    titleEn: '1938 — Women & Children Helpline',
    titleTa: '1938 — பெண்கள் & குழந்தைகள் உதவி எண்',
    bodyEn: 'The National Child Protection Authority helpline for women and children experiencing domestic violence, abuse, or exploitation. Confidential. Available in Tamil, Sinhala, and English.',
    bodyTa: 'வீட்டு வன்முறை, துஷ்பிரயோகம் அல்லது சுரண்டலை அனுபவிக்கும் பெண்கள் மற்றும் குழந்தைகளுக்கான தேசிய குழந்தை பாதுகாப்பு ஆணைய உதவி எண். ரகசியமானது. தமிழ், சிங்களம், ஆங்கிலத்தில் கிடைக்கும்.',
    tags: ['emergency', 'women', 'children', 'domestic violence', '1938', 'helpline'],
    region: 'national',
    contact: {
      phone: '1938',
    },
    type: 'resource',
  },

  // === NGOS & CIVIL SOCIETY ===
  {
    id: 'shared-ngo-nafso',
    titleEn: 'NAFSO — National Fisheries Solidarity Movement',
    titleTa: 'NAFSO — தேசிய மீன்பிடி ஒற்றுமை இயக்கம்',
    bodyEn: 'Works with fishing communities across Sri Lanka on livelihoods, rights, environmental sustainability, and disaster preparedness. Active in Northern and Eastern coastal communities. Supports community organising, cooperative formation, and advocacy for fishing rights. Tamil-speaking field staff in the North and East.',
    bodyTa: 'இலங்கை முழுவதும் மீன்பிடி சமூகங்களுடன் வாழ்வாதாரம், உரிமைகள், சுற்றுச்சூழல் நிலைத்தன்மை மற்றும் பேரிடர் தயார்நிலை குறித்து பணியாற்றுகிறது. வடக்கு மற்றும் கிழக்கு கடலோர சமூகங்களில் செயலில் உள்ளது.',
    tags: ['NGO', 'fisheries', 'livelihoods', 'rights', 'coastal', 'environment'],
    region: 'national',
    contact: {
      phone: '+94 11 259 5064',
      email: 'info@nafso-online.org',
      website: 'https://nafso-online.org',
    },
    type: 'resource',
  },
  {
    id: 'shared-ngo-sarvodaya',
    titleEn: 'Sarvodaya Shramadana Movement',
    titleTa: 'சர்வோதய ஷ்ரமதான இயக்கம்',
    bodyEn: 'Sri Lanka\'s largest community development organisation, working in over 15,000 villages. Programmes include: livelihood development, microfinance (Sarvodaya Development Finance), early childhood development, peace building, disaster preparedness, and community organising. Active in the North and East with Tamil-speaking staff. Community-led approach — they work with existing community structures rather than imposing external models.',
    bodyTa: 'இலங்கையின் மிகப்பெரிய சமூக மேம்பாட்டு நிறுவனம், 15,000-க்கும் மேற்பட்ட கிராமங்களில் பணியாற்றுகிறது. திட்டங்களில் அடங்கும்: வாழ்வாதார மேம்பாடு, நுண்நிதி, ஆரம்ப குழந்தை வளர்ச்சி, சமாதான கட்டமைப்பு, பேரிடர் தயார்நிலை, சமூக ஒழுங்கமைப்பு.',
    tags: ['NGO', 'community development', 'microfinance', 'national', 'peace building'],
    region: 'national',
    contact: {
      phone: '+94 34 227 5375',
      website: 'https://sarvodaya.org',
    },
    type: 'resource',
  },
  {
    id: 'shared-ngo-zoa',
    titleEn: 'ZOA Sri Lanka',
    titleTa: 'ZOA இலங்கை',
    bodyEn: 'International NGO supporting conflict-affected communities in Sri Lanka. Focus areas: livelihood recovery, psychosocial support, peacebuilding, and community resilience. Active programmes in the Northern Province. Works in partnership with local organisations.',
    bodyTa: 'இலங்கையில் மோதலால் பாதிக்கப்பட்ட சமூகங்களை ஆதரிக்கும் சர்வதேச NGO. முக்கிய பகுதிகள்: வாழ்வாதார மீட்பு, உளவியல் சமூக ஆதரவு, சமாதான கட்டமைப்பு, சமூக நெகிழ்திறன்.',
    tags: ['NGO', 'international', 'livelihood', 'psychosocial', 'Northern Province'],
    region: 'north',
    contact: {
      website: 'https://www.zoa.ngo',
    },
    type: 'resource',
  },

  // === GOVERNMENT SERVICES ===
  {
    id: 'shared-gov-divisional',
    titleEn: 'Divisional Secretariat — Your Local Government Office',
    titleTa: 'பிரிவு செயலகம் — உங்கள் உள்ளூர் அரசு அலுவலகம்',
    bodyEn: 'The Divisional Secretariat is your main point of contact for government services. Services available: birth, death, and marriage certificates, national identity cards, Samurdhi registration, pension applications, land-related services, business registration, and social welfare programmes. Every DS division has a Grama Niladhari (village officer) who is your first contact for local issues. Find your nearest Divisional Secretariat by searching online or asking at the local post office.',
    bodyTa: 'பிரிவு செயலகம் அரசு சேவைகளுக்கான உங்கள் முக்கிய தொடர்பு புள்ளி. கிடைக்கும் சேவைகள்: பிறப்பு, இறப்பு, திருமண சான்றிதழ்கள், தேசிய அடையாள அட்டைகள், சமுர்தி பதிவு, ஓய்வூதிய விண்ணப்பங்கள், நில தொடர்பான சேவைகள், வணிக பதிவு, சமூக நலத் திட்டங்கள்.',
    tags: ['government', 'services', 'ID card', 'certificates', 'Samurdhi', 'local'],
    region: 'all',
    type: 'resource',
  },
  {
    id: 'shared-gov-legal-aid',
    titleEn: 'Legal Aid Commission — Free Legal Help',
    titleTa: 'சட்ட உதவி ஆணையம் — இலவச சட்ட உதவி',
    bodyEn: 'The Legal Aid Commission provides free legal advice and representation to people who cannot afford a lawyer. Available for: criminal cases, family disputes, land disputes, labour issues, and domestic violence. Offices in major cities including Jaffna and Batticaloa. Tamil-speaking legal officers available. To access: visit the nearest Legal Aid Commission office with your national identity card. No appointment needed for initial consultation.',
    bodyTa: 'சட்ட உதவி ஆணையம் வழக்கறிஞரை நியமிக்க இயலாத நபர்களுக்கு இலவச சட்ட ஆலோசனை மற்றும் பிரதிநிதித்துவத்தை வழங்குகிறது. கிடைக்கும்: குற்ற வழக்குகள், குடும்ப தகராறுகள், நில தகராறுகள், தொழிலாளர் பிரச்சனைகள், வீட்டு வன்முறை. யாழ்ப்பாணம் மற்றும் மட்டக்களப்பு உட்பட முக்கிய நகரங்களில் அலுவலகங்கள். தமிழ் பேசும் சட்ட அலுவலர்கள் கிடைக்கும்.',
    tags: ['legal aid', 'free', 'government', 'rights', 'court', 'family', 'land'],
    region: 'national',
    contact: {
      phone: '+94 11 232 9798',
      website: 'https://legalaid.gov.lk',
    },
    type: 'resource',
  },
];
