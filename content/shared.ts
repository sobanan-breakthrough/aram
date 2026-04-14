import type { ContentItem } from '@/lib/types';

export const sharedContent: ContentItem[] = [
  {
    id: 'shared-1',
    titleEn: 'NAFSO — National Fisheries Solidarity Movement',
    titleTa: 'NAFSO — தேசிய மீன்பிடி ஒற்றுமை இயக்கம்',
    bodyEn: 'NAFSO works with fishing communities across Sri Lanka on livelihoods, rights, and environmental sustainability. They support community organising and advocacy in the North and East.',
    bodyTa: 'NAFSO இலங்கை முழுவதும் மீன்பிடி சமூகங்களுடன் வாழ்வாதாரம், உரிமைகள் மற்றும் சுற்றுச்சூழல் நிலைத்தன்மை குறித்து பணியாற்றுகிறது. வடக்கு மற்றும் கிழக்கில் சமூக ஒழுங்கமைப்பு மற்றும் வாதாடலை ஆதரிக்கிறார்கள்.',
    tags: ['NGO', 'fisheries', 'livelihoods', 'rights'],
    region: 'national',
    contact: {
      phone: '+94 11 259 5064',
      email: 'info@nafso-online.org',
      website: 'https://nafso-online.org',
    },
    type: 'resource',
  },
  {
    id: 'shared-2',
    titleEn: 'Sarvodaya Shramadana Movement',
    titleTa: 'சர்வோதய ஷ்ரமதான இயக்கம்',
    bodyEn: 'Sarvodaya is one of Sri Lanka\'s largest community development organisations. They work in over 15,000 villages providing livelihood support, early childhood development, microfinance, and peace-building programmes. Services available in Tamil.',
    bodyTa: 'சர்வோதய இலங்கையின் மிகப்பெரிய சமூக மேம்பாட்டு நிறுவனங்களில் ஒன்று. 15,000-க்கும் மேற்பட்ட கிராமங்களில் வாழ்வாதார ஆதரவு, ஆரம்ப குழந்தை வளர்ச்சி, நுண்நிதி மற்றும் சமாதான கட்டமைப்பு திட்டங்களை வழங்குகிறது.',
    tags: ['NGO', 'community development', 'national'],
    region: 'national',
    contact: {
      phone: '+94 34 227 5375',
      website: 'https://sarvodaya.org',
    },
    type: 'resource',
  },
  {
    id: 'shared-3',
    titleEn: '1990 Suwa Seriya — Emergency Ambulance',
    titleTa: '1990 சுவ சேரிய — அவசர ஆம்புலன்ஸ்',
    bodyEn: 'Dial 1990 for the free national emergency ambulance service. Available across Sri Lanka including the Northern and Eastern Provinces. Ambulances are equipped with basic life support. No cost to the patient.',
    bodyTa: 'இலவச தேசிய அவசர ஆம்புலன்ஸ் சேவைக்கு 1990 என்ற எண்ணை அழையுங்கள். வடக்கு மற்றும் கிழக்கு மாகாணங்கள் உட்பட இலங்கை முழுவதும் கிடைக்கும். ஆம்புலன்ஸ்கள் அடிப்படை உயிர் ஆதரவுடன் பொருத்தப்பட்டுள்ளன. நோயாளிக்கு கட்டணம் இல்லை.',
    tags: ['emergency', 'ambulance', '24/7'],
    region: 'national',
    contact: {
      phone: '1990',
    },
    type: 'resource',
  },
];
