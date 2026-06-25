import { useNavigate } from 'react-router-dom';
import { useDemoAction } from './demoActionContext';

// Shared "verify another card" actions on the scan and result pages.
export function ActionButtons() {
  const navigate = useNavigate();
  const triggerDemoAction = useDemoAction();

  return (
    <section className="follow-up-actions" aria-labelledby="actions-heading">
      <h2 id="actions-heading">Verify another card</h2>
      <div className="action-button-row">
        <button type="button" className="primary-action" onClick={() => navigate('/')}>
          Full check: enter card details
        </button>
        <button type="button" className="secondary-action" onClick={triggerDemoAction}>
          Age &amp; likeness: scan QR code
        </button>
      </div>
    </section>
  );
}
