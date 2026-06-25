/**
 * CAT Order History Widget — Embed Entry Point
 *
 * Usage on any HTML page:
 *   <div id="cat-order-history"></div>
 *   <script src="cat-order-history.js"></script>
 *   <script>
 *     CATOrderHistory.mount('#cat-order-history', {
 *       orders: myOrders,
 *       onViewOrder: (order) => window.location.href = '/orders/' + order.id,
 *       onReorder:   (order) => console.log('Reorder', order)
 *     });
 *   </script>
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { OrderHistoryWidget, OrderHistoryWidgetProps } from "./OrderHistoryWidget";

type MountOptions = OrderHistoryWidgetProps;

function mount(selector: string | HTMLElement, options: MountOptions = {}) {
  const container =
    typeof selector === "string" ? document.querySelector(selector) : selector;

  if (!container) {
    console.error(`[CATOrderHistory] Element not found: ${selector}`);
    return null;
  }

  const root = createRoot(container);
  root.render(React.createElement(OrderHistoryWidget, options));

  return {
    unmount: () => root.unmount(),
    update: (newOptions: MountOptions) => {
      root.render(React.createElement(OrderHistoryWidget, newOptions));
    },
  };
}

(window as any).CATOrderHistory = { mount };

export { mount };
