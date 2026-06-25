import React, { useEffect, useRef, useState } from "react";

const C = {
  black: "#1A1A1A",
  yellow: "#FFCD11",
  white: "#FFFFFF",
  gray: "#888888",
  border: "#2D2D2D",
} as const;

const AEM = "https://main--parts-cat--ynaka-adobe.aem.live";

export interface NavCategory {
  label: string;
  href: string;
  imageUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
  target?: string;
}

export interface HeaderWidgetProps {
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
  seeAllCategoriesHref?: string;
  categories?: NavCategory[];
  middleLinks?: NavLink[];
  storeName?: string;
  isSignedIn?: boolean;
  userName?: string;
  cartCount?: number;
  onSelectStore?: () => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onCart?: () => void;
}

const DEFAULT_LOGO_SRC = `${AEM}/media_1b96fb15b98e8957ce0c6c952dabbeac57922c2b7.png?width=232&format=png&optimize=medium`;

const DEFAULT_CATEGORIES: NavCategory[] = [
  { label: "Attachments", href: "/en/catcorp/category/shop-by-attachment", imageUrl: `${AEM}/en/media_129a0259769b733d478d60523606fc34888a8387f.png?width=96&format=png&optimize=medium` },
  { label: "Cabs", href: "/en/catcorp/category/cab", imageUrl: `${AEM}/en/media_141154010893b6ca439fd04d0c60015c92fbd0c2d.png?width=96&format=png&optimize=medium` },
  { label: "Drivetrain", href: "/en/catcorp/category/drive-train", imageUrl: `${AEM}/en/media_199ad9860a5ed585b384820c6d28fb96197eb71e0.png?width=96&format=png&optimize=medium` },
  { label: "Electrical & Electronics", href: "/en/catcorp/category/electrical-electronics", imageUrl: `${AEM}/en/media_1830b056ef4abcf59b37d44d506daa6d3ed3dca78.png?width=96&format=png&optimize=medium` },
  { label: "Engine", href: "/en/catcorp/category/engines", imageUrl: `${AEM}/en/media_1a5101fa143aa6ef57c544418d0167d1a85f459fd.png?width=96&format=png&optimize=medium` },
  { label: "Equipment Upgrades", href: "/en/catcorp/category/equipment-upgrades", imageUrl: `${AEM}/en/media_19181cc4a97ebb6fe46fe4c2e7f85db5cb4741ea2.png?width=96&format=png&optimize=medium` },
  { label: "Filters & Fluids", href: "/en/catcorp/category/filters-and-fluids", imageUrl: `${AEM}/en/media_11516455d964a34b7e50116dce7a920100db345c7.png?width=96&format=png&optimize=medium` },
  { label: "Ground Engaging Tools", href: "/en/catcorp/category/ground-engaging-tools-get", imageUrl: `${AEM}/en/media_187d305126aadd6cc17a9ea1b84220be627911ac2.png?width=96&format=png&optimize=medium` },
  { label: "Hardware, Seals & Consumables", href: "/en/catcorp/category/hw-seals-consumables", imageUrl: `${AEM}/en/media_187566c6f041d7285d89b2df7e054044bcf73f5d6.png?width=96&format=png&optimize=medium` },
  { label: "Hoses & Tubes", href: "/en/catcorp/category/hoses-tubes", imageUrl: `${AEM}/en/media_1e6b915561a9a516e3151cc7bb3c15f04723a011e.png?width=96&format=png&optimize=medium` },
  { label: "Hydraulics", href: "/en/catcorp/category/hydraulic", imageUrl: `${AEM}/en/media_1a551b4620031a302a6adbabd7104a6130a72d3da.png?width=96&format=png&optimize=medium` },
  { label: "Structures & Other Systems", href: "/en/catcorp/category/structures-oth-sys-components", imageUrl: `${AEM}/en/media_1d097961535d933a87984bfb9c49e3f8347947bbc.png?width=96&format=png&optimize=medium` },
  { label: "Undercarriage", href: "/en/catcorp/category/uc", imageUrl: `${AEM}/en/media_117d2934a89ed607cc6ca16c1c0547515c4390c0b.png?width=96&format=png&optimize=medium` },
  { label: "Upgrade & Repair Kits", href: "/en/catcorp/category/upgrade-repair-kits", imageUrl: `${AEM}/en/media_138febf7e450ec49b1d3eef14bedbcc288dab00a2.png?width=96&format=png&optimize=medium` },
  { label: "Workshop Supplies", href: "/en/catcorp/category/workshop-supplies", imageUrl: `${AEM}/en/media_11875b2fedc2f43e478c96da544af2376450f2407.png?width=96&format=png&optimize=medium` },
];

