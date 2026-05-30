import { useState, useEffect, useCallback, useMemo } from "react";
import "./Converter.css";

const CURRENCY_META = {
  USD: { country: "us", name: "US Dollar", region: "Americas" },
  EUR: { country: "eu", name: "Euro", region: "Europe" },
  GBP: { country: "gb", name: "British Pound", region: "Europe" },
  JPY: { country: "jp", name: "Japanese Yen", region: "Asia" },
  AUD: { country: "au", name: "Australian Dollar", region: "Oceania" },
  CAD: { country: "ca", name: "Canadian Dollar", region: "Americas" },
  CHF: { country: "ch", name: "Swiss Franc", region: "Europe" },
  CNY: { country: "cn", name: "Chinese Yuan", region: "Asia" },
 Swedish: { country: "se", name: "Swedish Krona", region: "Europe" },
  NZD: { country: "nz", name: "New Zealand Dollar", region: "Oceania" },
  MXN: { country: "mx", name: "Mexican Peso", region: "Americas" },
  SGD: { country: "sg", name: "Singapore Dollar", region: "Asia" },
  HKD: { country: "hk", name: "Hong Kong Dollar", region: "Asia" },
  NOK: { country: "no", name: "Norwegian Krone", region: "Europe" },
  KRW: { country: "kr", name: "South Korean Won", region: "Asia" },
  TRY: { country: "tr", name: "Turkish Lira", region: "Europe" },
  INR: { country: "in", name: "Indian Rupee", region: "Asia" },
  RUB: { country: "ru", name: "Russian Ruble", region: "Europe" },
  BRL: { country: "br", name: "Brazilian Real", region: "Americas" },
  ZAR: { country: "za", name: "South African Rand", region: "Africa" },
  DKK: { country: "dk", name: "Danish Krone", region: "Europe" },
  PLN: { country: "pl", name: "Polish Złoty", region: "Europe" },
  THB: { country: "th", name: "Thai Baht", region: "Asia" },
  IDR: { country: "id", name: "Indonesian Rupiah", region: "Asia" },
  HUF: { country: "hu", name: "Hungarian Forint", region: "Europe" },
  CZK: { country: "cz", name: "Czech Koruna", region: "Europe" },
  ILS: { country: "il", name: "Israeli Shekel", region: "Middle East" },
  CLP: { country: "cl", name: "Chilean Peso", region: "Americas" },
  PHP: { country: "ph", name: "Philippine Peso", region: "Asia" },
  AED: { country: "ae", name: "UAE Dirham", region: "Middle East" },
  COP: { country: "co", name: "Colombian Peso", region: "Americas" },
  SAR: { country: "sa", name: "Saudi Riyal", region: "Middle East" },
  MYR: { country: "my", name: "Malaysian Ringgit", region: "Asia" },
  RON: { country: "ro", name: "Romanian Leu", region: "Europe" },
  BGN: { country: "bg", name: "Bulgarian Lev", region: "Europe" },
  HRK: { country: "hr", name: "Croatian Kuna", region: "Europe" },
  ISK: { country: "is", name: "Icelandic Króna", region: "Europe" },
  VND: { country: "vn", name: "Vietnamese Dong", region: "Asia" },
  PKR: { country: "pk", name: "Pakistani Rupee", region: "Asia" },
  BDT: { country: "bd", name: "Bangladeshi Taka", region: "Asia" },
  EGP: { country: "eg", name: "Egyptian Pound", region: "Africa" },
  NGN: { country: "ng", name: "Nigerian Naira", region: "Africa" },
  KES: { country: "ke", name: "Kenyan Shilling", region: "Africa" },
  GHS: { country: "gh", name: "Ghanaian Cedi", region: "Africa" },
  MAD: { country: "ma", name: "Moroccan Dirham", region: "Africa" },
  TWD: { country: "tw", name: "Taiwan Dollar", region: "Asia" },
  QAR: { country: "qa", name: "Qatari Riyal", region: "Middle East" },
  KWD: { country: "kw", name: "Kuwaiti Dinar", region: "Middle East" },
  OMR: { country: "om", name: "Omani Rial", region: "Middle East" },
  BHD: { country: "bh", name: "Bahraini Dinar", region: "Middle East" },
  JOD: { country: "jo", name: "Jordanian Dinar", region: "Middle East" },
  LKR: { country: "lk", name: "Sri Lankan Rupee", region: "Asia" },
  NPR: { country: "np", name: "Nepalese Rupee", region: "Asia" },
  MMK: { country: "mm", name: "Myanmar Kyat", region: "Asia" },
  UAH: { country: "ua", name: "Ukrainian Hryvnia", region: "Europe" },
  DZD: { country: "dz", name: "Algerian Dinar", region: "Africa" },
  ARS: { country: "ar", name: "Argentine Peso", region: "Americas" },
  PEN: { country: "pe", name: "Peruvian Sol", region: "Americas" },
  VEF: { country: "ve", name: "Venezuelan Bolívar", region: "Americas" },
  UYU: { country: "uy", name: "Uruguayan Peso", region: "Americas" },
  BOB: { country: "bo", name: "Bolivian Boliviano", region: "Americas" },
  PYG: { country: "py", name: "Paraguayan Guaraní", region: "Americas" },
  GTQ: { country: "gt", name: "Guatemalan Quetzal", region: "Americas" },
  HNL: { country: "hn", name: "Honduran Lempira", region: "Americas" },
  CRC: { country: "cr", name: "Costa Rican Colón", region: "Americas" },
  DOP: { country: "do", name: "Dominican Peso", region: "Americas" },
  JMD: { country: "jm", name: "Jamaican Dollar", region: "Americas" },
  TTD: { country: "tt", name: "Trinidad Dollar", region: "Americas" },
  BBD: { country: "bb", name: "Barbadian Dollar", region: "Americas" },
  XOF: { country: "sn", name: "West African CFA", region: "Africa" },
  XAF: { country: "cm", name: "Central African CFA", region: "Africa" },
  TZS: { country: "tz", name: "Tanzanian Shilling", region: "Africa" },
  UGX: { country: "ug", name: "Ugandan Shilling", region: "Africa" },
  ZMW: { country: "zm", name: "Zambian Kwacha", region: "Africa" },
  MZN: { country: "mz", name: "Mozambican Metical", region: "Africa" },
  ETB: { country: "et", name: "Ethiopian Birr", region: "Africa" },
  RWF: { country: "rw", name: "Rwandan Franc", region: "Africa" },
  MUR: { country: "mu", name: "Mauritian Rupee", region: "Africa" },
};

