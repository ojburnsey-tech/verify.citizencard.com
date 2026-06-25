export interface NavItem {
  /** Readable label; displayed uppercased via CSS. */
  label: string;
  /** Internal route path, or '#' for a placeholder destination. */
  href: string;
  /** True when href is a client-side route handled by react-router. */
  isRoute?: boolean;
  /** Drawer items that show an expand chevron in the real app. */
  hasChevron?: boolean;
  /** The currently-active nav item (Verify Card) — highlighted in blue. */
  isActive?: boolean;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Your ID Card', href: '#', hasChevron: true },
  { label: 'About', href: '#', hasChevron: true },
  { label: 'Discounts', href: '#' },
  { label: 'Help', href: '#', hasChevron: true },
  { label: 'Verify Card', href: '/', isRoute: true, hasChevron: true, isActive: true },
];

export interface FooterLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'What is a CitizenCard?', href: '#' },
  { label: 'Apply Online', href: '#' },
  { label: 'SimpleSavings Discounts', href: '#' },
  { label: 'Login | Register', href: '#' },
  { label: 'Verify Card', href: '/', isRoute: true },
];

export const COOKIE_STORAGE_KEY = 'citizencard-demo-cookie-preferences';

export const TOAST_MESSAGE = 'Demonstration only — no real scanning is performed.';

// Persistent, always-visible educational disclosure. Mirrored in the ribbon,
// the page <meta name="description">, the README and the web manifest.
export const DEMO_DISCLOSURE =
  'Demonstration — educational clone. Not affiliated with or endorsed by CitizenCard. No real verification is performed.';

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