const DEFAULT_MIDDLE_LINKS: NavLink[] = [
  { label: "My Equipment", href: "/en/catcorp/my-equipment" },
  { label: "Order History", href: "/en/catcorp/orders" },
  { label: "Help Center", href: "https://catcrm.my.site.com/HelpCenter/s?language=en_US&geoloc=US&userstate=Loggedout&eSite=CATCorp", target: "_blank" },
];

// ── Icon helpers ──────────────────────────────────────────────────────────────

function IconLocation() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function IconHamburger() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeaderWidget({
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = "Caterpillar",
  logoHref = "/en/catcorp",
  seeAllCategoriesHref = "/en/catcorp/shop-all-categories",
  categories = DEFAULT_CATEGORIES,
  middleLinks = DEFAULT_MIDDLE_LINKS,
  storeName,
  isSignedIn = false,
  userName,
  cartCount = 0,
  onSelectStore,
  onSignIn,
  onSignOut,
  onCart,
}: HeaderWidgetProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(64);
  const headerRef = useRef<HTMLElement>(null);

  // Responsive breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Click outside closes shop dropdown
  useEffect(() => {
    if (!shopOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shopOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShopOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openShop = () => {
    if (headerRef.current) {
      setDropdownTop(headerRef.current.getBoundingClientRect().bottom);
    }
    setShopOpen((o) => !o);
  };

  const navLinkStyle: React.CSSProperties = {
    color: C.white,
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    padding: "8px 12px",
    borderRadius: "4px",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    background: "none",
    border: "none",
    transition: "background 0.15s",
    whiteSpace: "nowrap",
  };

  const cartBadge = cartCount > 0 && (
    <span
      style={{
        position: "absolute",
        top: "4px",
        right: "4px",
        backgroundColor: C.yellow,
        color: C.black,
        fontSize: "10px",
        fontWeight: 700,
        borderRadius: "50%",
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        pointerEvents: "none",
      }}
    >
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  );

  return (
    <div className="cat-widget-root" style={{ fontFamily: "'Noto Sans', Arial, Helvetica, sans-serif" }}>

      {/* ── Header bar ───────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        style={{
          backgroundColor: C.black,
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          boxSizing: "border-box",
          width: "100%",
          position: "relative",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <a
          href={logoHref}
          style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none", marginRight: "24px" }}
        >
          <img src={logoSrc} alt={logoAlt} style={{ height: "36px", display: "block" }} />
        </a>

        {/* ── Desktop nav ── */}
        {!isMobile && (
          <>
            {/* Left/center nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
              {/* Shop trigger */}
              <button
                onClick={openShop}
                aria-expanded={shopOpen}
                aria-haspopup="true"
                style={{ ...navLinkStyle, gap: "6px", backgroundColor: shopOpen ? "rgba(255,255,255,0.1)" : "transparent" }}
                onMouseEnter={(e) => { if (!shopOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { if (!shopOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                Shop <IconChevron open={shopOpen} />
              </button>

              {/* Middle links */}
              {middleLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                  style={navLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              {/* Select Store */}
              <button
                onClick={onSelectStore}
                style={{
                  ...navLinkStyle,
                  gap: "6px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.yellow;
                  (e.currentTarget as HTMLElement).style.color = C.yellow;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLElement).style.color = C.white;
                }}
              >
                <IconLocation />
                {storeName || "Select Store"}
              </button>

              {/* Sign In / Account */}
              {isSignedIn ? (
                <button
                  onClick={onSignOut}
                  style={{ ...navLinkStyle, gap: "8px" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    backgroundColor: C.yellow, color: C.black,
                    fontSize: "12px", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {(userName || "U").charAt(0).toUpperCase()}
                  </div>
                  {userName || "Account"}
                </button>
              ) : (
                <button
                  onClick={onSignIn}
                  style={{
                    backgroundColor: C.yellow,
                    border: "none",
                    color: C.black,
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "8px 18px",
                    borderRadius: "4px",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
                >
                  Sign In
                </button>
              )}

              {/* Cart */}
              <button
                onClick={onCart}
                aria-label={`Cart${cartCount ? ` (${cartCount} items)` : ""}`}
                style={{ ...navLinkStyle, padding: "8px", position: "relative" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
              >
                <IconCart />
                {cartBadge}
              </button>
            </div>
          </>
        )}

        {/* ── Mobile: cart + hamburger ── */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
            <button
              onClick={onCart}
              aria-label={`Cart${cartCount ? ` (${cartCount} items)` : ""}`}
              style={{ ...navLinkStyle, padding: "8px", position: "relative" }}
            >
              <IconCart />
              {cartBadge}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{ ...navLinkStyle, padding: "8px" }}
            >
              {mobileOpen ? <IconClose /> : <IconHamburger />}
            </button>
          </div>
        )}
      </header>

      {/* ── Shop mega-dropdown (desktop) ─────────────────────────────────────── */}
      {!isMobile && shopOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShopOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: `${dropdownTop}px`,
              zIndex: 98,
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
          />
          {/* Panel */}
          <div
            style={{
              position: "fixed",
              top: `${dropdownTop}px`,
              left: 0,
              right: 0,
              backgroundColor: C.white,
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              zIndex: 99,
              padding: "24px 40px 32px",
              borderTop: `3px solid ${C.yellow}`,
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Shop by Category
                </span>
                <a
                  href={seeAllCategoriesHref}
                  onClick={() => setShopOpen(false)}
                  style={{ fontSize: "13px", fontWeight: 600, color: "#006FD6", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textDecoration = "underline"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textDecoration = "none"}
                >
                  See All Categories →
                </a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "8px" }}>
                {categories.map((cat) => (
                  <a
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setShopOpen(false)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textDecoration: "none",
                      padding: "12px 8px",
                      borderRadius: "8px",
                      gap: "8px",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "#F5F5F5"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                  >
                    {cat.imageUrl && (
                      <img src={cat.imageUrl} alt={cat.label} style={{ width: "56px", height: "56px", objectFit: "contain" }} />
                    )}
                    <span style={{ fontSize: "12px", fontWeight: 600, color: C.black, textAlign: "center", lineHeight: 1.3 }}>
                      {cat.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Mobile slide-down menu ────────────────────────────────────────────── */}
      {isMobile && mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: C.black,
            zIndex: 99,
            overflowY: "auto",
          }}
        >
          {/* Sign In / Account */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            {isSignedIn ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  backgroundColor: C.yellow, color: C.black,
                  fontSize: "16px", fontWeight: 700, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {(userName || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ color: C.white, fontWeight: 600, fontSize: "15px" }}>{userName || "Account"}</div>
                  <button
                    onClick={() => { onSignOut?.(); setMobileOpen(false); }}
                    style={{ background: "none", border: "none", color: C.gray, fontSize: "13px", cursor: "pointer", padding: 0, marginTop: "2px" }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onSignIn?.(); setMobileOpen(false); }}
                style={{
                  backgroundColor: C.yellow, border: "none", color: C.black,
                  fontSize: "15px", fontWeight: 700, cursor: "pointer",
                  padding: "12px 24px", borderRadius: "4px", width: "100%",
                }}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Select Store */}
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}` }}>
            <button
              onClick={() => { onSelectStore?.(); setMobileOpen(false); }}
              style={{
                background: "none", border: `1px solid rgba(255,255,255,0.2)`,
                color: C.white, fontSize: "14px", fontWeight: 600, cursor: "pointer",
                padding: "10px 16px", borderRadius: "4px", width: "100%",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <IconLocation />
              {storeName || "Select Store"}
            </button>
          </div>

          {/* Shop categories */}
          <div style={{ padding: "20px 24px 8px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.gray, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
              Shop
            </div>
            <a
              href={seeAllCategoriesHref}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", color: C.yellow, textDecoration: "none", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}
            >
              See All Categories →
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", paddingBottom: "12px" }}>
              {categories.map((cat) => (
                <a
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: C.white, textDecoration: "none", fontSize: "13px",
                    padding: "10px 8px", borderRadius: "4px",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                >
                  {cat.imageUrl && (
                    <img src={cat.imageUrl} alt="" style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }} />
                  )}
                  <span style={{ lineHeight: 1.3 }}>{cat.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Middle links */}
          <div style={{ padding: "16px 24px 32px" }}>
            <div style={{ color: C.gray, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Account
            </div>
            {middleLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", color: C.white, textDecoration: "none",
                  fontSize: "15px", fontWeight: 500, padding: "14px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
