import React from "react";

export interface SISWidgetProps {
  onClose?: () => void;
  onSignIn?: () => void;
  onRegister?: () => void;
  title?: string;
}

function FeatureRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px 0" }}>
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <p style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.45 }}>
        {text}
      </p>
    </div>
  );
}

export function SISWidget({
  onClose,
  onSignIn,
  onRegister,
  title = "Service Information System (SIS)",
}: SISWidgetProps) {
  return (
    <div
      className="cat-widget-root"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "460px",
        maxWidth: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E5E5E5",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px 18px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1A1A1A" }}>
          {title}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#6B6B6B", display: "flex", alignItems: "center" }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Feature list */}
      <div style={{ flex: 1, padding: "8px 24px" }}>
        <FeatureRow
          text="Access part and service information."
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          }
        />
        <div style={{ borderTop: "1px solid #F3F4F6" }} />
        <FeatureRow
          text="Get one-click access to Planned Maintenance and Service Options."
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          }
        />
        <div style={{ borderTop: "1px solid #F3F4F6" }} />
        <FeatureRow
          text="Import selected parts to parts.cat.com for simplified purchasing."
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          }
        />
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E5E5E5", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span style={{ fontSize: "13px", color: "#374151" }}>
            Sign in or create an account to access these features
          </span>
        </div>
        <button
          onClick={onSignIn}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#FFCD11",
            color: "#1A1A1A",
            border: "none",
            borderRadius: "2px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Sign in
        </button>
        <button
          onClick={onRegister}
          style={{
            width: "100%",
            padding: "13px",
            backgroundColor: "#fff",
            color: "#1A1A1A",
            border: "1px solid #1A1A1A",
            borderRadius: "2px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
