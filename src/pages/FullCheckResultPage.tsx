import { Link, useParams } from 'react-router-dom';
import { ActionButtons } from '../components/ActionButtons';
import { Portrait } from '../components/Portrait';
import { CheckIcon, CrossIcon } from '../components/icons';
import { findCardByToken, maskCardNumber } from '../data/sampleCards';

// Post-form result. A matching token shows the "this card is valid" screen;
// /verify/result/none (or any unknown token) shows the could-not-verify state.
export function FullCheckResultPage() {
  const { token } = useParams();
  const card = findCardByToken(token);

  if (!card) {
    return (
      <section className="route-page narrow-page" aria-labelledby="invalid-title">
        <article className="status-card">
          <span className="status-badge status-badge-invalid" aria-hidden="true">
            <CrossIcon />
          </span>
          <h1 id="invalid-title">We could not verify this card</h1>
          <p>
            The details entered did not match a valid CitizenCard. Check the 16-digit card number,
            the date of birth and the name exactly as printed on the front of the card, then try
            again.
          </p>
          <Link className="primary-action link-button" to="/">
            Back to verify
          </Link>
        </article>
      </section>
    );
  }

  return (
    <section className="route-page" aria-labelledby="valid-title">
      <article className="status-card valid-card">
        <span className="status-badge status-badge-valid" aria-hidden="true">
          <CheckIcon />
        </span>
        <h1 id="valid-title">This card is valid</h1>

        <div className="result-identity">
          <div className="result-portrait" aria-label="Card portrait">
            <Portrait name={card.name} seed={card.token} />
          </div>
          <dl className="result-details">
            <div>
              <dt>Name</dt>
              <dd>{card.name}</dd>
            </div>
            <div>
              <dt>Current age</dt>
              <dd>
                {card.ageBand}
                {card.turnsNextOn ? <span className="age-note"> — turns {card.turnsNextOn}</span> : null}
              </dd>
            </div>
            <div>
              <dt>Expires on</dt>
              <dd>{card.expiresOn}</dd>
            </div>
            <div>
              <dt>Card number</dt>
              <dd className="masked-number">{maskCardNumber(card.cardNumber)}</dd>
            </div>
            <div>
              <dt>Date and time of check</dt>
              <dd>{card.checkTimestamp}</dd>
            </div>
          </dl>
        </div>
      </article>

      <ActionButtons />
    </section>
  );
}
