import React from "react";
import img from "../assets/images/weather.jpg";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const CurrentCity = () => {
  const { searchLocation, userLocation } = useAppContext();
  return (
    <>
      {searchLocation?.name && (
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="relative bg-blend-overlay bg-slate-700 w-full cursor-pointer lg:max-w-4xl lg:h-72 lg:mx-auto bg-cover rounded-lg overflow-hidden"
        >
          <Link to={`/city/${searchLocation?.name}`}>
            <div className="text-white border-b border-slate-500 lg:text-2xl font-semibold flex justify-between py-3 px-8 items-center bg-slate-700 ">
              <p className="text">
                {searchLocation?.name}, {searchLocation?.sys?.country}
              </p>
              <p className="lg:text-lg font-light">
                As of{" "}
                <span className="text font-mono">
                  {new Date(searchLocation?.dt * 1000).toLocaleTimeString()}
                </span>
              </p>
            </div>
            <div className="text-white flex font-semibold lg:text-7xl text-5xl px-10 lg:mt-7 mt-5 ">
              {searchLocation?.main?.temp}°
              <img
                src={`https://openweathermap.org/img/wn/${searchLocation?.weather[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="lg:w-20 w-10 lg:h-20 h-10"
              />
            </div>
            <div className="text-white font-semibold lg:text-xl px-10 mt-4">
              {searchLocation?.weather[0]?.description}
            </div>
            <div className="text-white font-semibold lg:text-xl px-10 my-2">
              Day {Math.round(searchLocation?.main?.temp_max)}° • Night{" "}
              {Math.round(searchLocation?.main?.temp_min)}°
            </div>
          </Link>
        </div>
      )}
      {!searchLocation?.name && userLocation?.name && (
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="relative bg-blend-overlay bg-slate-700 w-xs cursor-pointer lg:w-full lg:max-w-4xl lg:h-80 lg:mx-auto bg-cover rounded-lg overflow-hidden"
        >
          <Link to={`/city/${userLocation?.name}`}>
            <div className="text-white border-b border-slate-500 lg:text-2xl font-semibold flex justify-between py-3 px-8 items-center bg-slate-700 ">
              <p className="text grid">
                <span className="lg:text-lg font-light">Your location</span>
                {userLocation?.name}, {userLocation?.sys?.country}
              </p>
              <p className="lg:text-lg font-light">
                As of {new Date(userLocation?.dt * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-white flex font-semibold lg:text-7xl text-5xl px-10 lg:mt-7 mt-5">
              {userLocation?.main?.temp}°
              <img
                src={`https://openweathermap.org/img/wn/${userLocation?.weather[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="lg:w-20 w-10 h-10 lg:h-20"
              />
            </div>
            <div className="text-white font-semibold lg:text-xl px-10 mt-4">
              {userLocation?.weather[0]?.description}
            </div>
            <div className="text-white font-semibold lg:text-xl px-10 mt-2">
              Day {Math.round(userLocation?.main?.temp_max)}° • Night{" "}
              {Math.round(userLocation?.main?.temp_min)}°
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default CurrentCity;
