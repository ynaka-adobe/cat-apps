import React, { useState } from "react";

export interface Store {
  id: string;
  dealerName: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  distance?: number;
  isClosest?: boolean;
}

export interface SelectStoreWidgetProps {
  stores?: Store[];
  initialQuery?: string;
  onSearch?: (query: string) => Store[] | Promise<Store[]>;
  onStoreSelect?: (store: Store) => void;
  onClose?: () => void;
  title?: string;
}

const MOCK_STORES: Store[] = [
  {
    id: "1",
    dealerName: "PETERSON (CALIFORNIA)",
    locationName: "SAN LEANDRO",
    address: "955 Marina Blvd",
    city: "California",
    state: "CA",
    zip: "94577-3440",
    distance: 14.8,
    isClosest: true,
  },
  {
    id: "2",
    dealerName: "PETERSON (CALIFORNIA)",
    locationName: "POWER SYSTEMS",
    address: "2828 Teagarden St.",
    city: "CALIFORNIA",
    state: "CA",
    zip: "94577-5717",
    distance: 15.1,
  },
  {
    id: "3",
    dealerName: "PETERSON (CALIFORNIA)",
    locationName: "SANTA ROSA",
    address: "3710 Regional Parkway",
    city: "CALIFORNIA",
    state: "CA",
    zip: "95403-8240",
    distance: 54.4,
  },
  {
    id: "4",
    dealerName: "HOLT OF CALIFORNIA",
    locationName: "Stockton 1521",
    address: "1521 West Charter Way",
    city: "California",
    state: "CA",
    zip: "95206-1112",
    distance: 61.6,
  },
  {
    id: "5",
    dealerName: "PETERSON (CALIFORNIA)",
    locationName: "MODESTO",
    address: "4255 Kiernan Ave",
    city: "CALIFORNIA",
    state: "CA",
    zip: "95356-9260",
    distance: 65.5,
  },
];

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: selected ? "2px solid #1A1A1A" : "2px solid #9CA3AF",
        backgroundColor: selected ? "#FFCD11" : "transparent",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {selected && (
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#1A1A1A",
          }}
        />
      )}
    </div>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function SelectStoreWidget({
  stores,
  initialQuery = "San Francisco, California, United States",
  onSearch,
  onStoreSelect,
  onClose,
  title = "Select Store Location",
}: SelectStoreWidgetProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Store[]>(stores ?? MOCK_STORES);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(results[0]?.id ?? null);
  const [mapView, setMapView] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      let found: Store[];
      if (onSearch) {
        found = await onSearch(query);
      } else if (stores) {
        found = stores.filter(
          (s) =>
            s.city.toLowerCase().includes(query.toLowerCase()) ||
            s.dealerName.toLowerCase().includes(query.toLowerCase()) ||
            s.zip.includes(query)
        );
        if (found.length === 0) found = stores;
      } else {
        found = MOCK_STORES;
      }
      setResults(found);
      setSelectedId(found[0]?.id ?? null);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    const store = results.find((s) => s.id === selectedId);
    if (store) onStoreSelect?.(store);
  };

  return (
    <div
      className="cat-widget-root"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "480px",
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
          padding: "20px 24px 16px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#1A1A1A" }}>
          {title}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#6B6B6B",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Subtitle */}
      <p style={{ margin: "16px 24px 0", fontSize: "14px", color: "#374151", lineHeight: 1.5 }}>
        Enter your location below to find price and availability information from local Cat dealers.
      </p>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ padding: "16px 24px 0" }}>
        <div style={{ display: "flex", gap: "0" }}>
          {/* Input with clear button */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              border: "2px solid #1A73E8",
              borderRight: "none",
              borderRadius: "4px 0 0 4px",
              backgroundColor: "#fff",
              padding: "0 10px",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "#1A1A1A",
                backgroundColor: "transparent",
                padding: "10px 0",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "2px",
                  color: "#6B6B6B",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
                aria-label="Clear"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          {/* Search button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "52px",
              backgroundColor: loading ? "#D1D5DB" : "#FFCD11",
              border: "2px solid " + (loading ? "#D1D5DB" : "#FFCD11"),
              borderRadius: "0 4px 4px 0",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>

      {/* Map toggle + Filter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        {/* Toggle */}
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", userSelect: "none" }}>
          <div
            onClick={() => setMapView(!mapView)}
            style={{
              width: "44px",
              height: "24px",
              borderRadius: "12px",
              backgroundColor: mapView ? "#1A1A1A" : "#D1D5DB",
              position: "relative",
              transition: "background 0.2s",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: mapView ? "23px" : "3px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          <span style={{ fontSize: "14px", color: "#1A1A1A", fontWeight: 500 }}>Map View</span>
        </label>

        {/* Filter button */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            backgroundColor: "#fff",
            border: "1px solid #1A1A1A",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#1A1A1A",
            cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          Filter
        </button>
      </div>

      {/* Store list */}
      <div style={{ flex: 1, overflowY: "auto", maxHeight: "360px" }}>
        {results.map((store, idx) => {
          const selected = store.id === selectedId;
          return (
            <div
              key={store.id}
              onClick={() => setSelectedId(store.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "16px 24px",
                borderBottom: idx < results.length - 1 ? "1px solid #E5E5E5" : "none",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAFB"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#fff"; }}
            >
              {/* Radio */}
              <div style={{ paddingTop: "2px" }}>
                <RadioCircle selected={selected} />
              </div>

              {/* Store info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A1A" }}>
                  {store.dealerName}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A1A", marginTop: "2px" }}>
                  {store.locationName}
                </div>
                <div style={{ fontSize: "13px", color: "#374151", marginTop: "2px" }}>
                  {store.address}, {store.city} {store.zip}
                </div>
              </div>

              {/* Distance + chevron */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  {store.isClosest && (
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#1A1A1A" }}>Closest</div>
                  )}
                  {store.distance != null && (
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>
                      {store.distance} mi
                    </div>
                  )}
                </div>
                <ChevronDown />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E5E5E5", padding: "16px 24px" }}>
        <button
          onClick={handleConfirm}
          disabled={!selectedId}
          style={{
            padding: "14px 28px",
            backgroundColor: selectedId ? "#FFCD11" : "#D1D5DB",
            color: "#1A1A1A",
            border: "none",
            borderRadius: "2px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: selectedId ? "pointer" : "not-allowed",
            letterSpacing: "0.01em",
          }}
        >
          Select Store
        </button>
      </div>
    </div>
  );
}
