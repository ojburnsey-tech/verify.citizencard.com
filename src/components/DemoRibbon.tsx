import { DEMO_DISCLOSURE } from '../constants';

// Slim, always-visible educational disclosure that sits under the header on
// every route. Do not remove or hide it — it is part of the demo boundary.
export function DemoRibbon() {
  return (
    <div className="demo-ribbon" role="note">
      <p>{DEMO_DISCLOSURE}</p>
    </div>
  );
}
