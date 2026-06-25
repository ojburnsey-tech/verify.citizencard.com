import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <a href="#top" className="brand" aria-label="VerifyCard home">
          <span className="brand-mark" aria-hidden="true">
            V
          </span>
          <span>VERIFYCARD</span>
        </a>

        <button
          type="button"
          className="icon-button menu-button"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          onClick={onMenuClick}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#top">
              {link}
            </a>
          ))}
          <a className="desktop-login" href="#top">
            Login / Register
          </a>
        </div>
      </nav>
    </header>
  );
}
