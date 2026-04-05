/**
 * CAT Global Menu Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <script src="cat-global-menu.js"></script>
 *   <script>
 *     // Mount once (hidden by default)
 *     var menu = CATGlobalMenu.mount({
 *       onClose: () => console.log('closed'),
 *     });
 *
 *     // Open from any button/event on the host page
 *     document.getElementById('my-menu-btn').addEventListener('click', () => menu.open());
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { GlobalMenuWidget, GlobalMenuWidgetProps } from "./GlobalMenuWidget";

interface MountOptions extends Omit<GlobalMenuWidgetProps, "isOpen" | "onClose"> {
  onClose?: () => void;
}

interface MenuInstance {
  open: () => void;
  close: () => void;
  toggle: () => void;
  unmount: () => void;
}

function mount(options: MountOptions = {}): MenuInstance {
  // Create a dedicated container at the body level so z-index and fixed
  // positioning are never clipped by a parent with overflow:hidden or transform.
  const container = document.createElement("div");
  container.id = "cat-global-menu-root";
  document.body.appendChild(container);

  let isOpen = false;
  const root = createRoot(container);

  function render() {
    root.render(
      React.createElement(GlobalMenuWidget, {
        ...options,
        isOpen,
        onClose: () => {
          isOpen = false;
          render();
          options.onClose?.();
        },
      })
    );
  }

  render();

  const instance: MenuInstance = {
    open() {
      isOpen = true;
      render();
    },
    close() {
      isOpen = false;
      render();
    },
    toggle() {
      isOpen = !isOpen;
      render();
    },
    unmount() {
      root.unmount();
      container.remove();
    },
  };

  (window as any).CATGlobalMenu._instance = instance;
  return instance;
}

(window as any).CATGlobalMenu = { mount };

export { mount };
