import React, { useState } from "react";

export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance?: number;
  services?: string[];
  hours?: string;
  lat?: number;
  lng?: number;
}

export interface DealerLocatorWidgetProps {
  dealers?: Dealer[];
  onSearch?: (query: string) => Dealer[] | Promise<Dealer[]>;
  onDealerSelect?: (dealer: Dealer) => void;
  maxResults?: number;
  title?: string;
}

const MOCK_DEALERS: Dealer[] = [
  {
    id: "1",
    name: "Thompson CAT",
    address: "2401 Thomas Ave S",
    city: "Birmingham",
    state: "AL",
    zip: "35205",
    phone: "(205) 591-5100",
    distance: 2.1,
    services: ["Sales", "Rental", "Parts", "Service"],
    hours: "Mon–Fri 7:00am–5:30pm",
  },
  {
    id: "2",
    name: "Blanchard Machinery",
    address: "200 Research Dr",
    city: "Columbia",
    state: "SC",
    zip: "29203",
    phone: "(803) 822-1206",
    distance: 5.4,
    services: ["Sales", "Parts", "Service"],
    hours: "Mon–Fri 7:30am–5:00pm",
  },
  {
    id: "3",
    name: "Foley Equipment",
    address: "800 S West St",
    city: "Wichita",
    state: "KS",
    zip: "67213",
    phone: "(316) 943-4211",
    distance: 8.7,
    services: ["Sales", "Rental", "Parts", "Service", "Financing"],
    hours: "Mon–Fri 7:00am–5:00pm, Sat 8:00am–12:00pm",
  },
];

function ServiceBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        backgroundColor: "#F5F5F5",
        border: "1px solid #E5E5E5",
        borderRadius: "12px",
        fontSize: "11px",
        color: "#374151",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

export function DealerLocatorWidget({
  dealers,
  onSearch,
  onDealerSelect,
  maxResults = 5,
  title = "Find a CAT Dealer",
}: DealerLocatorWidgetProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setSelectedId(null);

    try {
      let found: Dealer[] = [];
      if (onSearch) {
        found = await onSearch(query);
      } else if (dealers) {
        found = dealers.filter(
          (d) =>
            d.city.toLowerCase().includes(query.toLowerCase()) ||
            d.state.toLowerCase().includes(query.toLowerCase()) ||
            d.zip.includes(query) ||
            d.name.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        // Use mock data for demo
        found = MOCK_DEALERS.filter(
          (d) =>
            d.city.toLowerCase().includes(query.toLowerCase()) ||
            d.state.toLowerCase().includes(query.toLowerCase()) ||
            d.zip.includes(query) ||
            d.name.toLowerCase().includes(query.toLowerCase())
        );
        if (found.length === 0) found = MOCK_DEALERS; // fallback: show all for demo
      }
      setResults(found.slice(0, maxResults));
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (dealer: Dealer) => {
    setSelectedId(dealer.id);
    onDealerSelect?.(dealer);
  };

  return (
    <div
      className="cat-widget-root"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "480px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: "#1A1A1A", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              backgroundColor: "#FFCD11",
              padding: "2px 8px",
              fontWeight: 900,
              fontSize: "14px",
              color: "#1A1A1A",
            }}
          >
            CAT
          </div>
          <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "15px" }}>{title}</span>
        </div>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} style={{ padding: "16px 20px", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2"
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, state, or ZIP code"
              style={{
                width: "100%",
                padding: "10px 12px 10px 34px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 18px",
              backgroundColor: loading ? "#D1D5DB" : "#FFCD11",
              color: "#1A1A1A",
              border: "none",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "…" : "Search"}
          </button>
        </div>
      </form>

      {/* Results */}
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {!searched && (
          <div
            style={{
              padding: "32px 20px",
              textAlign: "center",
              color: "#9CA3AF",
              fontSize: "14px",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📍</div>
            Enter your location to find the nearest CAT dealer.
          </div>
        )}

        {searched && results.length === 0 && !loading && (
          <div style={{ padding: "32px 20px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>
            No dealers found near <strong>"{query}"</strong>. Try a different location.
          </div>
        )}

        {results.map((dealer, idx) => (
          <div
            key={dealer.id}
            onClick={() => handleSelect(dealer)}
            style={{
              padding: "14px 20px",
              borderBottom: idx < results.length - 1 ? "1px solid #e5e5e5" : "none",
              cursor: "pointer",
              backgroundColor: selectedId === dealer.id ? "#FFFBEB" : "#ffffff",
              borderLeft: selectedId === dealer.id ? "3px solid #FFCD11" : "3px solid transparent",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              if (selectedId !== dealer.id)
                (e.currentTarget as HTMLElement).style.backgroundColor = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              if (selectedId !== dealer.id)
                (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}>{dealer.name}</div>
              {dealer.distance != null && (
                <div style={{ fontSize: "12px", color: "#FFCD11", fontWeight: 700, flexShrink: 0 }}>
                  {dealer.distance} mi
                </div>
              )}
            </div>

            <div style={{ fontSize: "13px", color: "#6B6B6B", marginTop: "2px" }}>
              {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
            </div>

            <div style={{ fontSize: "13px", color: "#374151", marginTop: "4px" }}>
              📞 {dealer.phone}
            </div>

            {dealer.hours && (
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>🕐 {dealer.hours}</div>
            )}

            {dealer.services && dealer.services.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {dealer.services.map((s) => (
                  <ServiceBadge key={s} label={s} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#F9FAFB",
            borderTop: "1px solid #e5e5e5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: "#6B6B6B" }}>
            Showing {results.length} dealer{results.length !== 1 ? "s" : ""}
          </span>
          <a href="#" style={{ fontSize: "12px", color: "#FFCD11", fontWeight: 600, textDecoration: "none" }}>
            View all on map →
          </a>
        </div>
      )}
    </div>
  );
}
