import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionButtons } from '../components/ActionButtons';
import { Portrait } from '../components/Portrait';
import { ClockIcon, UserIcon } from '../components/icons';
import { findCardByToken } from '../data/sampleCards';
import { NotFoundPage } from './NotFoundPage';

const INITIAL_SECONDS = 8;

function formatSeconds(seconds: number) {
  return `00:${seconds.toString().padStart(2, '0')}`;
}

// Age & likeness result — the page the real QR codes open.
export function ScanResultPage() {
  const { token } = useParams();
  const card = findCardByToken(token);
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsRemaining((current) => (current <= 0 ? INITIAL_SECONDS : current - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  if (!card) {
    return <NotFoundPage />;
  }

  return (
    <section className="route-page" aria-labelledby="scan-title">
      <div className="screen-intro">
        <p className="eyebrow">Age &amp; likeness check</p>
        <h1 id="scan-title">Confirm age and likeness only</h1>
      </div>

      <div className="verification-stack">
        <p className="expiry-status" role="timer" aria-live="polite">
          Check expires in <strong>{formatSeconds(secondsRemaining)}</strong>
        </p>

        <article className="verification-card" aria-label="Age and likeness verification result">
          <header className="verification-card-header">
            <span className="header-icon" aria-hidden="true">
              <UserIcon />
            </span>
            <p>Match the photo and expiry date to the card to verify age and likeness only</p>
          </header>

          <div className="verification-card-body">
            <div className="portrait-frame" aria-label="Card portrait">
              <Portrait name={card.name} seed={card.token} />
            </div>

            <div className="result-column">
              <section className="age-panel" aria-label="Age result">
                <p>Current Age:</p>
                <strong>{card.ageBand}</strong>
                {card.turnsNextOn ? <span className="age-note">Turns {card.turnsNextOn}</span> : null}
              </section>

              <section className="check-time" aria-label="Date and time of check">
                <span className="time-icon" aria-hidden="true">
                  <ClockIcon />
                </span>
                <div>
                  <p>Date and time of check</p>
                  <strong>{card.checkTimestamp}</strong>
                </div>
              </section>
            </div>
          </div>
        </article>
      </div>

      <ActionButtons />
    </section>
  );
}
