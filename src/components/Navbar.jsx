import React from "react";
import SearchLocation from "./SearchLocation";
import { useAppContext } from "../context/AppContext";
import { SlOptionsVertical } from "react-icons/sl";

const Navbar = () => {
  const { recentSearched, handleRemoveRecentSearched } = useAppContext();
  console.log(recentSearched);
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  return (
    <div className="w-full bg-slate-900 ">
      <nav className="bg-slate-900 w-4xl mx-auto p-4 text-white flex justify-between items-center">
        <div className="text-lg font-bold">Weather App</div>
        <div className="text">
          <SearchLocation />
        </div>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/favorites" className="hover:text-gray-300">
            Favorites
          </a>
        </div>
      </nav>
      <div className="text-white bg-gray-800 ">
        <div className="text flex justify-start py-2 max-w-4xl mx-auto">
          {recentSearched?.length > 0 &&
            recentSearched.map((city) => (
              <div
                key={city?.name}
                className="text border-r px-2 w-auto flex items-center"
              >
                <img
                src={getWeatherIcon(city?.weather[0]?.icon)}
                alt={city?.weather[0]?.main}
                className="w-10 h-10"
                />{" "}
                <div
                  className={`text-base flex justify-between gap-3 items-center w-full`}
                >
                    {city?.name}, {city?.sys?.country}
                  <div className={`text  flex items-center space-x-2`}>
                    <button
                      className={`text-xl ${
                        city?.favorite && "text-orange-600"
                      } `}
                    >
                      {city?.favorite ? "★" : "☆"}
                    </button>
                    <span className="text">
                      <SlOptionsVertical
                        onClick={() => {
                          handleRemoveRecentSearched(city?.name);
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
