import { NAV_LINKS } from '../constants';

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigationDrawer({ isOpen, onClose }: MobileNavigationDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer-shell is-open">
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close navigation menu"
        onClick={onClose}
      />
      <aside
        id="mobile-navigation"
        className="drawer"
        aria-label="Mobile navigation"
        aria-modal="true"
        role="dialog"
      >
        <div className="drawer-heading">
          <a href="#top" className="brand" onClick={onClose}>
            <span className="brand-mark" aria-hidden="true">
              V
            </span>
            <span>VERIFYCARD</span>
          </a>
          <button type="button" className="close-button" aria-label="Close menu" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="drawer-links">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#top" onClick={onClose}>
              {link}
            </a>
          ))}
        </div>

        <a className="drawer-login" href="#top" onClick={onClose}>
          Login / Register
        </a>
      </aside>
    </div>
  );
}
