/**
 * CAT Account Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-account"></div>
 *   <script src="cat-account.js"></script>
 *   <script>
 *     CATAccount.mount('#cat-account', {
 *       user: { id: '1', name: 'John Doe', email: 'john@example.com' },
 *       onLogout: () => console.log('Logged out'),
 *       onLogin: (creds) => fetch('/api/login', { method: 'POST', body: JSON.stringify(creds) })
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { AccountWidget, AccountWidgetProps } from "./AccountWidget";

type MountOptions = AccountWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATAccount] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(AccountWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(AccountWidget, newOptions));
    },
  };
}

(window as any).CATAccount = { mount };

export { mount };
