import { useEffect } from "react";
import { TOP_15_CITIES } from "../constants/cityList";
import { getWeatherByCity } from "../api/weatherService";
import { useAppContext } from "../context/AppContext";
import CityCard from "../components/CityCard";

const Home = () => {
  const { favorites, removed, weatherCache, updateWeatherCache } = useAppContext();

  const cities = [...new Set([...favorites.sort(), ...TOP_15_CITIES.sort().filter(c => !removed.includes(c) && !favorites.includes(c))])];

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Weather App</h1>
      <div className="grid grid-cols-1 gap-4">
        {cities.map(city => <CityCard key={city} city={city} />)}
      </div>
    </div>
  );
};

export default Home;