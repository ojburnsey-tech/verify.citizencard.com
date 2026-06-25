import { createContext, useContext } from 'react';

// Lets deep components (e.g. ActionButtons on result pages) trigger the shared
// demo toast that lives in the Layout, without prop-drilling through routes.
export const DemoActionContext = createContext<() => void>(() => {});

export function useDemoAction(): () => void {
  return useContext(DemoActionContext);
}
