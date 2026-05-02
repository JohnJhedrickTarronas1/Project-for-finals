import React, { useState } from "react";
import "./Discoveries.css";

function Discoveries() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a search term");
      return;
    }

    setError("");
    console.log(search);
  };

  return (
    <div className="discoveries-container">
      <h1>Discover Amazing Places</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (error) setError("");
          }}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Discoveries;