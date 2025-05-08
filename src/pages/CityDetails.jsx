import React, { useCallback, useEffect, useState } from "react";
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
import { BsThermometer } from "react-icons/bs";
import { PiThermometerHot } from "react-icons/pi";
import { ImDroplet } from "react-icons/im";
import { CiDroplet } from "react-icons/ci";
import { WiRaindrops } from "react-icons/wi";
import { FaCompress } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LuWind } from "react-icons/lu";
import { GoEye } from "react-icons/go";
import { CiCloudOn } from "react-icons/ci";
import { getWeatherByCity } from "../api/weather";

const CityDetails = () => {
  const { weatherCache, searchLocation, userLocation } = useAppContext();
  const [weatherDetails, setWeatherDetails] = useState({});
  const cityName = window.location.pathname
    .split("/")
    .pop()
    .split("%20")
    .join(" ");

  useEffect(() => {
    const currentWeather = async () => {
      if (!cityName) return;

      if (weatherCache[cityName]) {
        setWeatherDetails(weatherCache[cityName]);
        return;
      }

      if (searchLocation?.name) {
        setWeatherDetails(searchLocation);
        return;
      }

      try {
        const data = await getWeatherByCity(cityName);
        setWeatherDetails(data);
      } catch (error) {
        console.log("Error occurs while fetching", error);
      }
    };

    currentWeather();
  }, [cityName, userLocation, searchLocation]);
  console.log(cityName, weatherCache[cityName], weatherDetails);

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
        <div className="text lg:w-4xl flex justify-between items-center px-4 mx-auto">
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
      <div className="min-h-screen relative bg-gray-100 lg:py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-7">
          {/* Header */}
          <div className="text-center mb-6 z-30 pt-6 lg:pt-0">
            <h1 className="lg:text-4xl text-3xl font-bold text-gray-800">
              {weatherDetails?.name}, {weatherDetails?.sys?.country}
            </h1>
            <p className="text-gray-600 mt-1 text-base">
              As of {new Date(weatherData?.dt * 1000).toLocaleTimeString()}
            </p>
          </div>

          {weatherDetails?.name && (
            <WeatherBackground
              weatherCondition={
                weatherDetails?.weather[0]?.main
                  ? weatherDetails?.weather[0]?.main
                  : "Clear"
              }
            >
              <div className="bg-transparent text-white rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="lg:text-8xl text-6xl font-mono font-bold">
                      {Math.round(weatherDetails?.main?.temp)}°C
                    </div>
                  </div>
                  <img
                    src={getWeatherIcon(weatherDetails?.weather[0]?.icon)}
                    alt={weatherDetails?.weather[0]?.main}
                    className="lg:w-24 w-16 lg:h-24 h-16"
                  />
                </div>

                <div className="border-t border-gray-200 lg:my-8 my-5"></div>

                <div className="text lg:flex justify-between items-center">
                  <div className="text ">
                    <div className="lg:text-2xl text-lg mb-3 font-semibold capitalize">
                      {weatherDetails?.weather[0]?.description}
                    </div>
                    <div className="lg:text-2xl text-lg font-semibold">
                      Day {Math.round(weatherDetails?.main?.temp_max)}° • Night{" "}
                      {Math.round(weatherDetails?.main?.temp_min)}°
                    </div>
                  </div>
                  <div className="text ">
                    <div className="items-center mt-7 lg:mt-0 h-auto lg:justify-end flex lg:px-2 z-30  gap-12">
                      <p className="text">
                        <span className="text">Sunrise</span>
                        <span className="text flex mt-2 items-center gap-1">
                          {formatTime(weatherDetails?.sys?.sunrise)}{" "}
                          <TbSunrise className="text-orange-500" />
                        </span>
                      </p>
                      <p className="text">
                        <span className="text">Sunset</span>
                        <span className="text flex mt-2 items-center gap-1">
                          {formatTime(weatherDetails?.sys?.sunset)}{" "}
                          <FiSunset className="text-orange-500" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </WeatherBackground>
          )}

          <div className="bg-white rounded-xl shadow-md px-6 py-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weather Today in {weatherDetails?.name},{" "}
              {weatherDetails?.sys?.country}
            </h2>

            <div className="grid lg:grid-cols-2 gap-5">
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <BsThermometer />
                  High/Low
                </h3>
                <p className="text">
                  {Math.round(weatherDetails?.main?.temp_max)}°/
                  {Math.round(weatherDetails?.main?.temp_min)}°
                </p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <PiThermometerHot />
                  Feels Like
                </h3>
                <p className="text">
                  {Math.round(weatherDetails?.main?.feels_like)}°
                </p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <ImDroplet />
                  Humidity
                </h3>
                <p className="text">{weatherDetails?.main?.humidity}%</p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <div className="text flex items-center">
                    <CiDroplet />
                    <WiRaindrops className="-ml-2 -mt-2" />{" "}
                  </div>
                  Dew point
                </h3>
                <p className="text">
                  {Math.round(weatherDetails?.main?.temp_min)}°
                </p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <LuWind />
                  Wind
                </h3>
                <p className="text flex items-center">
                  {weatherDetails?.wind?.speed > 1013 ? (
                    <IoIosArrowRoundUp />
                  ) : (
                    <IoIosArrowRoundDown />
                  )}
                  {weatherDetails?.wind?.speed} km/h
                </p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <FaCompress />
                  Pressure
                </h3>
                <p className="text flex items-center">
                  {weatherDetails?.main?.pressure > 1013 ? (
                    <IoIosArrowRoundUp />
                  ) : (
                    <IoIosArrowRoundDown />
                  )}
                  {weatherDetails?.main?.pressure} mb
                </p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <GoEye />
                  Visibility
                </h3>
                <p className="text">
                  {(weatherDetails?.visibility / 1000).toFixed(1)} Km
                </p>
              </div>
              <div className="flex p-0 justify-between border-b items-center pr-2 mt-6">
                <h3 className="font-semibold flex items-center gap-1">
                  <CiCloudOn />
                  Cloud Cover
                </h3>
                <p className="text">{weatherDetails?.clouds?.all}%</p>
              </div>
            </div>
          </div>

          {/* Daily Forecast */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weather Today in {weatherDetails?.name}
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
                  {formatTime(weatherDetails?.sys?.sunrise)}
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-700">Sunset</h3>
                <p className="text-gray-800">
                  {formatTime(weatherDetails?.sys?.sunset)}
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
