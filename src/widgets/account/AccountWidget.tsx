import React, { useState } from "react";

export interface AccountUser {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  avatarUrl?: string;
}

export interface AccountWidgetProps {
  user?: AccountUser | null;
  onLogin?: (credentials: { email: string; password: string }) => void | Promise<void>;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onOrdersClick?: () => void;
  isLoading?: boolean;
  loginError?: string;
}

function Avatar({ user }: { user: AccountUser }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #FFCD11",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#FFCD11",
        color: "#1A1A1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "15px",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export function AccountWidget({
  user,
  onLogin,
  onLogout,
  onProfileClick,
  onOrdersClick,
  isLoading = false,
  loginError,
}: AccountWidgetProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!email || !password) {
      setLocalError("Please enter your email and password.");
      return;
    }
    setSubmitting(true);
    try {
      await onLogin?.({ email, password });
    } finally {
      setSubmitting(false);
    }
  };

  const error = loginError || localError;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  if (isLoading) {
    return (
      <div className="cat-widget-root" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            padding: "32px",
            textAlign: "center",
            maxWidth: "360px",
          }}
        >
          <div style={{ color: "#6B6B6B", fontSize: "14px" }}>Loading account…</div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="cat-widget-root" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* Trigger button */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <Avatar user={user} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}>{user.name}</div>
              {user.company && (
                <div style={{ fontSize: "12px", color: "#6B6B6B" }}>{user.company}</div>
              )}
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#6B6B6B"
              strokeWidth="1.5"
              style={{ transform: panelOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            >
              <path d="M2 4l4 4 4-4" strokeLinecap="round" />
            </svg>
          </button>

          {/* Dropdown panel */}
          {panelOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                backgroundColor: "#ffffff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                minWidth: "260px",
                zIndex: 9999,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  backgroundColor: "#1A1A1A",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Avatar user={user} />
                <div>
                  <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "14px" }}>{user.name}</div>
                  <div style={{ color: "#FFCD11", fontSize: "12px" }}>{user.email}</div>
                  {user.role && (
                    <div style={{ color: "#9CA3AF", fontSize: "11px", marginTop: "2px" }}>{user.role}</div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ padding: "8px 0" }}>
                {[
                  { label: "My Profile", icon: "👤", action: onProfileClick },
                  { label: "Orders & Quotes", icon: "📋", action: onOrdersClick },
                ].map(({ label, icon, action }) => (
                  <button
                    key={label}
                    onClick={() => { action?.(); setPanelOpen(false); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                      padding: "10px 16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#1A1A1A",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F5F5F5")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                  >
                    <span>{icon}</span> {label}
                  </button>
                ))}

                <div style={{ borderTop: "1px solid #e5e5e5", margin: "8px 0" }} />

                <button
                  onClick={() => { onLogout?.(); setPanelOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "10px 16px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#DC2626",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#FEF2F2")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <span>🚪</span> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="cat-widget-root" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "360px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#1A1A1A", padding: "20px 24px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FFCD11",
              color: "#1A1A1A",
              fontWeight: 900,
              fontSize: "18px",
              padding: "2px 8px",
              marginBottom: "8px",
            }}
          >
            CAT
          </div>
          <div style={{ color: "#ffffff", fontWeight: 600, fontSize: "16px" }}>Sign In to Your Account</div>
          <div style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "4px" }}>
            Access your equipment, orders & services
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ padding: "24px" }}>
          {error && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "4px",
                padding: "10px 12px",
                color: "#DC2626",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={inputStyle}
              disabled={submitting}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: submitting ? "#D1D5DB" : "#FFCD11",
              color: "#1A1A1A",
              border: "none",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>

          <div style={{ textAlign: "center", marginTop: "14px" }}>
            <a href="#" style={{ color: "#FFCD11", fontSize: "13px", textDecoration: "none", fontWeight: 500 }}>
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
