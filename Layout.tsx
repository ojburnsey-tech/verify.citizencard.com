import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CookiePreferencesModal } from './CookiePreferencesModal';
import { DemoRibbon } from './DemoRibbon';
import { DemoToast } from './DemoToast';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { ScrollToTopButton } from './ScrollToTopButton';
import { DemoActionContext } from './demoActionContext';
import {
  COOKIE_STORAGE_KEY,
  CookiePreferences,
  NECESSARY_ONLY_PREFERENCES,
  TOAST_MESSAGE,
} from '../constants';

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
  // Stored in localStorage only — no real cookies or trackers are set.
  window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preferences));
}

function getInitialCookieState(): InitialCookieState {
  const storedPreferences = readStoredCookiePreferences();

  return {
    preferences: storedPreferences ?? NECESSARY_ONLY_PREFERENCES,
    isModalOpen: storedPreferences === null,
  };
}

export function Layout() {
  const location = useLocation();
  const [initialCookieState] = useState(getInitialCookieState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(initialCookieState.isModalOpen);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    initialCookieState.preferences,
  );
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Reset scroll position on every client-side navigation.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    if (!isToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsToastVisible(false), 3600);
    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible]);

  const handleCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);

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
    <DemoActionContext.Provider value={handleDemoAction}>
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <DemoRibbon />
      <MobileNavigationDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />

      <main id="top" className="site-main">
        <Outlet />
      </main>

      <Footer onCookiePreferencesClick={() => setIsCookieModalOpen(true)} />
      <ScrollToTopButton />
      <DemoToast isVisible={isToastVisible} message={TOAST_MESSAGE} />
      {isCookieModalOpen ? (
        <CookiePreferencesModal
          preferences={cookiePreferences}
          onSave={handleSaveCookiePreferences}
        />
      ) : null}
    </DemoActionContext.Provider>
  );
}
