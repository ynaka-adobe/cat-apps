import React, { useEffect, useRef, useState } from "react";

const C = {
  topBar: "#0D0D0D",
  navBar: "#1A1A1A",
  divider: "#2D2D2D",
  yellow: "#FFCD11",
  white: "#FFFFFF",
  gray: "#888888",
  lightGray: "#F5F5F5",
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
  icon?: React.ReactNode;
}

export interface HeaderWidgetProps {
  // Branding
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;

  // Top bar — left
  onAddEquipment?: () => void;

  // Top bar — search
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;

  // Top bar — right actions
  storeName?: string;
  onSelectStore?: () => void;
  isSignedIn?: boolean;
  userName?: string;
  onSignIn?: () => void;
  onSignOut?: () => void;
  cartCount?: number;
  onCart?: () => void;
  onWaffleMenu?: () => void;

  // Bottom nav — left (Shop dropdown + extra links)
  seeAllCategoriesHref?: string;
  categories?: NavCategory[];
  leftLinks?: NavLink[];

  // Bottom nav — right
  rightLinks?: NavLink[];
}

// ── Default data ─────────────────────────────────────────────────────────────

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

const DEFAULT_LEFT_LINKS: NavLink[] = [
  { label: "SIS", href: "/en/catcorp/sis" },
  { label: "Parts Diagram", href: "/en/catcorp/parts-diagram" },
];

const DEFAULT_RIGHT_LINKS: NavLink[] = [
  {
    label: "My Equipment",
    href: "/en/catcorp/my-equipment",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    label: "Order History",
    href: "/en/catcorp/orders",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Help Center",
    href: "https://catcrm.my.site.com/HelpCenter/s?language=en_US&geoloc=US&userstate=Loggedout&eSite=CATCorp",
    target: "_blank",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function IconAddEquipment() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function IconWaffle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="10" y="3" width="5" height="5" rx="1" />
      <rect x="17" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="10" width="5" height="5" rx="1" />
      <rect x="10" y="10" width="5" height="5" rx="1" />
      <rect x="17" y="10" width="5" height="5" rx="1" />
      <rect x="3" y="17" width="5" height="5" rx="1" />
      <rect x="10" y="17" width="5" height="5" rx="1" />
      <rect x="17" y="17" width="5" height="5" rx="1" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 12 12" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}

function IconHamburger() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ── Shared button style helper ────────────────────────────────────────────────

const ghostBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "none",
  border: "none",
  color: C.white,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  padding: "6px 8px",
  borderRadius: "4px",
  fontSize: "13px",
  fontWeight: 500,
  whiteSpace: "nowrap" as const,
  transition: "background 0.15s",
  ...extra,
});

// ── Component ─────────────────────────────────────────────────────────────────

