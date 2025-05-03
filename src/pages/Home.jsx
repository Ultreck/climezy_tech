import { useEffect } from "react";
// import { getWeatherByCity } from "../api/weatherService";
import { useAppContext } from "../context/AppContext";
import CityCard from "../components/CityCard";
import { TOP_15_CITIES } from "../constants/CityLists";
import { getWeatherByCity } from "../api/weather";
import axios from "axios";
import WeatherBackground from "../components/WeatherBackground";

const Home = () => {
  const { favorites, removed, weatherCache, updateWeatherCache } =
    useAppContext();

  const cities = [
    ...new Set([
      ...favorites.sort(),
      ...TOP_15_CITIES.sort().filter(
        (c) => !removed.includes(c) && !favorites.includes(c)
      ),
    ]),
  ];

  useEffect(() => {
    cities.forEach(async (city) => {
      if (!weatherCache[city]) {
        try {
          const data = await getWeatherByCity(city);
          updateWeatherCache(city, data);
        } catch (err) {
          console.error(`Failed to fetch weather for ${city}`);
        }
      }
    });
  }, [cities]);

  return (
    <div className="text w-full min-h-screen">
      <div className="p-4 px-4 py-8 w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Weather App</h1>
        <WeatherBackground weatherCondition={'clouds'}/>
        <div className="grid grid-cols-1 gap-4">
          {cities.map((city) => (
            <CityCard key={city} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
