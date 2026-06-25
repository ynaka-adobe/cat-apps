/**
 * CAT Service Information System (SIS) Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-sis"></div>
 *   <script src="cat-sis.js"></script>
 *   <script>
 *     CATSIS.mount('#cat-sis', {
 *       onSignIn:   () => window.location.href = '/sign-in',
 *       onRegister: () => window.location.href = '/register',
 *       onClose:    () => document.getElementById('cat-sis').style.display = 'none'
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { SISWidget, SISWidgetProps } from "./SISWidget";

type MountOptions = SISWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATSIS] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(SISWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(SISWidget, newOptions));
    },
  };
}

(window as any).CATSIS = { mount };

export { mount };
