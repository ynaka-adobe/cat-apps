/**
 * CAT Header Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <header id="cat-header"></header>
 *   <script src="cat-header.js"></script>
 *   <script>
 *     CATHeader.mount('#cat-header', {
 *       storeName: 'Los Angeles Branch',
 *       cartCount: 3,
 *       onSelectStore: () => { ... },
 *       onSignIn: () => { ... },
 *       onCart: () => { ... },
 *     });
 *   </script>
 *
 * The container element should be sticky/fixed if you want the header
 * to stay at the top of the viewport while scrolling:
 *   <header id="cat-header" style="position: sticky; top: 0; z-index: 100;"></header>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { HeaderWidget, HeaderWidgetProps } from "./HeaderWidget";

type MountOptions = HeaderWidgetProps;

interface HeaderInstance {
  unmount: () => void;
  update: (options: MountOptions) => void;
}

function mount(selector: string | HTMLElement, options: MountOptions = {}): HeaderInstance | null {
  const container =
    typeof selector === "string"
      ? document.querySelector<HTMLElement>(selector)
      : selector;

  if (!container) {
    console.error(`[CATHeader] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(HeaderWidget, options));

  const instance: HeaderInstance = {
    unmount() {
      root.unmount();
    },
    update(newOptions: MountOptions) {
      root.render(React.createElement(HeaderWidget, newOptions));
    },
  };

  (window as any).CATHeader._instance = instance;
  return instance;
}

(window as any).CATHeader = { mount };

export { mount };
