import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BrandWordmark } from './BrandWordmark';
import {
  ChevronDownIcon,
  CrossIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
} from './icons';
import { NAV_LINKS } from '../constants';

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOCIAL_LINKS = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'X', Icon: XIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'YouTube', Icon: YouTubeIcon },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigationDrawer({ isOpen, onClose }: MobileNavigationDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const drawer = drawerRef.current;
    const firstFocusable = drawer?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    window.setTimeout(() => firstFocusable?.focus(), 60);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !drawer) {
        return;
      }
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <div className={`drawer-shell ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <aside
        id="mobile-navigation"
        className="drawer"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!isOpen}
        role="dialog"
        ref={drawerRef}
      >
        <div className="drawer-heading">
          <Link to="/" className="brand" onClick={onClose} aria-label="CitizenCard home">
            <BrandWordmark className="brand-logo" decorative />
          </Link>
          <button type="button" className="close-button" aria-label="Close menu" onClick={onClose}>
            <CrossIcon />
          </button>
        </div>

        <div className="drawer-links">
          {NAV_LINKS.map((link) => {
            const className = `drawer-link ${link.isActive ? 'is-active' : ''}`;
            const chevron = link.hasChevron ? (
              <span className="drawer-chevron" aria-hidden="true">
                <ChevronDownIcon />
              </span>
            ) : null;
            return link.isRoute ? (
              <Link key={link.label} to={link.href} className={className} onClick={onClose}>
                <span>{link.label}</span>
                {chevron}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={className} onClick={onClose}>
                <span>{link.label}</span>
                {chevron}
              </a>
            );
          })}
        </div>

        <a className="drawer-login" href="#" onClick={onClose}>
          Login | Register
        </a>

        <div className="drawer-connect">
          <h2>Connect with us</h2>
          <div className="social-actions" aria-label="Social links">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <a key={label} href="#" aria-label={`CitizenCard on ${label}`} onClick={onClose}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
