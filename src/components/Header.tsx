import { Link } from 'react-router-dom';
import { BrandWordmark } from './BrandWordmark';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="site-header">
      <nav className="header-inner" aria-label="Primary navigation">
        <Link to="/" className="brand" aria-label="CitizenCard home">
          <BrandWordmark className="brand-logo" decorative />
        </Link>

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
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className={`desktop-nav-link ${link.isActive ? 'is-active' : ''}`}
                aria-current={link.isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.label} className="desktop-nav-link" href={link.href}>
                {link.label}
              </a>
            ),
          )}
          <a className="desktop-login" href="#">
            Login | Register
          </a>
        </div>
      </nav>
    </header>
  );
}
