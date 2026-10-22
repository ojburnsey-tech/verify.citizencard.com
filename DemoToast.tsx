interface DemoToastProps {
  isVisible: boolean;
  message: string;
}

export function DemoToast({ isVisible, message }: DemoToastProps) {
  return (
    <div className={`demo-toast ${isVisible ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {isVisible ? message : ''}
    </div>
  );
}
