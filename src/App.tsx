import { useEffect, useState } from 'react';
import { ActionButtons } from './components/ActionButtons';
import { CookiePreferencesModal } from './components/CookiePreferencesModal';
import { DemoToast } from './components/DemoToast';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileNavigationDrawer } from './components/MobileNavigationDrawer';
import { VerificationPanel } from './components/VerificationPanel';
import {
  COOKIE_STORAGE_KEY,
  CookiePreferences,
  NECESSARY_ONLY_PREFERENCES,
  TOAST_MESSAGE,
} from './constants';

interface InitialCookieState {
  preferences: CookiePreferences;
  isModalOpen: boolean;
}

function readStoredCookiePreferences(): CookiePreferences | null {
  try {
    const stored = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

function writeCookiePreferences(preferences: CookiePreferences) {
  window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preferences));
}

function getInitialCookieState(): InitialCookieState {
  const storedPreferences = readStoredCookiePreferences();

  return {
    preferences: storedPreferences ?? NECESSARY_ONLY_PREFERENCES,
    isModalOpen: storedPreferences === null,
  };
}

export default function App() {
  const [initialCookieState] = useState(getInitialCookieState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(initialCookieState.isModalOpen);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    initialCookieState.preferences,
  );
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!isToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsToastVisible(false), 3600);
    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible]);

  function handleSaveCookiePreferences(preferences: CookiePreferences) {
    setCookiePreferences(preferences);
    writeCookiePreferences(preferences);
    setIsCookieModalOpen(false);
  }

  function handleDemoAction() {
    setIsToastVisible(false);
    window.setTimeout(() => setIsToastVisible(true), 20);
  }

  return (
    <>
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <MobileNavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main id="top" className="site-main">
        <section className="verification-screen" aria-labelledby="page-title">
          <div className="screen-intro">
            <p className="demo-kicker">VerifyCard browser demo</p>
            <h1 id="page-title">Sample card — for testing only</h1>
          </div>

          <VerificationPanel />
          <ActionButtons onSelect={handleDemoAction} />
        </section>
      </main>

      <Footer onCookiePreferencesClick={() => setIsCookieModalOpen(true)} />
      <DemoToast isVisible={isToastVisible} message={TOAST_MESSAGE} />
      {isCookieModalOpen ? (
        <CookiePreferencesModal preferences={cookiePreferences} onSave={handleSaveCookiePreferences} />
      ) : null}
    </>
  );
}
