import { useEffect, useState } from 'react';
import { CHECK_TIMESTAMP } from '../constants';
import { ClockIcon, UserIcon } from './icons';

const INITIAL_SECONDS = 8;

function formatSeconds(seconds: number) {
  return `00:${seconds.toString().padStart(2, '0')}`;
}

export function VerificationPanel() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_SECONDS);
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) =>
        currentSeconds <= 0 ? INITIAL_SECONDS : currentSeconds - 1,
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="verification-stack">
      <p className="expiry-status" role="timer" aria-live="polite">
        Check expires in <strong>{formatSeconds(secondsRemaining)}</strong>
      </p>

      <article className="verification-card" aria-label="Age and likeness verification sample">
        <header className="verification-card-header">
          <span className="header-icon" aria-hidden="true">
            <UserIcon />
          </span>
          <p>Match the photo and expiry date to the card to verify age and likeness only</p>
        </header>

        <div className="verification-card-body">
          <div className="portrait-frame" aria-label="Sample card portrait">
            {photoFailed ? (
              <div className="portrait-placeholder">
                <span aria-hidden="true" />
                <p>Sample photo</p>
              </div>
            ) : (
              <img
                src="/assets/sample-card-photo.jpg"
                alt="Neutral sample card portrait"
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>

          <div className="result-column">
            <section className="age-panel" aria-label="Age result">
              <p>Current Age:</p>
              <strong>18+</strong>
            </section>

            <section className="check-time" aria-label="Date and time of check">
              <span className="time-icon" aria-hidden="true">
                <ClockIcon />
              </span>
              <div>
                <p>Date and time of check</p>
                <strong>{CHECK_TIMESTAMP}</strong>
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
