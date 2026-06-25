import React, { useState } from "react";

export interface AddEquipmentWidgetProps {
  onAdd?: (equipment: { serialNumber?: string; model?: string; nickname?: string; mode: "serial" | "model" }) => void;
  onCancel?: () => void;
  onClose?: () => void;
  onSerialHelp?: () => void;
  title?: string;
}

export function AddEquipmentWidget({
  onAdd,
  onCancel,
  onClose,
  onSerialHelp,
  title = "Add Equipment To Find Parts That Fit",
}: AddEquipmentWidgetProps) {
  const [mode, setMode] = useState<"serial" | "model">("serial");
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("");
  const [nickname, setNickname] = useState("");

  const canAdd = mode === "serial" ? serialNumber.trim().length > 0 : model.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd?.({ serialNumber: mode === "serial" ? serialNumber : undefined, model: mode === "model" ? model : undefined, nickname: nickname || undefined, mode });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "14px",
    color: "#1A1A1A",
    border: "1px solid #D1D5DB",
    borderRadius: "4px",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  };

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
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3 }}>
            {title}
          </h2>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#6B6B6B", display: "flex", alignItems: "center", flexShrink: 0 }}
            aria-label="More info"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#6B6B6B", display: "flex", alignItems: "center", flexShrink: 0 }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Segmented control */}
        <div
          style={{
            display: "flex",
            border: "1px solid #1A1A1A",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {(["serial", "model"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "10px 16px",
                border: "none",
                backgroundColor: mode === m ? "#1A1A1A" : "#fff",
                color: mode === m ? "#fff" : "#1A1A1A",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {m === "serial" ? "By Serial Number" : "By Model"}
            </button>
          ))}
        </div>

        {/* Serial number mode */}
        {mode === "serial" && (
          <>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter your equipment serial number"
              style={inputStyle}
            />
            <button
              onClick={onSerialHelp}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                fontSize: "14px",
                fontWeight: 600,
                color: "#1D4ED8",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Where can I find my equipment serial number?
            </button>
          </>
        )}

        {/* Model mode */}
        {mode === "model" && (
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter your equipment model (e.g. 320 Excavator)"
            style={inputStyle}
          />
        )}

        {/* Nickname */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Give your equipment a nickname (optional)"
          style={inputStyle}
        />
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E5E5E5", padding: "16px 24px" }}>
        {/* Warning */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span style={{ fontSize: "13px", color: "#374151" }}>
            Only Cat® equipment can be added.
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            style={{
              padding: "12px 28px",
              backgroundColor: canAdd ? "#FFCD11" : "#FEF3C7",
              color: canAdd ? "#1A1A1A" : "#9CA3AF",
              border: "none",
              borderRadius: "2px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: canAdd ? "pointer" : "not-allowed",
            }}
          >
            Add
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "12px 28px",
              backgroundColor: "#fff",
              color: "#1A1A1A",
              border: "1px solid #1A1A1A",
              borderRadius: "2px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
