/**
 * CAT Select Store Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-select-store"></div>
 *   <script src="cat-select-store.js"></script>
 *   <script>
 *     CATSelectStore.mount('#cat-select-store', {
 *       initialQuery: 'San Francisco, CA',
 *       onStoreSelect: (store) => console.log('Selected', store),
 *       onClose: () => { document.getElementById('cat-select-store').style.display = 'none'; }
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { SelectStoreWidget, SelectStoreWidgetProps } from "./SelectStoreWidget";

type MountOptions = SelectStoreWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATSelectStore] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(SelectStoreWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(SelectStoreWidget, newOptions));
    },
  };
}

(window as any).CATSelectStore = { mount };

export { mount };
