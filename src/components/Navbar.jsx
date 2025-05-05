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
import RemovedPopover from "./RemovedPopover";

const Navbar = () => {
  const { recentSearched, handleRemoveRecentSearched, userLocation } =
    useAppContext();
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  return (
    <div className="w-full bg-slate-900 ">
      <nav className="bg-slate-900 lg:w-4xl mx-auto p-4 text-white flex justify-between items-center">
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
                <span className="text hidden lg:block">
                  {userLocation?.name?.slice(0, 5) + "..."}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-600">
              <p>Your current location</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <div className="text-white bg-gray-800">
        {recentSearched?.length > 0 && (
          <div className="text flex justify-center py-2 max-w-4xl mx-auto">
            {recentSearched.map((city, i) => (
              <div>
                {i < 4 && (
                  <div
                    key={city?.name}
                    className="text border-r lg:px-2 p-1 w-auto flex items-center"
                  >
                    <img
                      src={getWeatherIcon(city?.weather[0]?.icon)}
                      alt={city?.weather[0]?.main}
                      className="lg:w-10 w-5 lg:h-10 h-5"
                    />{" "}
                    <div
                      className={`lg:text-base text-xs flex justify-between lg:gap-3 gap-1 items-center w-full`}
                    >
                      {city?.name.split(" ")[0]?.length > 5
                        ? city?.name.split(" ")[0]?.slice(0, 5) + "..."
                        : city?.name.split(" ")[0]}
                      <div className={`text flex items-center lg:space-x-1`}>
                        <button
                          className={`lg:text-xl text-xs ${
                            city?.favorite && "text-orange-600"
                          } `}
                        >
                          {city?.favorite ? <FaStar /> : <FaRegStar />}
                        </button>
                        {/* <span className="text">
                      <SlOptionsVertical
                        onClick={() => {
                          handleRemoveRecentSearched(city?.name);
                        }}
                      />
                    </span> */}
                        <RemovedPopover con="ico" city={city?.name} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
