'use client'

import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/navbar";
import Image from "next/image";
import axios from "axios";

// https://api.openweathermap.org/data/2.5/weather?q=Philippines&appid=5273a2e1f3ee2ee5bed4700944f825af

type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };

  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];

  base: string;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };

  visibility: number;

  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  clouds: {
    all: number;
  };

  dt: number;

  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };

  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ['weather'],
    queryFn: async () => {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=Philippines&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      )
      return response.data
    },
  });

  console.log("data", data?.sys.country)
  

  if (isLoading) return 'Loading...'
  if (error) return 'Error loading weather'
  
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <div>{data?.name}</div>
    </div>
  )
}