// The CITIZENCARD wordmark, hand-drawn as inline-SVG stroke letterforms so it
// scales cleanly and recolours via `currentColor` (white on charcoal, dark on
// light). The second "I" of cITizencard is replaced by a standing-person glyph:
// a vertical body bar in currentColor topped by a round magenta head (--pink).

const CELL_ADVANCE = 58; // condensed spacing between letter cells

// Stroke paths laid out inside a 72×100 cell (content inset to x 8..64).
const LETTER_PATHS: Record<string, string> = {
  C: 'M62 24C40 6 14 16 14 50c0 34 26 44 48 26',
  I: 'M36 10V90',
  T: 'M10 14H62M36 14V90',
  Z: 'M14 14H60L14 86H60',
  E: 'M60 14H14V86H60M14 50H52',
  N: 'M14 90V12L58 88V10',
  A: 'M12 90L36 12L60 90M21 62H51',
  R: 'M16 90V12H44C64 12 64 46 44 46H16M40 46L62 90',
  D: 'M16 12V90H40C68 90 68 12 40 12H16',
};

// The wordmark letters in order; PERSON marks the standing-person glyph.
const GLYPHS = ['C', 'I', 'T', 'PERSON', 'Z', 'E', 'N', 'C', 'A', 'R', 'D'] as const;

const VIEWBOX_WIDTH = (GLYPHS.length - 1) * CELL_ADVANCE + 72;

interface BrandWordmarkProps {
  className?: string;
  /** When true, the SVG is hidden from assistive tech (label lives on a parent). */
  decorative?: boolean;
}

export function BrandWordmark({ className, decorative = false }: BrandWordmarkProps) {
  const accessibility = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img', 'aria-label': 'CitizenCard' };

  return (
    <svg
      className={`brand-wordmark ${className ?? ''}`.trim()}
      viewBox={`0 -12 ${VIEWBOX_WIDTH} 124`}
      focusable="false"
      {...accessibility}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={13}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {GLYPHS.map((glyph, index) => {
          const x = index * CELL_ADVANCE;
          if (glyph === 'PERSON') {
            return (
              <g key="person" transform={`translate(${x} 0)`}>
                <path d="M36 40V90" strokeWidth={15} strokeLinecap="round" />
                {/* Always magenta (--pink), independent of the currentColor letters. */}
                <circle cx={36} cy={20} r={11} fill="#d84b70" stroke="none" />
              </g>
            );
          }
          return <path key={`${glyph}-${index}`} d={LETTER_PATHS[glyph]} transform={`translate(${x} 0)`} />;
        })}
      </g>
    </svg>
  );
}
