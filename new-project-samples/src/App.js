import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Weather from "./Components/Weather/Weather";
import Converter from "./Components/Converter/Converter";
import Discoveries from "./Components/Discoveries/Discoveries";

import "./App.css";
import React from "react";

function Home() {
  const destinations = [
    {
  title: "Mountain Escape",
  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },

    {
      title: "Ocean Breeze",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Adventure Peak",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Island Paradise",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",

      
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main className="hero">
        <div className="overlay" />

        <div className="hero-content">

          {/* HERO TEXT */}
          <div className="text">
            <p>Your Dream</p>

            <h1>VACATION</h1>

            <span className="hero-description">
              Discover breathtaking destinations and plan your perfect
              journey with us. Your adventure starts here—explore,
              dream, and go.
            </span>
          </div>

          {/* DESTINATION CARDS */}
          <div className="card-container">
            {destinations.map((place, index) => (
              <div key={index} className="card">
                <img src={place.image} alt={place.title} />

                <div className="card-overlay" />

                <div className="card-title">
                  {place.title}
                </div>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="hero-buttons">
            <button className="explore-btn">
              <Link to="/discoveries">LET'S EXPLORE</Link>
            </button>

            <button className="contact-btn">
              CONTACT
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discoveries" element={<Discoveries />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </>
  );
}

export default App;