import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IdCardIcon } from '../components/icons';
import { CARD_PREFIX, matchCardDetails } from '../data/sampleCards';

const MONTHS = [
  { value: 'Jan', label: 'January' },
  { value: 'Feb', label: 'February' },
  { value: 'Mar', label: 'March' },
  { value: 'Apr', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'June' },
  { value: 'Jul', label: 'July' },
  { value: 'Aug', label: 'August' },
  { value: 'Sep', label: 'September' },
  { value: 'Oct', label: 'October' },
  { value: 'Nov', label: 'November' },
  { value: 'Dec', label: 'December' },
];

const DAYS = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1920 + 1 }, (_, index) =>
  String(CURRENT_YEAR - index),
);

// Verify form — primary entry. All logic is client-side mock matching; there is
// no HTML form submit/reload, no backend, and no real verification.
export function VerifyFormPage() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState(`${CARD_PREFIX} `);
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('Jan');
  const [year, setYear] = useState('1920');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleVerify() {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length !== 16) {
      setError('Enter all 16 digits of the card number (the first 4 are prefilled).');
      return;
    }
    if (name.trim() === '') {
      setError('Enter the full name printed on the front of the card.');
      return;
    }
    setError('');

    const match = matchCardDetails({ cardNumber, dob: { d: day, m: month, y: year }, name });
    navigate(`/verify/result/${match ? match.token : 'none'}`);
  }

  return (
    <section className="route-page verify-page" aria-labelledby="verify-title">
      <div className="screen-intro">
        <p className="eyebrow">Free card verification</p>
        <h1 id="verify-title">Check a CitizenCard is genuine</h1>
      </div>

      <div className="verify-card">
        <header className="verify-card-header">
          <span className="header-icon" aria-hidden="true">
            <IdCardIcon />
          </span>
          <h2>Verify a CitizenCard</h2>
        </header>

        <div className="verify-card-body">
          <div className="field">
            <label htmlFor="card-number">Card Number</label>
            <input
              id="card-number"
              className="text-input"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.currentTarget.value)}
            />
            <p className="field-help">
              Enter the 16 digit card no from the front of the card (first 4 digits are prefilled)
            </p>
          </div>

          <div className="field">
            <span className="field-label" id="dob-label">
              Date of Birth
            </span>
            <div className="dob-row" role="group" aria-labelledby="dob-label">
              <select
                className="select-input"
                aria-label="Day of birth"
                value={day}
                onChange={(event) => setDay(event.currentTarget.value)}
              >
                {DAYS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                className="select-input"
                aria-label="Month of birth"
                value={month}
                onChange={(event) => setMonth(event.currentTarget.value)}
              >
                {MONTHS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                className="select-input"
                aria-label="Year of birth"
                value={year}
                onChange={(event) => setYear(event.currentTarget.value)}
              >
                {YEARS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="card-name">Name</label>
            <input
              id="card-name"
              className="text-input"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
            <p className="field-help">Enter the full name printed on the front of the card</p>
          </div>

          {error ? (
            <p className="field-error" role="alert">
              {error}
            </p>
          ) : null}

          <button type="button" className="primary-action verify-submit" onClick={handleVerify}>
            Verify
          </button>

          {/* Static notice only — no real reCAPTCHA is loaded or executed. */}
          <p className="recaptcha-notice">
            This page is protected by Google reCAPTCHA - <a href="#">Privacy Policy</a> and{' '}
            <a href="#">Terms of Service</a> apply.
          </p>
        </div>
      </div>

      <Link className="ghost-link" to="/service-details">
        ← Service Details
      </Link>
    </section>
  );
}
