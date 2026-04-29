import React, { use, useState } from "react";

function Discoveries() {
  const [search, setSearch]= useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
    </form>
  </div>

  )
}

export default Discoveries;