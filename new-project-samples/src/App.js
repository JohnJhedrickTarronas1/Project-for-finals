import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './App.css';
import "./Components/Discoveries/Discoveries.js";

/* ================= HOME PAGE ================= */

function DreamVacationApp() {
  const destinations = [
    {
      title: 'Island Paradise',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Mountain Escape',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Adventure Peak',
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    const interval = setInterval(() => {
      if (!container) return;

      const scrollAmount = 280;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">✦</div>

        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Map</a>
          <a href="#">Itinerary</a>
        </nav>

        <div className="search-bar">
          <input type="text" placeholder="Search destinations..." />
          <button>Search</button>
        </div>
      </header>

      <main className="hero">
        <div className="overlay" />

        <div className="sidebar">
          <div className="icon">f</div>
          <div className="icon">t</div>
          <div className="icon">◎</div>
        </div>

        <div className="hero-content">
          <div className="text">
            <p>Your Dream</p>
            <h1>VACATION</h1>

            <button
              className="cta-btn"
              onClick={() => navigate('/Discoveries.js')}
            >
              Explore Now
            </button>
          </div>

          <div className="card-container" ref={scrollRef}>
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

/* ================= DISCOVERIES PAGE ================= */

function Discoveries() {
  return (
    <div
      style={{
        height: '100vh',
        background: '#111',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
      }}
    >
      Welcome to Discoveries Page 🌍
    </div>
  );
}

/* ================= MAIN APP ================= */

function App() {
  return (
    <Routes>
      <Route path="/" element={<DreamVacationApp />} />
      <Route path="/discoveries" element={<Discoveries />} />
    </Routes>
  );
}

export default App;