import { useState, useEffect, useCallback } from "react";
import "./Discoveries.css";

const GEO_API_KEY = process.env.REACT_APP_GEOAPIFY_KEY;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const RECOMMENDED_PLACES = [
  "Boracay",
  "Palawan",
  "Siargao",
  "Bohol",
  "Cebu",
  "Batanes",
];

const generateDescription = (name, props, category) => {
  if (props?.formatted) return props.formatted;

  if (category === "Restaurant") {
    return `${name} is a local restaurant offering delicious food and a great dining experience.`;
  }

  if (category === "Hotels") {
    return `${name} is a comfortable accommodation option with amenities for travelers.`;
  }

  if (category === "Tourist Spots") {
    return `${name} is a popular tourist destination known for scenic views and attractions.`;
  }

  return `${name} is a notable place worth visiting for travelers and explorers.`;
};

function Discoveries() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState(true);

  const mapCategory = (categories = []) => {
    if (categories.some((c) => c.includes("tourism"))) return "Tourist Spots";
    if (categories.some((c) => c.includes("catering"))) return "Restaurant";
    if (categories.some((c) => c.includes("accommodation"))) return "Hotels";
    return "Other";
  };

  const fetchUnsplashImage = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&per_page=1&client_id=${UNSPLASH_API_KEY}`
      );

      const data = await res.json();

      return (
        data.results?.[0]?.urls?.regular ||
        `https://source.unsplash.com/800x600/?${query}`
      );
    } catch {
      return `https://source.unsplash.com/800x600/?${query}`;
    }
  };

  const geocodePlace = async (place) => {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          place
        )}&apiKey=${GEO_API_KEY}`
      );

      const data = await res.json();

      if (data.features?.length > 0) {
        const coords = data.features[0].properties;

        return {
          lat: coords.lat,
          lon: coords.lon,
        };
      }
    } catch (err) {
      console.error(err);
    }

    return null;
  };

  const fetchPlacesAt = useCallback(async (lat, lon, label) => {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant,accommodation.hotel&filter=circle:${lon},${lat},5000&limit=3&apiKey=${GEO_API_KEY}`
    );
  
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
    setIsRecommended(true);

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

  const fetchDiscoveries = async (query = "") => {
    setLoading(true);
    setIsRecommended(false);

    try {
      const geo = await geocodePlace(query);

      const lat = geo?.lat ?? 14.6;
      const lon = geo?.lon ?? 121.0;

      const res = await fetch(
        `https://api.geoapify.com/v2/places?categories=tourism.sights,catering.restaurant,accommodation.hotel&filter=circle:${lon},${lat},5000&limit=12&apiKey=${GEO_API_KEY}`
      );

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
  };

  useEffect(() => {
    loadRecommended();
  }, [loadRecommended]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      fetchDiscoveries(searchTerm);
    } else {
      loadRecommended();
    }
  };

  const filteredDiscoveries = discoveries.filter(
    (d) => selectedCategory === "all" || d.category === selectedCategory
  );

  return (
    <main className="discoveries">
      <h1>Travel Discoveries</h1>

      <form className="discoveries-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search places (e.g. Tokyo, Cebu, Paris)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">Search</button>
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
        {isRecommended
          ? "Recommended Places"
          : `Results for "${searchTerm}"`}
      </p>

      {loading ? (
        <p className="loading">Loading...</p>
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
                  href={`https://www.google.com/maps?q=${d.lat},${d.lon}`}
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