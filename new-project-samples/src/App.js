import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Weather from "./Components/Weather/Weather";
import Converter from "./Components/Converter/Converter";
import Discoveries from "./Components/Discoveries/Discoveries";
import "./App.css";


function Home() {
  const destinations = [
    {
      title: "Island Paradise",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Mountain Escape",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Adventure Peak",
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
          <div className="text">
            <p>Your Dream</p>
            <h1>VACATION</h1>
          </div>

          <div className="card-container">
            {destinations.map((place, index) => (
              <div key={index} className="card">
                <img src={place.image} alt={place.title} />
                <div className="card-overlay" />
                <div className="card-title">{place.title}</div>
              </div>
            ))}
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