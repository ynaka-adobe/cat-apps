import React, { useState } from "react";

export interface OrderItem {
  name: string;
  partNumber: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
  dealer?: string;
}

export interface OrderHistoryWidgetProps {
  orders?: Order[];
  onViewOrder?: (order: Order) => void;
  onReorder?: (order: Order) => void;
  title?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-00891",
    date: "Jun 18, 2024",
    status: "Delivered",
    dealer: "Peterson (California) — San Leandro",
    trackingNumber: "1Z999AA10123456784",
    total: 1284.50,
    items: [
      { name: "Cat Engine Oil 10W-30 (Case)", partNumber: "226-1915", qty: 2, unitPrice: 89.95 },
      { name: "Cat Hydraulic Filter", partNumber: "1R-0749", qty: 4, unitPrice: 34.75 },
      { name: "Cat Fuel Filter", partNumber: "1R-0762", qty: 6, unitPrice: 22.40 },
      { name: "Cat Air Filter Primary", partNumber: "6I-2507", qty: 2, unitPrice: 112.80 },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-01042",
    date: "Jun 22, 2024",
    status: "Shipped",
    dealer: "Holt of California — Stockton",
    trackingNumber: "9400111899223397658826",
    total: 3450.00,
    items: [
      { name: "Cat Undercarriage Track Link", partNumber: "9W-8900", qty: 1, unitPrice: 2100.00 },
      { name: "Cat Track Shoe Assembly", partNumber: "7T-1798", qty: 2, unitPrice: 675.00 },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-01189",
    date: "Jun 24, 2024",
    status: "Processing",
    dealer: "Peterson (California) — Santa Rosa",
    total: 567.20,
    items: [
      { name: "Cat Alternator Belt", partNumber: "7M-7456", qty: 3, unitPrice: 48.90 },
      { name: "Cat O-Ring Kit", partNumber: "5P-8915", qty: 5, unitPrice: 18.70 },
      { name: "Cat Coolant (Gallon)", partNumber: "296-7595", qty: 8, unitPrice: 24.00 },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2024-00754",
    date: "Jun 10, 2024",
    status: "Cancelled",
    dealer: "Peterson (California) — Modesto",
    total: 229.80,
    items: [
      { name: "Cat Transmission Filter", partNumber: "1R-0658", qty: 2, unitPrice: 114.90 },
    ],
  },
];

const STATUS_STYLES: Record<Order["status"], { color: string; bg: string; label: string }> = {
  Processing: { color: "#92400E", bg: "#FEF3C7", label: "Processing" },
  Shipped:    { color: "#1D4ED8", bg: "#DBEAFE", label: "Shipped" },
  Delivered:  { color: "#166534", bg: "#DCFCE7", label: "Delivered" },
  Cancelled:  { color: "#991B1B", bg: "#FEE2E2", label: "Cancelled" },
};

const ALL_STATUSES: Array<Order["status"] | "All"> = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

function StatusBadge({ status }: { status: Order["status"] }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: 600,
        color: s.color,
        backgroundColor: s.bg,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function formatCurrency(amount: number) {
  return "$" + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function OrderHistoryWidget({
  orders,
  onViewOrder,
  onReorder,
  title = "Order History",
}: OrderHistoryWidgetProps) {
  const allOrders = orders ?? MOCK_ORDERS;
  const [filter, setFilter] = useState<Order["status"] | "All">("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === "All" ? allOrders : allOrders.filter((o) => o.status === filter);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="cat-widget-root"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "560px",
        maxWidth: "100%",
        backgroundColor: "#ffffff",
        border: "1px solid #E5E5E5",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: "#1A1A1A", padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ backgroundColor: "#FFCD11", color: "#1A1A1A", fontWeight: 900, fontSize: "14px", padding: "2px 8px" }}>
          CAT
        </div>
        <h2 style={{ margin: 0, color: "#ffffff", fontSize: "16px", fontWeight: 700 }}>{title}</h2>
        <span style={{ marginLeft: "auto", color: "#9CA3AF", fontSize: "13px" }}>
          {allOrders.length} order{allOrders.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "2px solid #E5E5E5",
          padding: "0 24px",
          overflowX: "auto",
        }}
      >
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "10px 14px",
              border: "none",
              background: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              color: filter === s ? "#1A1A1A" : "#6B6B6B",
              borderBottom: filter === s ? "2px solid #FFCD11" : "2px solid transparent",
              marginBottom: "-2px",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
            }}
          >
            {s}
            {s !== "All" && (
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "11px",
                  backgroundColor: filter === s ? "#FFCD11" : "#F3F4F6",
                  color: filter === s ? "#1A1A1A" : "#6B6B6B",
                  borderRadius: "10px",
                  padding: "1px 6px",
                  fontWeight: 700,
                }}
              >
                {allOrders.filter((o) => o.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Order list */}
      <div style={{ maxHeight: "520px", overflowY: "auto" }}>
        {filtered.length === 0 && (
          <div style={{ padding: "40px 24px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>
            No {filter.toLowerCase()} orders found.
          </div>
        )}

        {filtered.map((order, idx) => {
          const expanded = expandedId === order.id;
          return (
            <div
              key={order.id}
              style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #E5E5E5" : "none" }}
            >
              {/* Order row */}
              <div
                onClick={() => toggleExpand(order.id)}
                style={{
                  padding: "16px 24px",
                  cursor: "pointer",
                  backgroundColor: expanded ? "#FAFAFA" : "#fff",
                  transition: "background 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
                onMouseEnter={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAFB"; }}
                onMouseLeave={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.backgroundColor = "#fff"; }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "#1A1A1A" }}>
                      {order.orderNumber}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "#1A1A1A" }}>
                      {formatCurrency(order.total)}
                    </span>
                    <span style={{ color: "#6B6B6B" }}>
                      <ChevronIcon open={expanded} />
                    </span>
                  </div>
                </div>

                {/* Meta row */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", color: "#6B6B6B" }}>
                    <span style={{ fontWeight: 600 }}>Date:</span> {order.date}
                  </span>
                  {order.dealer && (
                    <span style={{ fontSize: "12px", color: "#6B6B6B" }}>
                      <span style={{ fontWeight: 600 }}>Store:</span> {order.dealer}
                    </span>
                  )}
                  <span style={{ fontSize: "12px", color: "#6B6B6B" }}>
                    <span style={{ fontWeight: 600 }}>Items:</span> {order.items.length}
                  </span>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded && (
                <div
                  style={{
                    backgroundColor: "#FAFAFA",
                    borderTop: "1px solid #E5E5E5",
                    padding: "0 24px 16px",
                  }}
                >
                  {/* Item table */}
                  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
                    <thead>
                      <tr>
                        {["Part", "Part #", "Qty", "Unit Price", "Subtotal"].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: h === "Qty" || h === "Unit Price" || h === "Subtotal" ? "right" : "left",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#6B6B6B",
                              padding: "6px 8px 6px 0",
                              borderBottom: "1px solid #E5E5E5",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i} style={{ borderBottom: i < order.items.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                          <td style={{ fontSize: "13px", color: "#1A1A1A", padding: "8px 8px 8px 0", fontWeight: 500 }}>
                            {item.name}
                          </td>
                          <td style={{ fontSize: "12px", color: "#6B6B6B", padding: "8px 8px 8px 0", fontFamily: "monospace" }}>
                            {item.partNumber}
                          </td>
                          <td style={{ fontSize: "13px", color: "#1A1A1A", padding: "8px 0", textAlign: "right" }}>
                            {item.qty}
                          </td>
                          <td style={{ fontSize: "13px", color: "#1A1A1A", padding: "8px 0 8px 12px", textAlign: "right" }}>
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td style={{ fontSize: "13px", color: "#1A1A1A", padding: "8px 0 8px 12px", textAlign: "right", fontWeight: 600 }}>
                            {formatCurrency(item.qty * item.unitPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={4} style={{ textAlign: "right", padding: "10px 12px 0 0", fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>
                          Order Total
                        </td>
                        <td style={{ textAlign: "right", padding: "10px 0 0", fontSize: "14px", fontWeight: 700, color: "#1A1A1A" }}>
                          {formatCurrency(order.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* Tracking */}
                  {order.trackingNumber && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "10px 12px",
                        backgroundColor: "#EFF6FF",
                        borderRadius: "4px",
                        fontSize: "12px",
                        color: "#1D4ED8",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <rect x="1" y="3" width="15" height="13" rx="1" />
                        <path d="M16 8h4l3 3v5h-7V8z" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      <span>
                        <span style={{ fontWeight: 700 }}>Tracking:</span> {order.trackingNumber}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                    {onViewOrder && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onViewOrder(order); }}
                        style={{
                          padding: "8px 18px",
                          backgroundColor: "#FFCD11",
                          color: "#1A1A1A",
                          border: "none",
                          borderRadius: "2px",
                          fontWeight: 700,
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        View Order
                      </button>
                    )}
                    {onReorder && order.status !== "Processing" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onReorder(order); }}
                        style={{
                          padding: "8px 18px",
                          backgroundColor: "#fff",
                          color: "#1A1A1A",
                          border: "1px solid #1A1A1A",
                          borderRadius: "2px",
                          fontWeight: 700,
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
