import { Link } from 'react-router-dom';
import { BrandWordmark } from './BrandWordmark';
import {
  ChevronRightIcon,
  ChevronUpIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
} from './icons';
import { FOOTER_LINKS } from '../constants';

interface FooterProps {
  onCookiePreferencesClick: () => void;
}

const ENDORSEMENTS = [
  { mark: 'PASS', caption: 'Proof of Age Standards Scheme' },
  { mark: 'NPCC', caption: "Nat'l Police Chiefs' Council" },
  { mark: 'SIA', caption: 'Security Industry Authority' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'X', Icon: XIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'YouTube', Icon: YouTubeIcon },
];

export function Footer({ onCookiePreferencesClick }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section className="footer-column">
          <h2>TRUSTED ID SINCE 1999</h2>
          <p>
            The PASS hologram on each CitizenCard is endorsed by the Home Office, Police, SIA and
            retailers.
          </p>
          <div className="endorsement-badges" aria-label="Endorsement badges">
            {ENDORSEMENTS.map((badge) => (
              <span className="endorsement-badge" key={badge.mark}>
                <strong>{badge.mark}</strong>
                <span>{badge.caption}</span>
              </span>
            ))}
          </div>
        </section>

        <section className="footer-column">
          <h2>CONTACT US</h2>
          <address>
            CitizenCard Demo (placeholder)
            <br />
            123 Example Street
            <br />
            London EC1A 0AA
            <br />
            <a href="mailto:demo@example.invalid">demo@example.invalid</a>
          </address>
          <p className="follow-label">Follow us:</p>
          <div className="social-actions" aria-label="Social links">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <a key={label} href="#" aria-label={`CitizenCard on ${label}`}>
                <Icon />
              </a>
            ))}
          </div>
        </section>

        <section className="footer-column">
          <h2>QUICK LINKS</h2>
          <ul className="quick-links">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link to={link.href}>
                    <span className="quick-link-chevron" aria-hidden="true">
                      <ChevronRightIcon />
                    </span>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href}>
                    <span className="quick-link-chevron" aria-hidden="true">
                      <ChevronRightIcon />
                    </span>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 CitizenCard</p>
        <button type="button" onClick={onCookiePreferencesClick}>
          Cookie &amp; Privacy Policy
        </button>
        <a href="#">Terms &amp; Conditions</a>
        <BrandWordmark className="footer-wordmark" decorative />
        <a className="footer-scroll-top" href="#top" aria-label="Scroll back to top">
          <ChevronUpIcon />
        </a>
      </div>
    </footer>
  );
}
