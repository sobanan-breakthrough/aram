export interface ContentItem {
  id: string;
  titleEn: string;
  titleTa: string;
  bodyEn: string;
  bodyTa: string;
  tags: string[];
  region?: 'north' | 'east' | 'national' | 'diaspora' | 'all';
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  type: 'resource' | 'guide' | 'pathway' | 'story' | 'explainer';
  trainerResource?: boolean;
}

export interface PathwayItem {
  id: string;
  titleEn: string;
  titleTa: string;
  icon: string;
  timeToIncomeEn: string;
  timeToIncomeTa: string;
  skillLevelEn: string;
  skillLevelTa: string;
  descriptionEn: string;
  descriptionTa: string;
  stepsEn: string[];
  stepsTa: string[];
  risksEn: string[];
  risksTa: string[];
  resourcesEn: string[];
  resourcesTa: string[];
  resourceLinks?: string[];
}

export type Pillar = 'wellbeing' | 'send' | 'health' | 'technology' | 'community' | 'education' | 'diaspora';