export function HeaderWidget({
  logoSrc = DEFAULT_LOGO_SRC,
  logoAlt = "Caterpillar",
  logoHref = "/en/catcorp",
  onAddEquipment,
  searchPlaceholder = "Search for part number or name",
  onSearch,
  storeName,
  onSelectStore,
  isSignedIn = false,
  userName,
  onSignIn,
  onSignOut,
  cartCount = 0,
  onCart,
  onWaffleMenu,
  seeAllCategoriesHref = "/en/catcorp/shop-all-categories",
  categories = DEFAULT_CATEGORIES,
  leftLinks = DEFAULT_LEFT_LINKS,
  rightLinks = DEFAULT_RIGHT_LINKS,
}: HeaderWidgetProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownTop, setDropdownTop] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shopOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setShopOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Body scroll lock for mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleShopClick = () => {
    if (wrapperRef.current) {
      setDropdownTop(wrapperRef.current.getBoundingClientRect().bottom);
    }
    setShopOpen((o) => !o);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const cartBadge = cartCount > 0 && (
    <span style={{
      position: "absolute", top: "1px", right: "1px",
      backgroundColor: C.yellow, color: "#000",
      fontSize: "10px", fontWeight: 700, borderRadius: "50%",
      width: "15px", height: "15px",
      display: "flex", alignItems: "center", justifyContent: "center",
      lineHeight: 1, pointerEvents: "none",
    }}>
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  );

  // ── Desktop ─────────────────────────────────────────────────────────────────

  const desktopTopBar = (
    <div style={{
      backgroundColor: C.topBar,
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      height: "52px",
      gap: "12px",
      boxSizing: "border-box",
    }}>
      {/* Logo */}
      <a href={logoHref} style={{ flexShrink: 0, display: "flex", alignItems: "center", textDecoration: "none", marginRight: "8px" }}>
        <img src={logoSrc} alt={logoAlt} style={{ height: "32px", display: "block" }} />
      </a>

      {/* Add Equipment */}
      <button
        onClick={onAddEquipment}
        style={ghostBtn({ gap: "6px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", padding: "5px 12px", flexShrink: 0 })}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"}
      >
        <IconAddEquipment />
        Add Equipment
      </button>

      {/* Divider */}
      <div style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        style={{ flex: 1, display: "flex", alignItems: "center", maxWidth: "640px", minWidth: 0 }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center", backgroundColor: C.white, borderRadius: "4px 0 0 4px", overflow: "hidden" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "0 14px",
              height: "36px",
              fontSize: "13px",
              color: "#1A1A1A",
              backgroundColor: "transparent",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: C.yellow,
            border: "none",
            width: "42px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "0 4px 4px 0",
            flexShrink: 0,
            color: "#000",
          }}
        >
          <IconSearch />
        </button>
      </form>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto", flexShrink: 0 }}>
        {/* Select Store */}
        <button
          onClick={onSelectStore}
          style={ghostBtn()}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
        >
          <IconLocation />
          {storeName || "Select Store"}
        </button>

        {/* Sign In / Account */}
        {isSignedIn ? (
          <button
            onClick={onSignOut}
            style={ghostBtn()}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
          >
            <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: C.yellow, color: "#000", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {(userName || "U").charAt(0).toUpperCase()}
            </div>
            {userName || "Account"}
          </button>
        ) : (
          <button
            onClick={onSignIn}
            style={ghostBtn()}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
          >
            <IconUser />
            Sign In
          </button>
        )}

        {/* Cart */}
        <button
          onClick={onCart}
          aria-label={`Cart${cartCount ? ` (${cartCount} items)` : ""}`}
          style={ghostBtn({ padding: "6px 8px", position: "relative" })}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
        >
          <IconCart />
          {cartBadge}
        </button>

        {/* Waffle / App grid */}
        <button
          onClick={onWaffleMenu}
          aria-label="All applications"
          style={ghostBtn({ padding: "6px 8px" })}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
        >
          <IconWaffle />
        </button>
      </div>
    </div>
  );

  const desktopNavBar = (
    <div style={{
      backgroundColor: C.navBar,
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      height: "40px",
      borderTop: `1px solid ${C.divider}`,
      boxSizing: "border-box",
    }}>
      {/* Left: Shop + extra links */}
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <button
          onClick={handleShopClick}
          aria-expanded={shopOpen}
          aria-haspopup="true"
          style={ghostBtn({ gap: "5px", backgroundColor: shopOpen ? "rgba(255,255,255,0.08)" : "transparent", fontSize: "14px" })}
          onMouseEnter={(e) => { if (!shopOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => { if (!shopOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
        >
          Shop <IconChevron open={shopOpen} />
        </button>

        {leftLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.target}
            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
            style={{ ...ghostBtn(), textDecoration: "none", fontSize: "14px" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: My Equipment, Order History, Help Center */}
      <div style={{ display: "flex", alignItems: "center", gap: "2px", marginLeft: "auto" }}>
        {rightLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.target}
            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
            style={{ ...ghostBtn(), textDecoration: "none", fontSize: "13px", gap: "5px" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );

  // ── Mobile top bar ──────────────────────────────────────────────────────────

  const mobileTopBar = (
    <div style={{
      backgroundColor: C.topBar,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      height: "52px",
      gap: "8px",
      boxSizing: "border-box",
    }}>
      <a href={logoHref} style={{ flexShrink: 0, display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src={logoSrc} alt={logoAlt} style={{ height: "28px", display: "block" }} />
      </a>
      <div style={{ flex: 1 }} />
      {/* Cart */}
      <button onClick={onCart} aria-label="Cart" style={ghostBtn({ padding: "6px", position: "relative" })}>
        <IconCart />
        {cartBadge}
      </button>
      {/* Hamburger */}
      <button
        onClick={() => setMobileOpen((o) => !o)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        style={ghostBtn({ padding: "6px" })}
      >
        {mobileOpen ? <IconClose /> : <IconHamburger />}
      </button>
    </div>
  );

  // ── Mobile overlay ──────────────────────────────────────────────────────────

  const mobileOverlay = mobileOpen && (
    <div style={{
      position: "fixed",
      top: "52px",
      left: 0, right: 0, bottom: 0,
      backgroundColor: C.navBar,
      zIndex: 99,
      overflowY: "auto",
    }}>
      {/* Search */}
      <div style={{ padding: "16px", borderBottom: `1px solid ${C.divider}` }}>
        <form onSubmit={handleSearch} style={{ display: "flex" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            style={{ flex: 1, border: "none", outline: "none", padding: "0 12px", height: "40px", fontSize: "14px", color: "#1A1A1A", borderRadius: "4px 0 0 4px" }}
          />
          <button type="submit" style={{ backgroundColor: C.yellow, border: "none", width: "44px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: "0 4px 4px 0", color: "#000" }}>
            <IconSearch />
          </button>
        </form>
      </div>

      {/* Sign In / Account */}
      <div style={{ padding: "16px", borderBottom: `1px solid ${C.divider}` }}>
        {isSignedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: C.yellow, color: "#000", fontSize: "15px", fontWeight: 700, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {(userName || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ color: C.white, fontWeight: 600, fontSize: "14px" }}>{userName || "Account"}</div>
              <button onClick={() => { onSignOut?.(); setMobileOpen(false); }} style={{ background: "none", border: "none", color: C.gray, fontSize: "12px", cursor: "pointer", padding: 0, marginTop: "2px" }}>Sign Out</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { onSignIn?.(); setMobileOpen(false); }}
            style={{ backgroundColor: C.yellow, border: "none", color: "#000", fontSize: "14px", fontWeight: 700, cursor: "pointer", padding: "10px 24px", borderRadius: "4px", width: "100%" }}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Select Store + Add Equipment */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.divider}`, display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => { onSelectStore?.(); setMobileOpen(false); }}
          style={{ ...ghostBtn({ gap: "8px", border: `1px solid rgba(255,255,255,0.2)`, borderRadius: "4px", padding: "10px 16px", width: "100%", justifyContent: "flex-start" as const }) }}
        >
          <IconLocation /> {storeName || "Select Store"}
        </button>
        <button
          onClick={() => { onAddEquipment?.(); setMobileOpen(false); }}
          style={{ ...ghostBtn({ gap: "8px", border: `1px solid rgba(255,255,255,0.2)`, borderRadius: "4px", padding: "10px 16px", width: "100%", justifyContent: "flex-start" as const }) }}
        >
          <IconAddEquipment /> Add Equipment
        </button>
      </div>

      {/* Shop categories */}
      <div style={{ padding: "16px 16px 8px", borderBottom: `1px solid ${C.divider}` }}>
        <div style={{ color: C.gray, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Shop</div>
        <a href={seeAllCategoriesHref} onClick={() => setMobileOpen(false)} style={{ display: "block", color: C.yellow, textDecoration: "none", fontWeight: 600, fontSize: "14px", marginBottom: "12px" }}>See All Categories →</a>
        {leftLinks.map((link) => (
          <a key={link.label} href={link.href} target={link.target} rel={link.target === "_blank" ? "noopener noreferrer" : undefined} onClick={() => setMobileOpen(false)} style={{ display: "block", color: C.white, textDecoration: "none", fontSize: "14px", padding: "10px 0", borderBottom: `1px solid ${C.divider}` }}>
            {link.label}
          </a>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginTop: "8px", paddingBottom: "8px" }}>
          {categories.map((cat) => (
            <a key={cat.href} href={cat.href} onClick={() => setMobileOpen(false)}
              style={{ color: C.white, textDecoration: "none", fontSize: "13px", padding: "8px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "8px" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
            >
              {cat.imageUrl && <img src={cat.imageUrl} alt="" style={{ width: "24px", height: "24px", objectFit: "contain", flexShrink: 0 }} />}
              <span style={{ lineHeight: 1.3 }}>{cat.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Right links */}
      <div style={{ padding: "16px 16px 32px" }}>
        <div style={{ color: C.gray, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Account</div>
        {rightLinks.map((link) => (
          <a key={link.label} href={link.href} target={link.target} rel={link.target === "_blank" ? "noopener noreferrer" : undefined} onClick={() => setMobileOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "8px", color: C.white, textDecoration: "none", fontSize: "14px", padding: "12px 0", borderBottom: `1px solid ${C.divider}` }}
          >
            {link.icon} {link.label}
          </a>
        ))}
      </div>
    </div>
  );

  // ── Shop mega-dropdown ──────────────────────────────────────────────────────

  const shopDropdown = !isMobile && shopOpen && (
    <>
      <div onClick={() => setShopOpen(false)} style={{ position: "fixed", inset: 0, top: `${dropdownTop}px`, zIndex: 98, backgroundColor: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "fixed", top: `${dropdownTop}px`, left: 0, right: 0, backgroundColor: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 99, padding: "24px 40px 32px", borderTop: `3px solid ${C.yellow}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>Shop by Category</span>
            <a href={seeAllCategoriesHref} onClick={() => setShopOpen(false)} style={{ fontSize: "13px", fontWeight: 600, color: "#006FD6", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textDecoration = "underline"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textDecoration = "none"}
            >
              See All Categories →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "8px" }}>
            {categories.map((cat) => (
              <a key={cat.href} href={cat.href} onClick={() => setShopOpen(false)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", padding: "10px 6px", borderRadius: "6px", gap: "8px", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "#F5F5F5"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
              >
                {cat.imageUrl && <img src={cat.imageUrl} alt={cat.label} style={{ width: "52px", height: "52px", objectFit: "contain" }} />}
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#1A1A1A", textAlign: "center", lineHeight: 1.3 }}>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      ref={wrapperRef}
      className="cat-widget-root"
      style={{ fontFamily: "'Noto Sans', Arial, Helvetica, sans-serif" }}
    >
      {isMobile ? (
        <>
          {mobileTopBar}
          {mobileOverlay}
        </>
      ) : (
        <>
          {desktopTopBar}
          {desktopNavBar}
        </>
      )}
      {shopDropdown}
    </div>
  );
}
