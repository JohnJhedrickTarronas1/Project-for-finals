import React, { useState } from "react";

function Discoveries() {
  const [search, setSearch]= useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search){
      setError("No findings");
      return;
    }
    setError("")
    console.log(search);
  };
  
  return (
  <div>
    <h1>Discover Amazing Places</h1>
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>

    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>

  )
}

export default Discoveries;