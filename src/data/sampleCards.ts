// Mock dataset for the demonstration clone. These are illustrative demo records
// only — no real verification is performed and no data leaves the browser.

export type AgeBand = '18+' | '16-17' | '13-15' | 'Under 13';

export interface SampleCard {
  token: string; // maps the /verify/scan/:token and /verify/result/:token routes
  cardNumber: string; // 16 digits, "5843 2166 ...."
  dob: { d: string; m: string; y: string };
  name: string;
  ageBand: AgeBand;
  expiresOn: string; // e.g. "30 Apr 2028"
  turnsNextOn?: string; // for under-18 bands, e.g. "18 on 15 Feb 2027"
  checkTimestamp: string; // date and time the demo "check" was performed
  isValid: boolean;
}

// The fixed issuer prefix shown on every card (and prefilled in the form).
export const CARD_PREFIX = '5843';

export const SAMPLE_CARDS: SampleCard[] = [
  {
    token: '019eff34-bbf0-789b-bcb2-45ba4b7d4acb',
    cardNumber: '5843 2166 1964 2184',
    dob: { d: '09', m: 'Nov', y: '2002' },
    name: 'Angela Greene',
    ageBand: '18+',
    expiresOn: '30 Apr 2028',
    checkTimestamp: '25 Jun 2026 14:15',
    isValid: true,
  },
  {
    token: 'b1f3c2a4-6d5e-4f70-8a91-2c3d4e5f6a7b',
    cardNumber: '5843 2166 1955 9108',
    dob: { d: '15', m: 'Feb', y: '2009' },
    name: 'Mary Anne Baptiste',
    ageBand: '16-17',
    expiresOn: '30 Apr 2028',
    turnsNextOn: '18 on 15 Feb 2027',
    checkTimestamp: '25 Jun 2026 14:15',
    isValid: true,
  },
  {
    token: 'c2a4b1f3-7e6d-4a80-9b12-3d4e5f6a7b8c',
    cardNumber: '5843 2166 1964 4815',
    dob: { d: '19', m: 'Oct', y: '2011' },
    name: 'Amy Grant',
    ageBand: '13-15',
    expiresOn: '30 Apr 2028',
    turnsNextOn: '16 on 19 Oct 2027',
    checkTimestamp: '25 Jun 2026 14:15',
    isValid: true,
  },
  {
    token: 'd3b5c2a4-8f7e-4b90-ac23-4e5f6a7b8c9d',
    cardNumber: '5843 2166 1955 9105',
    dob: { d: '22', m: 'Jan', y: '2015' },
    name: 'Peter Carter',
    ageBand: 'Under 13',
    expiresOn: '31 Mar 2028',
    turnsNextOn: '13 on 22 Jan 2028',
    checkTimestamp: '25 Jun 2026 14:15',
    isValid: true,
  },
];

const normaliseDigits = (value: string) => value.replace(/\D/g, '');

/** Look up a card by its scan/result token. */
export function findCardByToken(token: string | undefined): SampleCard | undefined {
  if (!token) {
    return undefined;
  }
  return SAMPLE_CARDS.find((card) => card.token === token.toLowerCase());
}

/**
 * Mock match used by the verify form. Compares the entered 16-digit card number,
 * the chosen date of birth and the printed name against the sample dataset.
 * Returns the matched card, or undefined when nothing matches. Purely client-side.
 */
export function matchCardDetails(input: {
  cardNumber: string;
  dob: { d: string; m: string; y: string };
  name: string;
}): SampleCard | undefined {
  const enteredDigits = normaliseDigits(input.cardNumber);
  const enteredName = input.name.trim().toLowerCase();

  return SAMPLE_CARDS.find((card) => {
    const cardDigits = normaliseDigits(card.cardNumber);
    const dobMatches =
      card.dob.d === input.dob.d && card.dob.m === input.dob.m && card.dob.y === input.dob.y;
    return (
      cardDigits === enteredDigits &&
      dobMatches &&
      card.name.toLowerCase() === enteredName
    );
  });
}

/** Mask a card number so only the final four digits are visible. */
export function maskCardNumber(cardNumber: string): string {
  const digits = normaliseDigits(cardNumber);
  const lastFour = digits.slice(-4);
  return `•••• •••• •••• ${lastFour}`;
}
