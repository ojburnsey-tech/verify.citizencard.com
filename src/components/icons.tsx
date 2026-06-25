// All icons are inline SVG so they recolour via currentColor and need no network
// requests. Stroke icons inherit width/colour from .icon-stroke rules in styles.css.

export function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 12.25a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z" />
      <path d="M4.75 20.25a7.25 7.25 0 0 1 14.5 0" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.75v4.6l3.25 2" />
    </svg>
  );
}

export function IdCardIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="3" y="5.25" width="18" height="13.5" rx="2.25" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.75 16.25a3 3 0 0 1 5.5 0" />
      <path d="M14.25 10h4.5M14.25 13h4.5" />
    </svg>
  );
}

export function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5.5 9.5 12 16l6.5-6.5" />
    </svg>
  );
}

export function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5.5 14.5 12 8l6.5 6.5" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
}

export function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M7 7l10 10M17 7 7 17" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M14.5 8.5h2V5.6c-.35-.05-1.18-.15-2.13-.15-2.1 0-3.55 1.3-3.55 3.68V11H8.2v3.1h2.62V22h3.2v-7.9h2.52l.4-3.1h-2.92V9.36c0-.62.17-.86.86-.86Z" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4 4h3.6l4.1 5.6L16.6 4H20l-6.4 8 6.7 8h-3.6l-4.5-6.1L7.1 20H4l6.7-8.3L4 4Z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
