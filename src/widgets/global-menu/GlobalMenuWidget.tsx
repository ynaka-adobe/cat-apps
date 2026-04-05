import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface GlobalMenuWidgetProps {
  logo?: string;
  appName?: string;
  navItems?: NavItem[];
  onNavigate?: (href: string) => void;
  locale?: string;
}

const defaultNavItems: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Excavators", href: "/products/excavators" },
      { label: "Wheel Loaders", href: "/products/wheel-loaders" },
      { label: "Track-Type Tractors", href: "/products/tractors" },
      { label: "Motor Graders", href: "/products/graders" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Cat Financial", href: "/services/financial" },
      { label: "Cat Inspect", href: "/services/inspect" },
      { label: "Parts & Service", href: "/services/parts" },
    ],
  },
  { label: "Dealer Locator", href: "/dealers" },
  { label: "Support", href: "/support" },
];

export function GlobalMenuWidget({
  appName = "CAT",
  navItems = defaultNavItems,
  onNavigate,
}: GlobalMenuWidgetProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (e: React.MouseEvent, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div className="cat-widget-root" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <nav
        style={{
          backgroundColor: "#1A1A1A",
          color: "#ffffff",
          position: "relative",
          zIndex: 1000,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNav(e, "/")}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <div
              style={{
                backgroundColor: "#FFCD11",
                color: "#1A1A1A",
                fontWeight: 900,
                fontSize: "20px",
                padding: "4px 10px",
                letterSpacing: "-0.5px",
              }}
            >
              CAT
            </div>
            {appName !== "CAT" && (
              <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "14px" }}>
                {appName}
              </span>
            )}
          </a>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navItems.map((item) => (
              <div key={item.label} style={{ position: "relative" }}>
                <button
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onClick={(e) => {
                    if (!item.children) handleNav(e, item.href);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: openDropdown === item.label ? "#FFCD11" : "#ffffff",
                    fontWeight: 500,
                    fontSize: "14px",
                    padding: "8px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.15s",
                  }}
                >
                  {item.label}
                  {item.children && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </button>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "#2D2D2D",
                      minWidth: "200px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      borderTop: "2px solid #FFCD11",
                    }}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={(e) => handleNav(e, child.href)}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontSize: "13px",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#FFCD11";
                          (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "#ffffff";
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                padding: "8px",
              }}
              title="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                padding: "8px",
                display: "none",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Yellow accent bar */}
        <div style={{ height: "3px", backgroundColor: "#FFCD11" }} />
      </nav>
    </div>
  );
}
