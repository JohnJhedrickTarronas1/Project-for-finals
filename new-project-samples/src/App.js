import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Weather from "./Components/Weather/Weather";
import Converter from "./Components/Converter/Converter";
import Discoveries from "./Components/Discoveries/Discoveries";
import "./App.css";

const GEO_API_KEY = process.env.REACT_APP_GEOAPIFY_KEY;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const RECOMMENDED_PLACES = ["Boracay", "Palawan", "Siargao", "Bohol", "Cebu", "Batanes"];

const generateDescription = (name, props, category) => {
  if (props?.formatted) return props.formatted;
  if (category === "Restaurant") return `${name} is a local restaurant offering delicious food and a great dining experience.`;
  if (category === "Hotels") return `${name} is a comfortable accommodation option with amenities for travelers.`;
  if (category === "Tourist Spots") return `${name} is a popular tourist destination known for scenic views and attractions.`;
  return `${name} is a notable place worth visiting for travelers and explorers.`;
};

const mapCategory = (categories = []) => {
  if (categories.some((c) => c.includes("tourism"))) return "Tourist Spots";
  if (categories.some((c) => c.includes("catering"))) return "Restaurant";
  if (categories.some((c) => c.includes("accommodation"))) return "Hotels";
  return "Other";
};

function Home({ discoveries, searchTerm, setSearchTerm, fetchDiscoveries, loadRecommended }) {
  const featuredPlaces = discoveries.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchDiscoveries(searchTerm);
    } else {
      loadRecommended();
    }
  };

  return (
    <div className="app">
      <main className="hero">
        <div className="overlay" />
        <div className="hero-content">
          <div className="text">
            <p>Your Dream</p>
            <h1>VACATION</h1>
            <span className="hero-description">
              Discover breathtaking destinations and plan your perfect journey with us. Your adventure starts here—explore, dream, and go.
            </span>

            <form className="hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search destination..."
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
          </div>

          <div className="card-container">
            {featuredPlaces.length > 0 ? (
              featuredPlaces.map((place) => (
                <Link to="/discoveries" className="card" key={place.id} style={{ textDecoration: "none" }}>
                  <img src={place.image} alt={place.title} />
                  <div className="card-overlay" />
                  <div className="card-title">{place.title}</div>
                </Link>
              ))
            ) : (
              <div className="card loading-card">
                <p>Loading destinations...</p>
              </div>
            )}
          </div>

          <div className="hero-buttons">
            <Link to="/discoveries">
              <button className="explore-btn">LET'S EXPLORE</button>
            </Link>
            <button className="contact-btn">CONTACT</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [discoveries, setDiscoveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUnsplashImage = async (query) => {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_API_KEY}`);
      const data = await res.json();
      return data.results?.[0]?.urls?.regular || `https://source.unsplash.com/800x600/?${query}`;
    } catch {
      return `https://source.unsplash.com/800x600/?${query}`;
    }
  };

  const geocodePlace = async (place) => {
    try {
      const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&apiKey=${GEO_API_KEY}`);
      const data = await res.json();
      if (data.features?.length > 0) {
        return { lat: data.features[0].properties.lat, lon: data.features[0].properties.lon };
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const fetchPlacesAt = useCallback(async (lat, lon, label) => {
    const res = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant,accommodation.hotel&filter=circle:${lon},${lat},5000&limit=3&apiKey=${GEO_API_KEY}`);
    const data = await res.json();
    if (!data.features) return [];

    return Promise.all(
      data.features.map(async (item, index) => {
        const props = item.properties;
        const name = props.name || props.formatted || label;
        const category = mapCategory(props.categories);
        return {
          id: `${label}-${index}`,
          title: name,
          location: props.city || props.country || label,
          category,
          image: await fetchUnsplashImage(name),
          description: generateDescription(name, props, category),
          rating: (Math.random() + 4).toFixed(1),
          lat: props.lat,
          lon: props.lon,
        };
      })
    );
  }, []);

  const loadRecommended = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        RECOMMENDED_PLACES.map(async (place) => {
          const geo = await geocodePlace(place);
          if (!geo) return [];
          return fetchPlacesAt(geo.lat, geo.lon, place);
        })
      );
      setDiscoveries(results.flat());
    } catch (err) {
      console.error(err);
      setDiscoveries([]);
    } finally {
      setLoading(false);
    }
  }, [fetchPlacesAt]);

  const fetchDiscoveries = useCallback(async (query = "") => {
    setLoading(true);
    try {
      const geo = await geocodePlace(query);
      const lat = geo?.lat ?? 14.6;
      const lon = geo?.lon ?? 121.0;
      const res = await fetch(`https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant,accommodation.hotel&filter=circle:${lon},${lat},5000&limit=12&apiKey=${GEO_API_KEY}`);
      const data = await res.json();

      if (!data.features) {
        setDiscoveries([]);
        return;
      }

      const formatted = await Promise.all(
        data.features.map(async (item, index) => {
          const props = item.properties;
          const name = props.name || props.formatted || "Unknown Place";
          const category = mapCategory(props.categories);
          return {
            id: index,
            title: name,
            location: props.city || props.country || "Unknown",
            category,
            image: await fetchUnsplashImage(name),
            description: generateDescription(name, props, category),
            rating: (Math.random() + 4).toFixed(1),
            lat: props.lat,
            lon: props.lon,
          };
        })
      );
      setDiscoveries(formatted);
    } catch (err) {
      console.error(err);
      setDiscoveries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (discoveries.length === 0) {
      loadRecommended();
    }
  }, [discoveries.length, loadRecommended]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              discoveries={discoveries}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              fetchDiscoveries={fetchDiscoveries}
              loadRecommended={loadRecommended}
            />
          }
        />
        <Route
          path="/discoveries"
          element={
            <Discoveries
              discoveries={discoveries}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              fetchDiscoveries={fetchDiscoveries}
              loadRecommended={loadRecommended}
              loading={loading}
            />
          }
        />
        <Route path="/weather" element={<Weather />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </>
  );
}

export default App;