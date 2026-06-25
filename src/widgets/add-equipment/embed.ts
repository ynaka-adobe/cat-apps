/**
 * CAT Add Equipment Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-add-equipment"></div>
 *   <script src="cat-add-equipment.js"></script>
 *   <script>
 *     CATAddEquipment.mount('#cat-add-equipment', {
 *       onAdd:    (equipment) => console.log('Added', equipment),
 *       onCancel: () => document.getElementById('cat-add-equipment').style.display = 'none',
 *       onClose:  () => document.getElementById('cat-add-equipment').style.display = 'none'
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { AddEquipmentWidget, AddEquipmentWidgetProps } from "./AddEquipmentWidget";

type MountOptions = AddEquipmentWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATAddEquipment] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(AddEquipmentWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(AddEquipmentWidget, newOptions));
    },
  };
}

(window as any).CATAddEquipment = { mount };

export { mount };
