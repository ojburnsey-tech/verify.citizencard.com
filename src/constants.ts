export const NAV_LINKS = [
  'Home',
  'Your ID Card',
  'About',
  'Discounts',
  'Help',
  'Verify Card',
] as const;

export const FOOTER_LINKS = [
  'What is VerifyCard?',
  'Apply Online',
  'Discounts',
  'Login / Register',
  'Verify Card',
] as const;

export const COOKIE_STORAGE_KEY = 'verifycard-cookie-preferences';

export const CHECK_TIMESTAMP = '25 Jun 2026 14:15';

export const TOAST_MESSAGE = 'Demo action selected — no verification is performed.';

export const COOKIE_SECTIONS = {
  necessary: {
    label: 'Necessary',
    description: 'Required for core site preferences and security basics in this demo.',
  },
  functional: {
    label: 'Functional',
    description: 'Remembers interface choices that make the demo easier to use.',
  },
  analytics: {
    label: 'Analytics',
    description: 'Would help understand aggregate usage in a real service.',
  },
  advertisement: {
    label: 'Advertisement',
    description: 'Would support marketing measurement in a real service.',
  },
} as const;

export type OptionalCookieKey = 'functional' | 'analytics' | 'advertisement';

export interface CookiePreferences {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  advertisement: boolean;
}

export const NECESSARY_ONLY_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  advertisement: false,
};

export const ALL_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: true,
  advertisement: true,
};
