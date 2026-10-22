import { useEffect, useRef, useState } from 'react';
import {
  ALL_COOKIE_PREFERENCES,
  COOKIE_SECTIONS,
  CookiePreferences,
  NECESSARY_ONLY_PREFERENCES,
  OptionalCookieKey,
} from '../constants';

interface CookiePreferencesModalProps {
  preferences: CookiePreferences;
  onSave: (preferences: CookiePreferences) => void;
}

const OPTIONAL_COOKIE_KEYS: OptionalCookieKey[] = ['functional', 'analytics', 'advertisement'];

export function CookiePreferencesModal({
  preferences,
  onSave,
}: CookiePreferencesModalProps) {
  const [draftPreferences, setDraftPreferences] = useState<CookiePreferences>(preferences);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.setTimeout(() => closeButtonRef.current?.focus(), 60);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onSave(NECESSARY_ONLY_PREFERENCES);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave]);

  function setOptionalPreference(key: OptionalCookieKey, value: boolean) {
    setDraftPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: value,
    }));
  }

  return (
    <div className="cookie-modal-shell">
      <div className="cookie-backdrop" aria-hidden="true" />
      <section
        className="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div className="cookie-modal-header">
          <h2 id="cookie-title">Customise Consent Preferences</h2>
          <button
            type="button"
            className="close-button dark-close"
            aria-label="Close cookie preferences"
            onClick={() => onSave(NECESSARY_ONLY_PREFERENCES)}
            ref={closeButtonRef}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="cookie-modal-body">
          <div className="preference-row">
            <div>
              <h3>{COOKIE_SECTIONS.necessary.label}</h3>
              <p>{COOKIE_SECTIONS.necessary.description}</p>
            </div>
            <strong className="always-active">Always Active</strong>
          </div>

          {OPTIONAL_COOKIE_KEYS.map((key) => (
            <label className="preference-row toggle-row" key={key}>
              <span>
                <span className="preference-title">{COOKIE_SECTIONS[key].label}</span>
                <span className="preference-description">{COOKIE_SECTIONS[key].description}</span>
              </span>
              <span className="toggle">
                <input
                  type="checkbox"
                  checked={draftPreferences[key]}
                  onChange={(event) => setOptionalPreference(key, event.currentTarget.checked)}
                />
                <span aria-hidden="true" />
              </span>
            </label>
          ))}
        </div>

        <div className="cookie-actions">
          <button type="button" className="outline-action" onClick={() => onSave(draftPreferences)}>
            Save My Preferences
          </button>
          <button type="button" className="accept-action" onClick={() => onSave(ALL_COOKIE_PREFERENCES)}>
            Accept All
          </button>
        </div>
      </section>
    </div>
  );
}
