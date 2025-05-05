import React from "react";
import { useAppContext } from "../context/AppContext";
import WeatherBackground from "../components/WeatherBackground";
import { TbSunrise } from "react-icons/tb";
import { FiSunset } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SiAccuweather } from "react-icons/si";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
const CityDetails = () => {
  const { weatherCache, searchLocation, userLocation } = useAppContext();
  const city =
    weatherCache[
      window.location.pathname.split("/").pop().split("%20").join(" ")
    ];
  let weatherData = {};
  if (city) {
    weatherData = city;
  } else {
    weatherData = searchLocation;
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  return (
    <>
      <div className="text py-3">
        <div className="text w-4xl flex justify-between items-center px-4 mx-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to="/" className="text">
                  <SiAccuweather size={30} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-600">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <div className="space-x-2 flex items-center">
                  <FaLocationDot />
                  <span className="text">{userLocation?.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-600">
                <p>Your current location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="min-h-screen relative bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-7">
          {/* Header */}
          <div className="text-center mb-6 z-30">
            <h1 className="text-4xl font-bold text-gray-800">
              {weatherData?.name}, {weatherData?.sys?.country}
            </h1>
            <p className="text-gray-600 text-base">
              As of {new Date(weatherData?.dt * 1000).toLocaleTimeString()}
            </p>
          </div>

          <WeatherBackground weatherCondition={weatherData?.weather[0]?.main}>
            <div className="bg-transparent text-white rounded-xl p-6 mb-6">
              {/* Current Weather */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-8xl font-mono font-bold">
                    {Math.round(weatherData?.main?.temp)}°C
                  </div>
                </div>
                <img
                  src={getWeatherIcon(weatherData?.weather[0]?.icon)}
                  alt={weatherData?.weather[0]?.main}
                  className="w-24 h-24"
                />
              </div>

              <div className="border-t border-gray-200 my-8"></div>

              <div className="text flex justify-between items-center">
                <div className="text ">
                  <div className="text-2xl mb-3 font-semibold capitalize">
                    {weatherData?.weather[0]?.description}
                  </div>
                  <div className="text-2xl font-semibold">
                    Day {Math.round(weatherData?.main?.temp_max)}° • Night{" "}
                    {Math.round(weatherData?.main?.temp_min)}°
                  </div>
                </div>
                <div className="text ">
                  <div className="items-center h-auto justify-end flex px-2 z-30  gap-12">
                    <p className="text">
                      <span className="text">Sunrise</span>
                      <span className="text flex mt-2 items-center gap-1">
                        {formatTime(weatherData?.sys?.sunrise)}{" "}
                        <TbSunrise className="text-orange-500" />
                      </span>
                    </p>
                    <p className="text">
                      <span className="text">Sunset</span>
                      <span className="text flex mt-2 items-center gap-1">
                        {formatTime(weatherData?.sys?.sunset)}{" "}
                        <FiSunset className="text-orange-500" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </WeatherBackground>

          {/* Hourly Forecast */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weather Today in {weatherData?.name}, {weatherData?.sys?.country}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Feels Like</h3>
                <p className="text">
                  {Math.round(weatherData?.main?.feels_like)}°
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Humidity</h3>
                <p className="text">{weatherData?.main?.humidity}%</p>
              </div>
              <div>
                <h3 className="font-semibold">Wind</h3>
                <p className="text">{weatherData?.wind?.speed} km/h</p>
              </div>
              <div>
                <h3 className="font-semibold">Pressure</h3>
                <p className="text">{weatherData?.main?.pressure} mb</p>
              </div>
              <div>
                <h3 className="font-semibold">Visibility</h3>
                <p className="text">
                  {(weatherData?.visibility / 1000).toFixed(1)} km
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Cloud Cover</h3>
                <p className="text">{weatherData?.clouds?.all}%</p>
              </div>
            </div>
          </div>

          {/* Daily Forecast */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weather Today in {weatherData?.name}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Morning</span>
                <span className="font-medium">20°</span>
                <span className="text-gray-600">Sunny</span>
                <span className="text-yellow-500">2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Afternoon</span>
                <span className="font-medium">28°</span>
                <span className="text-gray-600">Sunny</span>
                <span className="text-yellow-500">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Evening</span>
                <span className="font-medium">20°</span>
                <span className="text-gray-600">Clear</span>
                <span className="text-yellow-500">4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Overnight</span>
                <span className="font-medium">18°</span>
                <span className="text-gray-600">Cloudy</span>
                <span className="text-yellow-500">5%</span>
              </div>
            </div>
          </div>

          {/* Sunrise/Sunset */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Sunrise</h3>
                <p className="text-gray-800">
                  {formatTime(weatherData?.sys?.sunrise)}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Sunset</h3>
                <p className="text-gray-800">
                  {formatTime(weatherData?.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityDetails;
