import { useState, useEffect } from "react";

const GEO_API_KEY = process.env.REACT_APP_GEOAPIFY_KEY;
const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const RECOMMENDED_PLACES = ["Boracay", "Palawan", "Siargao",
  "Bohol", "Cebu", "Batanes"];

function Discoveries() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState(true);

  const mapCategory = (categories = []) => {
    if (categories.some((c)) => c.includes("tourism"))) return "Tourist Spots";
    if (categories.some((c)) => c.includes("catering"))) return "Restaurant";
    if (categories.some((c)) => c.includes("accomodation"))) return "Hotels";
    return "Other";
  };

  const fetchUnsplashImage = async (query) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_API_KEY}`
      );
    } catch {
      return `https://source.unsplash.com/800x600/?${query}`;
    }
  };

  
export default Discoveries;