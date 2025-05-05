import { useEffect } from "react";
// import { getWeatherByCity } from "../api/weatherService";
import { useAppContext } from "@/context/AppContext";
import CityCard from "@/components/CityCard";
import { TOP_15_CITIES } from "@/constants/cityLists";
import { getWeatherByCity } from "@/api/weather";
import axios from "axios";
import WeatherBackground from "@/components/WeatherBackground";
import CurrentCity from "@/components/CurrentCity";
import Navbar from "../components/Navbar";
import { getWeatherByCoords } from "../api/weather";
import { useGeolocation } from "../hooks/useGeolocation";

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

  //   useEffect(() => {
  //     cities.forEach(async (city) => {
  //       if (!weatherCache[city]) {
  //         try {
  //           const data = await getWeatherByCity(city);
  //           updateWeatherCache(city, { ...data, favorite: false });
  //         } catch (err) {
  //           console.error(`Failed to fetch weather for ${city}`);
  //         }
  //       }
  //     });
  //   }, [cities]);

  const fetchWeatherForCities = async () => {
    if (!navigator.onLine) {
      console.log("Offline — using cached weather data.");
      return;
    }

    for (const city of cities) {
      try {
        const data = await getWeatherByCity(city);
        updateWeatherCache(city, {
          ...data,
          favorite: weatherCache[city]?.favorite || false,
        });
      } catch (err) {
        console.error(`Failed to fetch weather for ${city}`, err);
      }
    }
  };

  useEffect(() => {
    fetchWeatherForCities();
    const handleOnline = () => {
      console.log("Back online, refetching weather data...");
      fetchWeatherForCities();
    };
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);


  useGeolocation(async ({ latitude, longitude }) => {
    try {
      const weatherData = await getWeatherByCoords(latitude, longitude);
      console.log(weatherData);
      
    //   updateWeatherCache(weatherData.name, weatherData);
    } catch (error) {
      console.error("Failed to fetch weather from geolocation:", error);
    }
  });

  return (
    <>
      <Navbar />
      <div className="text w-full min-h-screen">
        <div className="p-4 px-4 py-8 w-4xl mx-auto">
          <CurrentCity />
          <div className="text border mt-10 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 px-4 py-5">
              Largest cities
            </h1>
            {/* <WeatherBackground weatherCondition={'rain'}/> */}
            <div className="grid grid-cols-1">
              {cities.map((city, i) => (
                <div key={city}>{i <= 14 && <CityCard city={city} />}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
