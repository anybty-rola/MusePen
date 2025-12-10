export enum AppView {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD'
}

export enum UserGenre {
  ANCIENT_ROMANCE = 'Ancient Romance (Load Poetry DB)',
  XIANXIA = 'Xianxia/Cultivation (Load Shan Hai Jing)',
  WESTERN_FANTASY = 'Western Fantasy (Load Mythology)',
  REALISM = 'Realism (Load Sociology/Psychology)'
}

export enum AIPersona {
  CRITIC = 'Rigorous Historian (Audit Focus)',
  CREATIVE = 'Wild Creative (Brainstorm Focus)'
}

export enum FeatureType {
  NAMING = 'NAMING',
  POETRY = 'POETRY',
  AUDIT = 'AUDIT',
  TRANSLATE = 'TRANSLATE'
}

export interface Draft {
  id: string;
  type: FeatureType;
  content: string;
  timestamp: number;
  synced: boolean;
}

export interface UserProfile {
  name: string;
  email?: string;
  isLoggedIn: boolean;
  genre: UserGenre | null;
  persona: AIPersona | null;
}