import { FOOTER_LINKS } from '../constants';

interface FooterProps {
  onCookiePreferencesClick: () => void;
}

export function Footer({ onCookiePreferencesClick }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section className="footer-column">
          <h2>TRUSTED ID SINCE 1999</h2>
          <p>
            VerifyCard is a fictional demonstration verification platform for testing responsive
            interface flows only.
          </p>
          <div className="trust-badges" aria-label="Demo trust badges">
            <span>Demo only</span>
            <span>No data capture</span>
          </div>
        </section>

        <section className="footer-column">
          <h2>CONTACT US</h2>
          <address>
            VerifyCard House
            <br />
            24 Bridge Lane
            <br />
            London EC1A 8VC
            <br />
            <a href="mailto:hello@verifycard.example">hello@verifycard.example</a>
          </address>
          <div className="social-actions" aria-label="Social links">
            <a href="#top" aria-label="VerifyCard on LinkedIn">
              in
            </a>
            <a href="#top" aria-label="VerifyCard on X">
              X
            </a>
            <a href="#top" aria-label="VerifyCard updates">
              @
            </a>
          </div>
        </section>

        <section className="footer-column">
          <h2>QUICK LINKS</h2>
          <ul>
            {FOOTER_LINKS.map((link) => (
              <li key={link}>
                <a href="#top">{link}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 VerifyCard</p>
        <button type="button" onClick={onCookiePreferencesClick}>
          Cookie &amp; Privacy Policy
        </button>
        <a href="#top">Terms &amp; Conditions</a>
        <strong>VERIFYCARD</strong>
      </div>
    </footer>
  );
}
