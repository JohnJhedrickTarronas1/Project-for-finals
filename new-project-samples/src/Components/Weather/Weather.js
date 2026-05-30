import { useState, useEffect } from "react";
import "./Weather.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  const [city, setCity] = useState("Lucena");
  const [search, setSearch] = useState("Lucena");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (location) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search);
    }
  };

  const convertToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <div className="weather-page">
      <div className="weather-overlay" />

      <div className="weather-container">
        <h1 className="weather-title">Weather Forecast</h1>

        <form className="weather-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading ? (
          <p className="loading-text">Loading weather...</p>
        ) : weather?.main && weather.weather?.[0] ? (
          <>
            <div className="weather-card">
              <div className="weather-main">
                <h2>{weather.name}</h2>
                <p className="weather-type">{weather.weather[0].main}</p>
                <p className="weather-description">
                  {weather.weather[0].description}
                </p>
                <h1 className="temperature">
                  {convertToCelsius(weather.main.temp)}°
                </h1>
                <p className="feels-like">
                  Feels like {convertToCelsius(weather.main.feels_like)}°
                </p>
              </div>

              <div className="weather-icon-container">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="weather-icon"
                  className="weather-icon"
                />
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-card">
                <h3>Humidity</h3>
                <p>{weather.main.humidity}%</p>
              </div>

              <div className="detail-card">
                <h3>Wind Speed</h3>
                <p>{weather.wind?.speed ?? 0} km/h</p>
              </div>

              <div className="detail-card">
                <h3>Pressure</h3>
                <p>{weather.main.pressure} hPa</p>
              </div>

              <div className="detail-card">
                <h3>Visibility</h3>
                <p>{weather.visibility ?? 0} m</p>
              </div>

              <div className="detail-card">
                <h3>Sunrise</h3>
                <p>
                  {weather.sys?.sunrise
                    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>

              <div className="detail-card">
                <h3>Sunset</h3>
                <p>
                  {weather.sys?.sunset
                    ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="loading-text">City not found.</p>
        )}
      </div>
    </div>
  );
}

export default Weather;