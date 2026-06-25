import { Link } from 'react-router-dom';
import { ClockIcon, IdCardIcon, UserIcon } from '../components/icons';

// Short, original on-brand explainer reached from the form's "Service Details".
export function ServiceDetailsPage() {
  return (
    <section className="route-page service-page" aria-labelledby="service-title">
      <div className="screen-intro">
        <p className="eyebrow">About this service</p>
        <h1 id="service-title">Service details</h1>
      </div>

      <article className="info-card">
        <h2>Two ways to verify a card</h2>
        <ul className="info-list">
          <li>
            <span className="info-icon" aria-hidden="true">
              <UserIcon />
            </span>
            <div>
              <h3>Age &amp; likeness — scan a QR code</h3>
              <p>
                Scanning the QR code on a card opens a time-limited check that shows the holder’s
                age band and a portrait, so you can match the person and their age at a glance.
              </p>
            </div>
          </li>
          <li>
            <span className="info-icon" aria-hidden="true">
              <IdCardIcon />
            </span>
            <div>
              <h3>Full check — enter the card details</h3>
              <p>
                Entering the 16-digit card number, date of birth and name confirms whether a
                presented card is genuine and still valid.
              </p>
            </div>
          </li>
        </ul>
      </article>

      <article className="info-card">
        <h2>Free for retailers and organisations</h2>
        <p className="info-lead">
          <span className="info-icon inline" aria-hidden="true">
            <ClockIcon />
          </span>
          The verify service is free to use and helps confirm that a presented card is real. Checks
          are time-limited for security, so each one expires shortly after it is opened.
        </p>
      </article>

      <Link className="ghost-link" to="/">
        ← Back to verify
      </Link>
    </section>
  );
}
