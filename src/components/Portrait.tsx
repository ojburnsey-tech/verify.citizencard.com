import { useState } from 'react';

// Neutral head-and-shoulders silhouettes are generated in-app — no real faces,
// no external image requests, no placeholder services. A soft background tint is
// derived deterministically from the card token so each card looks distinct.
//
// The reusable onError fallback pattern is preserved: pass `photoSrc` for a
// same-origin image and the silhouette renders if it fails to load. None of the
// sample cards supply a photo, so the silhouette is shown with zero network use.

interface PortraitProps {
  /** Used to pick a stable tint and for the accessible label. */
  name: string;
  seed: string;
  /** Optional same-origin image; falls back to the silhouette on error. */
  photoSrc?: string;
}

const TINTS = [
  { bg: '#e8eef6', figure: '#b3c4da' },
  { bg: '#eef0f7', figure: '#c1c6df' },
  { bg: '#eaf4ef', figure: '#b2d2c4' },
  { bg: '#f6eef0', figure: '#dabdc6' },
];

function pickTint(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return TINTS[hash % TINTS.length];
}

export function Portrait({ name, seed, photoSrc }: PortraitProps) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const tint = pickTint(seed);

  if (photoSrc && !photoFailed) {
    return (
      <img
        className="portrait-image"
        src={photoSrc}
        alt={`Card portrait for ${name}`}
        onError={() => setPhotoFailed(true)}
      />
    );
  }

  return (
    <svg
      className="portrait-silhouette"
      viewBox="0 0 200 230"
      role="img"
      aria-label={`Neutral silhouette placeholder for ${name}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="230" fill={tint.bg} />
      <circle cx="100" cy="84" r="38" fill={tint.figure} />
      <path d="M30 230c0-42 30-70 70-70s70 28 70 70Z" fill={tint.figure} />
    </svg>
  );
}
