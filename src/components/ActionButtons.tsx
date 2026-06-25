interface ActionButtonsProps {
  onSelect: () => void;
}

export function ActionButtons({ onSelect }: ActionButtonsProps) {
  return (
    <section className="follow-up-actions" aria-labelledby="actions-heading">
      <h2 id="actions-heading">Verify another card</h2>
      <div className="action-button-row">
        <button type="button" className="primary-action" onClick={onSelect}>
          Full check: enter card details
        </button>
        <button type="button" className="secondary-action" onClick={onSelect}>
          Age &amp; likeness: scan QR code
        </button>
      </div>
    </section>
  );
}
