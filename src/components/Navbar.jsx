import React from "react";
import SearchLocation from "./SearchLocation";
import { useAppContext } from "../context/AppContext";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-router-dom";
import { SiAccuweather } from "react-icons/si";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const { recentSearched, handleRemoveRecentSearched, userLocation } =
    useAppContext();
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  return (
    <div className="w-full bg-slate-900 ">
      <nav className="bg-slate-900 w-4xl mx-auto p-4 text-white flex justify-between items-center">
        <Link to="/" className="text">
          <SiAccuweather size={30} />
        </Link>
        <div className="text mx-auto">
          <SearchLocation />
        </div>
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
              <p >Your current location</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <div className="text-white bg-gray-800 ">
        {recentSearched?.length > 0 && (
          <div className="text flex justify-start py-2 max-w-4xl mx-auto">
            {recentSearched.map((city) => (
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
                      {city?.favorite ? <FaStar /> : <FaRegStar />}
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
