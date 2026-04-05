import React, { useEffect, useState } from "react";

export interface AppMenuItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

export interface GlobalMenuWidgetProps {
  /** Control open state externally, or leave unset to use internal state */
  isOpen?: boolean;
  /** Called when the panel requests to close */
  onClose?: () => void;
  /** Override the default menu items */
  menuItems?: AppMenuItem[];
  /** Panel title */
  title?: string;
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconGlobe() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function IconRent() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
    </svg>
  );
}

function IconTools() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconFinance() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M8 10h8M8 14h5" />
      <path d="M12 6v2M12 16v2" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// ── Default menu items ────────────────────────────────────────────────────────

const DEFAULT_MENU_ITEMS: AppMenuItem[] = [
  {
    id: "explore",
    title: "Explore Products",
    description: "Browse All Products On Cat.Com",
    url: "https://www.cat.com",
    icon: <IconGlobe />,
  },
  {
    id: "buy",
    title: "Buy Online",
    description: "Shop Products & More From Our Family Of Online Store",
    url: "https://shop.cat.com",
    icon: <IconCart />,
  },
  {
    id: "used",
    title: "Find Used Products",
    description: "Shop For Certified Used Products",
    url: "https://catused.cat.com",
    icon: <IconRefresh />,
  },
  {
    id: "rent",
    title: "Rent Products",
    description: "Find Rentals At Your Nearest Dealer",
    url: "https://rent.cat.com",
    icon: <IconRent />,
  },
  {
    id: "equipment",
    title: "Manage My Equipment",
    description: "Manage Your Fleet On VisionLink",
    url: "https://vl.cat.com",
    icon: <IconTools />,
  },
  {
    id: "finance",
    title: "View Finance Solutions",
    description: "Explore Financing Options On Cat Financials",
    url: "https://www.cat.com/en_US/support/finance.html",
    icon: <IconFinance />,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function GlobalMenuWidget({
  isOpen: isOpenProp,
  onClose,
  menuItems = DEFAULT_MENU_ITEMS,
  title = "Cat Applications",
}: GlobalMenuWidgetProps) {
  // Support both controlled (isOpen prop) and uncontrolled (internal state) usage
  const isControlled = isOpenProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const [visible, setVisible] = useState(false); // drives CSS transition

  const isOpen = isControlled ? isOpenProp : internalOpen;

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      // Mount first, then trigger transition next frame
      setVisible(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!isControlled) setInternalOpen(false);
    onClose?.();
  };

  // Trap keyboard Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: 10001,
    transform: isOpen && visible ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 10000,
    opacity: isOpen && visible ? 1 : 0,
    transition: "opacity 0.3s ease",
    pointerEvents: isOpen ? "auto" : "none",
  };

  if (!isOpen && !visible) return null;

  return (
    <div className="cat-widget-root" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Backdrop */}
      <div style={backdropStyle} onClick={handleClose} aria-hidden="true" />

      {/* Panel */}
      <div style={panelStyle} role="dialog" aria-modal="true" aria-label={title}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 16px",
            borderBottom: "1px solid #e5e5e5",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.2px",
            }}
          >
            {title}
          </h2>

          {/* X close button */}
          <button
            onClick={handleClose}
            aria-label="Close menu"
            style={{
              width: "36px",
              height: "36px",
              border: "1.5px solid #333",
              borderRadius: "4px",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#333",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu items — scrollable */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {menuItems.map((item, idx) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "20px",
                textDecoration: "none",
                color: "inherit",
                borderBottom: idx < menuItems.length - 1 ? "1px solid #e9e9e9" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#fafafa")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
            >
              {/* Icon */}
              <div style={{ flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>

              {/* Text */}
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "#1a1a1a",
                    marginBottom: "3px",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    lineHeight: 1.4,
                    marginBottom: "5px",
                  }}
                >
                  {item.description}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#006FD6",
                    textDecoration: "none",
                  }}
                >
                  {item.url.replace(/^https?:\/\//, "")}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer — Close button */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid #e5e5e5",
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleClose}
            style={{
              padding: "10px 24px",
              border: "1.5px solid #333",
              borderRadius: "4px",
              background: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              color: "#1a1a1a",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
