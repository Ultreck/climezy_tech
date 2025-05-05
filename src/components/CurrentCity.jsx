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
          className="relative bg-blend-overlay bg-slate-700 cursor-pointer w-full max-w-4xl h-72 mx-auto bg-cover rounded-lg overflow-hidden"
        >
          <Link to={`/city/${searchLocation?.name}`}>
            <div className="text-white border-b border-slate-500 text-2xl font-semibold flex justify-between py-3 px-8 items-center bg-slate-700 ">
              <p className="text">
                {searchLocation?.name}, {searchLocation?.sys?.country}
              </p>
              <p className="text">
                As of {new Date(searchLocation?.dt * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-white flex font-semibold text-7xl px-10 mt-7 ">
              {searchLocation?.main?.temp}°
              <img
                src={`https://openweathermap.org/img/wn/${searchLocation?.weather[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="w-20 h-20"
              />
            </div>
            <div className="text-white font-semibold text-xl px-10 mt-4">
              {searchLocation?.weather[0]?.description}
            </div>
            <div className="text-white font-semibold text-xl px-10 mt-2">
              Day {Math.round(searchLocation?.main?.temp_max)}° • Night{" "}
              {Math.round(searchLocation?.main?.temp_min)}°
            </div>
          </Link>
        </div>
      )}
       {!searchLocation?.name && userLocation?.name && (
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="relative bg-blend-overlay bg-slate-700 cursor-pointer w-full max-w-4xl h-72 mx-auto bg-cover rounded-lg overflow-hidden"
        >
          <Link to={`/city/${userLocation?.name}`}>
            <div className="text-white border-b border-slate-500 text-2xl font-semibold flex justify-between py-3 px-8 items-center bg-slate-700 ">
              <p className="text">
                {userLocation?.name}, {userLocation?.sys?.country}
              </p>
              <p className="text">
                As of {new Date(userLocation?.dt * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-white flex font-semibold text-7xl px-10 mt-7 ">
              {userLocation?.main?.temp}°
              <img
                src={`https://openweathermap.org/img/wn/${userLocation?.weather[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="w-20 h-20"
              />
            </div>
            <div className="text-white font-semibold text-xl px-10 mt-4">
              {userLocation?.weather[0]?.description}
            </div>
            <div className="text-white font-semibold text-xl px-10 mt-2">
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
