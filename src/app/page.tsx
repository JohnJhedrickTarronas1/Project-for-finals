"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/navbar";
import axios from "axios";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetails from "./components/WeatherDetails";
import { convertKelvinToCelsius } from "./utils/convertKelvinToCelsius";

type WeatherData = {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };

  visibility: number;

  wind: {
    speed: number;
  };

  sys: {
    sunrise: number;
    sunset: number;
  };

  name: string;
};

export default function Home() {
  const [location, setLocation] = useState("Lucena");
  const [search, setSearch] = useState("Lucena");

  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ["weather", location],

    queryFn: async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );

      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search.trim() !== "") {
      setLocation(search);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-3xl font-bold">
        Loading Weather...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-3xl font-bold">
        Failed to load weather.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">

      <Navbar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSubmit}
      />

      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center">

            {/* LEFT */}
            <div className="space-y-3">

              <h1 className="text-6xl font-bold text-blue-700">
                {data?.name}
              </h1>

              <p className="text-2xl text-gray-700">
                {data?.weather[0].main}
              </p>

              <p className="capitalize text-lg text-gray-500">
                {data?.weather[0].description}
              </p>

              <div className="pt-6">
                <span className="text-8xl font-bold text-gray-800">
                  {convertKelvinToCelsius(data?.main.temp ?? 0)}°
                </span>
              </div>

              <p className="text-xl text-gray-500">
                Feels like{" "}
                {convertKelvinToCelsius(
                  data?.main.feels_like ?? 0
                )}
                °
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center">

              <WeatherIcon
                iconName={data?.weather[0].icon ?? "01d"}
                className="scale-150"
              />

            </div>
          </div>

          {/* WEATHER DETAILS */}
          <div className="mt-16">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

              <WeatherDetails
                visibility={`${data?.visibility} m`}
                humidity={`${data?.main.humidity}%`}
                windSpeed={`${data?.wind.speed} km/h`}
                airPressure={`${data?.main.pressure} hPa`}
                sunrise={new Date(
                  (data?.sys.sunrise ?? 0) * 1000
                ).toLocaleTimeString()}
                sunset={new Date(
                  (data?.sys.sunset ?? 0) * 1000
                ).toLocaleTimeString()}
              />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}