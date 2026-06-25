"use client";

import React, { useState } from "react";
import { GlobalMenuWidget } from "@/widgets/global-menu/GlobalMenuWidget";
import { AccountWidget, AccountUser } from "@/widgets/account/AccountWidget";
import { DealerLocatorWidget } from "@/widgets/dealer-locator/DealerLocatorWidget";
import { SelectStoreWidget } from "@/widgets/select-store/SelectStoreWidget";
import { OrderHistoryWidget } from "@/widgets/order-history/OrderHistoryWidget";
import { SISWidget } from "@/widgets/sis/SISWidget";
import { AddEquipmentWidget } from "@/widgets/add-equipment/AddEquipmentWidget";
import { HeaderWidget } from "@/widgets/header/HeaderWidget";

const DEMO_USER: AccountUser = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex.morgan@acme.com",
  company: "Acme Construction Co.",
  role: "Fleet Manager",
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"menu" | "account" | "dealer" | "store" | "orders" | "sis" | "equipment" | "header">("menu");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = async (creds: { email: string; password: string }) => {
    await new Promise((r) => setTimeout(r, 800));
    if (creds.password === "wrong") {
      setLoginError("Invalid credentials. Try any password (except 'wrong').");
      return;
    }
    setLoginError("");
    setLoggedIn(true);
  };

  const tabs = [
    { id: "menu" as const, label: "Global Menu" },
    { id: "account" as const, label: "Account Widget" },
    { id: "dealer" as const, label: "Dealer Locator" },
    { id: "store" as const, label: "Select Store" },
    { id: "orders" as const, label: "Order History" },
    { id: "sis" as const, label: "SIS" },
    { id: "equipment" as const, label: "Add Equipment" },
    { id: "header" as const, label: "Header" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F5F5", fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Page header */}
      <div style={{ backgroundColor: "#1A1A1A", padding: "20px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ backgroundColor: "#FFCD11", color: "#1A1A1A", fontWeight: 900, fontSize: "20px", padding: "4px 10px" }}>
            CAT
          </div>
          <div>
            <h1 style={{ color: "#ffffff", margin: 0, fontSize: "18px", fontWeight: 700 }}>Embeddable Widget Suite</h1>
            <p style={{ color: "#9CA3AF", margin: 0, fontSize: "13px" }}>
              Next.js — built as standalone JS bundles for any HTML page
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 40px" }}>
        {/* Info banner */}
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "1px solid #FFCD11",
            borderRadius: "8px",
            padding: "14px 18px",
            marginBottom: "28px",
            fontSize: "13px",
            color: "#374151",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "18px" }}>📦</span>
          <span>
            Run <code style={{ backgroundColor: "#FEF3C7", padding: "1px 6px", borderRadius: "3px" }}>npm run build:widgets</code> to
            generate <code style={{ backgroundColor: "#FEF3C7", padding: "1px 6px", borderRadius: "3px" }}>public/widgets/cat-*.js</code> bundles,
            then open <code style={{ backgroundColor: "#FEF3C7", padding: "1px 6px", borderRadius: "3px" }}>public/examples/embed-demo.html</code> to
            see them embedded in a plain HTML page.
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", borderBottom: "2px solid #E5E5E5" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px",
                border: "none",
                background: "none",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                color: activeTab === tab.id ? "#1A1A1A" : "#6B6B6B",
                borderBottom: activeTab === tab.id ? "2px solid #FFCD11" : "2px solid transparent",
                marginBottom: "-2px",
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Widget previews */}
        {activeTab === "menu" && (
          <div>
            <SectionHeader
              title="Global App Menu"
              description="A slide-in drawer from the right listing all CAT applications. Trigger it from any button on the host page."
              embedCode={`<script src="/widgets/cat-global-menu.js"></script>
<script>
  // Mount once — appends its own container to <body>
  var menu = CATGlobalMenu.mount({
    onClose: () => console.log('menu closed')
  });

  // Open from any button on the host page
  document.getElementById('open-cat-menu').addEventListener('click', () => menu.open());
</script>`}
            />
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={() => setMenuOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: "#FFCD11",
                  color: "#1A1A1A",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
                Open Cat Applications Menu
              </button>
              <span style={{ fontSize: "13px", color: "#9CA3AF" }}>
                (or press Escape to close once opened)
              </span>
            </div>
            <GlobalMenuWidget isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <SectionHeader
              title="Account Widget"
              description="Shows a login form when logged out, and a profile dropdown when logged in."
              embedCode={`<div id="cat-account"></div>
<script src="/widgets/cat-account.js"></script>
<script>
  CATAccount.mount('#cat-account', {
    user: currentUser,        // null when logged out
    onLogin: async (creds) => { /* call your auth API */ },
    onLogout: () => { /* clear session */ },
    onProfileClick: () => { window.location.href = '/profile'; }
  });
</script>`}
            />
            <div style={{ marginTop: "20px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#6B6B6B", marginBottom: "10px" }}>LOGGED OUT STATE</p>
                <AccountWidget
                  user={null}
                  loginError={loginError}
                  onLogin={handleLogin}
                />
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#6B6B6B", marginBottom: "10px" }}>LOGGED IN STATE</p>
                <AccountWidget
                  user={DEMO_USER}
                  onLogout={() => setLoggedIn(false)}
                  onProfileClick={() => alert("Profile clicked")}
                  onOrdersClick={() => alert("Orders clicked")}
                />
              </div>
            </div>
            {!loggedIn && (
              <p style={{ marginTop: "10px", fontSize: "12px", color: "#9CA3AF" }}>
                Demo: type any password (except "wrong") to simulate a successful login.
              </p>
            )}
          </div>
        )}

        {activeTab === "dealer" && (
          <div>
            <SectionHeader
              title="Dealer Locator"
              description="Search for the nearest CAT dealer by city, state, or ZIP. Integrates with your own dealer API."
              embedCode={`<div id="cat-dealer-locator"></div>
<script src="/widgets/cat-dealer-locator.js"></script>
<script>
  CATDealerLocator.mount('#cat-dealer-locator', {
    onSearch: async (query) => {
      const res = await fetch(\`/api/dealers?q=\${query}\`);
      return res.json();
    },
    onDealerSelect: (dealer) => console.log('Selected:', dealer)
  });
</script>`}
            />
            <div style={{ marginTop: "20px" }}>
              <DealerLocatorWidget
                onDealerSelect={(d) => console.log("Selected dealer:", d)}
              />
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <SectionHeader
              title="Order History"
              description="Displays a user's past Cat parts and equipment orders with status, line items, tracking, and reorder actions."
              embedCode={`<div id="cat-order-history"></div>
<script src="/widgets/cat-order-history.js"></script>
<script>
  CATOrderHistory.mount('#cat-order-history', {
    orders: myOrders,
    onViewOrder: (order) => window.location.href = '/orders/' + order.id,
    onReorder:   (order) => console.log('Reorder', order)
  });
</script>`}
            />
            <div style={{ marginTop: "20px" }}>
              <OrderHistoryWidget
                onViewOrder={(o) => alert(`View order: ${o.orderNumber}`)}
                onReorder={(o) => alert(`Reorder: ${o.orderNumber}`)}
              />
            </div>
          </div>
        )}

        {activeTab === "sis" && (
          <div>
            <SectionHeader
              title="Service Information System (SIS)"
              description="Promotes SIS features and prompts unauthenticated users to sign in or register before accessing part and service information."
              embedCode={`<div id="cat-sis"></div>
<script src="/widgets/cat-sis.js"></script>
<script>
  CATSIS.mount('#cat-sis', {
    onSignIn:   () => window.location.href = '/sign-in',
    onRegister: () => window.location.href = '/register',
    onClose:    () => document.getElementById('cat-sis').style.display = 'none'
  });
</script>`}
            />
            <div style={{ marginTop: "20px" }}>
              <SISWidget
                onSignIn={() => alert("Sign in clicked")}
                onRegister={() => alert("Register clicked")}
                onClose={() => alert("Close clicked")}
              />
            </div>
          </div>
        )}

        {activeTab === "equipment" && (
          <div>
            <SectionHeader
              title="Add Equipment"
              description="Lets users add Cat equipment by serial number or model to personalize parts search results."
              embedCode={`<div id="cat-add-equipment"></div>
<script src="/widgets/cat-add-equipment.js"></script>
<script>
  CATAddEquipment.mount('#cat-add-equipment', {
    onAdd:    (eq) => console.log('Equipment added', eq),
    onCancel: () => document.getElementById('cat-add-equipment').style.display = 'none',
    onClose:  () => document.getElementById('cat-add-equipment').style.display = 'none'
  });
</script>`}
            />
            <div style={{ marginTop: "20px" }}>
              <AddEquipmentWidget
                onAdd={(eq) => alert(`Added: ${eq.serialNumber ?? eq.model}${eq.nickname ? ` (${eq.nickname})` : ""}`)}
                onCancel={() => alert("Cancelled")}
                onClose={() => alert("Close clicked")}
              />
            </div>
          </div>
        )}

        {activeTab === "header" && (
          <div>
            <SectionHeader
              title="Header"
              description="Full-site navigation header with Shop mega-menu, store selector, sign-in, and cart. Fully responsive — collapses to a hamburger menu on mobile."
              embedCode={`<header id="cat-header" style="position: sticky; top: 0; z-index: 100;"></header>
<script src="/widgets/cat-header.js"></script>
<script>
  CATHeader.mount('#cat-header', {
    storeName: 'Los Angeles Branch',   // optional — shows "Select Store" if omitted
    cartCount: 3,
    isSignedIn: false,
    onSelectStore: () => { /* open store picker */ },
    onSignIn:      () => { window.location.href = '/sign-in'; },
    onCart:        () => { window.location.href = '/cart'; },
  });
</script>`}
            />
            <div style={{ marginTop: "20px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E5E5E5" }}>
              <HeaderWidget
                cartCount={2}
                storeName="Los Angeles Branch"
                onSelectStore={() => alert("Select Store clicked")}
                onSignIn={() => alert("Sign In clicked")}
                onCart={() => alert("Cart clicked")}
              />
            </div>
            <p style={{ marginTop: "12px", fontSize: "13px", color: "#6B6B6B" }}>
              Hover <strong>Shop</strong> to open the mega-menu. Resize the window below 900 px to see the mobile layout.
            </p>
          </div>
        )}

        {activeTab === "store" && (
          <div>
            <SectionHeader
              title="Select Store"
              description="Let users pick a nearby Cat dealer store for price and availability. Renders as a panel or inside a modal on the host page."
              embedCode={`<div id="cat-select-store"></div>
<script src="/widgets/cat-select-store.js"></script>
<script>
  CATSelectStore.mount('#cat-select-store', {
    initialQuery: 'San Francisco, California, United States',
    onSearch: async (query) => {
      const res = await fetch(\`/api/stores?q=\${query}\`);
      return res.json();
    },
    onStoreSelect: (store) => console.log('Selected store:', store),
    onClose: () => { document.getElementById('cat-select-store').style.display = 'none'; }
  });
</script>`}
            />
            <div style={{ marginTop: "20px" }}>
              <SelectStoreWidget
                onStoreSelect={(s) => alert(`Selected: ${s.dealerName} — ${s.locationName}`)}
                onClose={() => alert("Close clicked")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
  embedCode,
}: {
  title: string;
  description: string;
  embedCode: string;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 700, color: "#1A1A1A" }}>{title}</h2>
      <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#6B6B6B" }}>{description}</p>
      <button
        onClick={() => setShowCode(!showCode)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          backgroundColor: showCode ? "#1A1A1A" : "#F5F5F5",
          color: showCode ? "#FFCD11" : "#374151",
          border: "1px solid #E5E5E5",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {showCode ? "Hide" : "Show"} embed code
      </button>
      {showCode && (
        <pre
          style={{
            marginTop: "10px",
            backgroundColor: "#1A1A1A",
            color: "#FFCD11",
            padding: "16px",
            borderRadius: "6px",
            fontSize: "13px",
            overflowX: "auto",
            lineHeight: 1.6,
          }}
        >
          {embedCode}
        </pre>
      )}
    </div>
  );
}
