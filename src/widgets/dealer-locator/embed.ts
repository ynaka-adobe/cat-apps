/**
 * CAT Dealer Locator Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-dealer-locator"></div>
 *   <script src="cat-dealer-locator.js"></script>
 *   <script>
 *     CATDealerLocator.mount('#cat-dealer-locator', {
 *       onDealerSelect: (dealer) => console.log('Selected', dealer),
 *       onSearch: async (query) => {
 *         const res = await fetch(`/api/dealers?q=${query}`);
 *         return res.json();
 *       }
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { DealerLocatorWidget, DealerLocatorWidgetProps } from "./DealerLocatorWidget";

type MountOptions = DealerLocatorWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATDealerLocator] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(DealerLocatorWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(DealerLocatorWidget, newOptions));
    },
  };
}

(window as any).CATDealerLocator = { mount };

export { mount };
