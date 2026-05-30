// Discoveries.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Discoveries.css";

function Discoveries({
  discoveries,
  searchTerm,
  setSearchTerm,
  fetchDiscoveries,
  loadRecommended,
  loading,
}) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 1. Sync search if a user redirected from another page via router state
  useEffect(() => {
    if (location.state?.search) {
      const searchedPlace = location.state.search;
      setSearchTerm(searchedPlace);
      fetchDiscoveries(searchedPlace);
    }
  }, [location.state, fetchDiscoveries, setSearchTerm]);

  // 2. Debounced search input handler (auto-fetches after typing stops)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchDiscoveries(searchTerm);
      }
    }, 700);
    return () => clearTimeout(delay);
  }, [searchTerm, fetchDiscoveries]);

  // 3. Manual form submit action
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchDiscoveries(searchTerm);
    } else {
      loadRecommended();
    }
  };

  // 4. Category client-side filter
  const filteredDiscoveries = discoveries.filter(
    (d) => selectedCategory === "all" || d.category === selectedCategory
  );

  return (
    <main className="discoveries">
      <h1>Travel Discoveries</h1>

      <form className="discoveries-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
            loadRecommended();
          }}
        >
          Clear
        </button>
      </form>

      <div className="filter-buttons">
        {["all", "Tourist Spots", "Restaurant", "Hotels"].map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="section-label">
        {searchTerm.trim() ? `Results for "${searchTerm}"` : "Recommended Places"}
      </p>

      {loading ? (
        <p className="loading">Loading destinations...</p>
      ) : (
        <div className="discoveries-grid">
          {filteredDiscoveries.map((d) => (
            <div className="discovery-card" key={d.id}>
              <img src={d.image} alt={d.title} />
              <div className="card-body">
                <h3>{d.title}</h3>
                <p className="location">{d.location}</p>
                <p className="description">{d.description}</p>
                <p className="rating">Ratings: {d.rating}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${d.lat},${d.lon}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Discoveries;