const POPULAR = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "PHP"];
const REGIONS = ["All", "Americas", "Europe", "Asia", "Africa", "Middle East", "Oceania"];

function FlagImg({ code }) {
  const meta = CURRENCY_META[code];
  if (!meta) return <span className="flag-placeholder">🌐</span>;
  return (
    <img
      src={`https://flagcdn.com/w40/${meta.country}.png`}
      alt={meta.country}
      className="flag-img"
      onError={(e) => { e.target.style.display = "none"; }}
    />
  );
}

function CurrencyDropdown({ value, onChange, rates, label, searchable = true }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return Object.keys(rates).filter((c) => {
      const meta = CURRENCY_META[c];
      return (
        c.toLowerCase().includes(q) ||
        (meta && meta.name.toLowerCase().includes(q))
      );
    });
  }, [rates, search]);

  return (
    <div className="dropdown-wrap">
      <label className="input-label">{label}</label>
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <FlagImg code={value} />
        <span className="dd-code">{value}</span>
        <span className="dd-name">{CURRENCY_META[value]?.name || value}</span>
        <span className="dd-arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="dropdown-menu">
          {searchable && (
            <div className="dd-search-wrap">
              <span className="dd-search-icon">🔍</span>
              <input
                className="dd-search"
                placeholder="Search currency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          )}
          <div className="dd-list">
            {filtered.map((c) => (
              <button
                key={c}
                type="button"
                className={`dd-item ${c === value ? "active" : ""}`}
                onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
              >
                <FlagImg code={c} />
                <span className="dd-item-code">{c}</span>
                <span className="dd-item-name">{CURRENCY_META[c]?.name || c}</span>
                {POPULAR.includes(c) && <span className="popular-tag">★</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Converter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PHP");
  const [rates, setRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableSearch, setTableSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [highlight, setHighlight] = useState("popular");
  const [activeTab, setActiveTab] = useState("converter");

  const API_KEY = "f2a195e30ac72f94027a64b1";

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (data.result !== "success") throw new Error(data["error-type"] || "API error");
      setRates(data.conversion_rates);
      setLastUpdated(new Date());
    } catch (e) {
      setError("Could not fetch live rates. Check your API key or connection.");
    } finally {
      setLoading(false);
    }
  }, [from]);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  useEffect(() => {
    const id = setInterval(fetchRates, 60000);
    return () => clearInterval(id);
  }, [fetchRates]);

  const converted = useMemo(() => {
    if (!rates[to] || !amount) return "";
    const val = parseFloat(amount) * rates[to];
    return isNaN(val) ? "" : val.toLocaleString("en-US", { maximumFractionDigits: 4 });
  }, [amount, to, rates]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const filteredTable = useMemo(() => {
    return Object.entries(rates).filter(([code]) => {
      const meta = CURRENCY_META[code];
      const q = tableSearch.toLowerCase();
      const matchSearch =
        code.toLowerCase().includes(q) ||
        (meta && meta.name.toLowerCase().includes(q));
      const matchRegion =
        regionFilter === "All" || (meta && meta.region === regionFilter);
      const matchHighlight =
        highlight === "all" ||
        (highlight === "popular" && POPULAR.includes(code)) ||
        (highlight === "region" && meta && meta.region === (CURRENCY_META[to]?.region));
      return matchSearch && matchRegion && matchHighlight;
    });
  }, [rates, tableSearch, regionFilter, highlight, to]);

  const rate1 = rates[to] ? rates[to].toFixed(6) : "—";

  return (
    <div className="converter-page-wrapper">
      <div className="vacation-backdrop"></div>

      <nav className="global-navbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: '#e4ecea',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <div className="nav-logo" style={{ 
          fontFamily: "'Syne', sans-serif", 
          fontWeight: 800, 
          fontSize: '22px', 
          letterSpacing: '-0.5px',
          color: '#1d2d44' 
        }}>
          TRAVEL BUDDY
        </div>
        
        <div className="nav-links" style={{ 
          display: 'flex', 
          gap: '30px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <a href="#home" style={{ color: '#4a5759', textDecoration: 'none' }}>HOME</a>
          <a href="#discoveries" style={{ color: '#4a5759', textDecoration: 'none' }}>DISCOVERIES</a>
          <a href="#weather" style={{ color: '#4a5759', textDecoration: 'none' }}>WEATHER</a>
          <a href="#converter" style={{ color: '#0070ba', textDecoration: 'none', borderBottom: '2px solid #0070ba', paddingBottom: '4px' }}>CONVERTER</a>
        </div>

        <div className="nav-search-box" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Search destinations" 
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.15)',
              fontSize: '12px',
              outline: 'none'
            }} 
          />
          <button style={{
            background: '#000',
            color: '#fff',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>Search</button>
        </div>
      </nav>

      <main className="converter-main-content">
        <div className="converter-header" style={{ borderBottom: 'none', background: 'transparent', padding: '10px 0 20px 0' }}>
          <div className="header-left">
            <span className="logo-text">Currency Desk</span>
          </div>
          <div className="header-right">
            {lastUpdated && (
              <span className="live-badge">
                <span className="live-dot" />
                LIVE · {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button className="refresh-btn" onClick={fetchRates} title="Refresh rates">
              {loading ? "⟳" : "↺"}
            </button>
          </div>
        </div>

        <nav className="tabs" style={{ padding: '0 0 20px 0' }}>
          <button className={`tab ${activeTab === "converter" ? "active" : ""}`} onClick={() => setActiveTab("converter")}>
            ⇄ Converter
          </button>
          <button className={`tab ${activeTab === "index" ? "active" : ""}`} onClick={() => setActiveTab("index")}>
            ☰ Rate Index
          </button>
        </nav>

        {activeTab === "converter" && (
          <div className="converter-section">
            <div className="popular-pairs">
              <span className="pairs-label">Popular pairs →</span>
              {POPULAR.slice(0, 6).map((c) => (
                <button
                  key={c}
                  className={`pair-chip ${to === c ? "active" : ""}`}
                  onClick={() => setTo(c)}
                >
                  <FlagImg code={c} /> {c}
                </button>
              ))}
            </div>

            <div className="converter-card">
              {error && <div className="error-banner">{error}</div>}

              <div className="converter-grid">
                <div className="field-group">
                  <CurrencyDropdown value={from} onChange={setFrom} rates={rates} label="From" />
                  <label className="input-label mt">Amount</label>
                  <input
                    className="amount-input"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="swap-col">
                  <button className="swap-btn" onClick={handleSwap} title="Swap currencies">
                    ⇄
                  </button>
                  <div className="rate-pill">
                    1 {from} = {loading ? "…" : rate1} {to}
                  </div>
                </div>

                <div className="field-group">
                  <CurrencyDropdown value={to} onChange={setTo} rates={rates} label="To" />
                  <label className="input-label mt">Converted</label>
                  <div className="result-box">
                    {loading ? (
                      <span className="loading-shimmer">Loading…</span>
                    ) : (
                      <>
                        <span className="result-value">{converted || "—"}</span>
                        <span className="result-code">{to}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="quick-amounts">
                <span className="pairs-label">Quick →</span>
                {[1, 10, 50, 100, 500, 1000].map((q) => (
                  <button key={q} className={`quick-chip ${amount === String(q) ? "active" : ""}`} onClick={() => setAmount(String(q))}>
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="stats-row">
              {POPULAR.slice(0, 5).map((c) => {
                if (!rates[c]) return null;
                return (
                  <div key={c} className="stat-card" onClick={() => setTo(c)}>
                    <div className="stat-header">
                      <FlagImg code={c} />
                      <span className="stat-code">{c}</span>
                    </div>
                    <div className="stat-rate">{rates[c]?.toFixed(4)}</div>
                    <div className="stat-name">{CURRENCY_META[c]?.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "index" && (
          <div className="index-section">
            <div className="filters-bar">
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="table-search"
                  placeholder="Search currencies..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                />
                {tableSearch && (
                  <button className="clear-btn" onClick={() => setTableSearch("")}>✕</button>
                )}
              </div>

              <div className="filter-group">
                <span className="filter-label">Region:</span>
                <div className="filter-chips">
                  {REGIONS.map((r) => (
                    <button
                      key={r}
                      className={`filter-chip ${regionFilter === r ? "active" : ""}`}
                      onClick={() => setRegionFilter(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <span className="filter-label">Show:</span>
                <div className="filter-chips">
                  <button className={`filter-chip ${highlight === "all" ? "active" : ""}`} onClick={() => setHighlight("all")}>All</button>
                  <button className={`filter-chip ${highlight === "popular" ? "active" : ""}`} onClick={() => setHighlight("popular")}>★ Popular</button>
                  <button className={`filter-chip ${highlight === "region" ? "active" : ""}`} onClick={() => setHighlight("region")}>Same Region</button>
                </div>
              </div>
            </div>

            <div className="table-wrap">
              <table className="rate-table">
                <thead>
                  <tr>
                    <th>Flag</th>
                    <th>Code</th>
                    <th>Currency</th>
                    <th>Region</th>
                    <th>Rate (1 {from})</th>
                    <th>Rate (1 {to})</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="shimmer-row">
                        {Array.from({ length: 7 }).map((__, j) => (
                          <td key={j}><div className="shimmer-cell" /></td>
                        ))}
                      </tr>
                    ))
                  ) : filteredTable.length === 0 ? (
                    <tr><td colSpan={7} className="no-results">No currencies match your filters.</td></tr>
                  ) : (
                    filteredTable.map(([code, rate]) => {
                      const meta = CURRENCY_META[code];
                      const isPopular = POPULAR.includes(code);
                      const rateFromTo = rates[to] ? (rate / rates[to]).toFixed(6) : "—";
                      return (
                        <tr
                          key={code}
                          className={`rate-row ${isPopular ? "popular-row" : ""} ${code === to ? "highlight-row" : ""}`}
                          onClick={() => setTo(code)}
                        >
                          <td><FlagImg code={code} /></td>
                          <td>
                            <span className="code-badge">{code}</span>
                            {isPopular && <span className="star-badge">★</span>}
                          </td>
                          <td className="name-cell">{meta?.name || code}</td>
                          <td>
                            <span className={`region-tag region-${meta?.region?.toLowerCase().replace(" ", "-") || "other"}`}>
                              {meta?.region || "—"}
                            </span>
                          </td>
                          <td className="rate-cell">{typeof rate === "number" ? rate.toFixed(4) : rate}</td>
                          <td className="rate-cell dim">{rateFromTo}</td>
                          <td>
                            <button 
                              className="use-btn" 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setTo(code); 
                                setActiveTab("converter"); 
                              }}
                            >
                              Use →
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-count">
              Showing {filteredTable.length} currencies · Base: {from}
            </div>
          </div>
        )}
      </main>

      <footer className="converter-footer">
        <span>Powered by <a href="https://v6.exchangerate-api.com/" target="_blank" rel="noreferrer">ExchangeRate-API</a></span>
        <span>·</span>
        <span>Rates update automatically</span>
        {lastUpdated && <span>· Last sync: {lastUpdated.toLocaleTimeString()}</span>}
      </footer>
    </div>
  );
}