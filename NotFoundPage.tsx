import { Link } from 'react-router-dom';
import { ClockIcon } from '../components/icons';

// Catch-all 404 and the expired/unknown-scan-token state.
export function NotFoundPage() {
  return (
    <section className="route-page narrow-page" aria-labelledby="expired-title">
      <article className="status-card">
        <span className="status-badge status-badge-neutral" aria-hidden="true">
          <ClockIcon />
        </span>
        <h1 id="expired-title">This check has expired or could not be found</h1>
        <p>
          Verification checks are time-limited for security. The link you opened may have already
          expired, or the check reference could not be matched.
        </p>
        <Link className="primary-action link-button" to="/">
          Verify a card
        </Link>
      </article>
    </section>
  );
}
