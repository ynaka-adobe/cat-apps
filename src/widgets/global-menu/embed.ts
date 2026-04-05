/**
 * CAT Global Menu Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-global-menu"></div>
 *   <script src="cat-global-menu.js"></script>
 *   <script>
 *     CATGlobalMenu.mount('#cat-global-menu', {
 *       appName: 'My App',
 *       onNavigate: (href) => console.log('Navigate to', href)
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { GlobalMenuWidget, GlobalMenuWidgetProps } from "./GlobalMenuWidget";

type MountOptions = GlobalMenuWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATGlobalMenu] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(GlobalMenuWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(GlobalMenuWidget, newOptions));
    },
  };
}

(window as any).CATGlobalMenu = { mount };

export { mount };
