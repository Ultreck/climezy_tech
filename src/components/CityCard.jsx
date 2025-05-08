import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { TfiTrash } from "react-icons/tfi";
import RemovedPopover from "./RemovedPopover";
  
const CityCard = ({ city }) => {
  const { weatherCache, favorites, setFavorites, } = useAppContext();
  const weather = weatherCache[city];

  const temp = weather?.main?.temp;
  const description = weather?.weather?.[0]?.description;
  const icon = weather?.weather?.[0]?.icon;
  const humidity = weather?.main?.humidity;
  const windSpeed = weather?.wind?.speed;

  const isFavorite = favorites.includes(city);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      isFavorite ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  return (
    <div className="border-t rounded lg:p-4 w-auto p-3 flex justify-between items-center">
      <Link to={`/city/${city}`} className="grid grid-cols-3 w-3/4 lg:space-x-4">
      <div className="font-semibold text-xs lg:text-xl flex  items-center">{city}</div>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather Icon"
            className="lg:w-12 lg:h-12 w-8 h-8 flex-shrink-0"
          />
        )}
        <div>
          {temp !== undefined ? (
            <div className="lg:text-xl text-xs flex h-full justify-center items-center text-gray-700">
              <div>{temp}°C</div>
              {/* <div>💧 {humidity}% | 🌬 {windSpeed} m/s</div> */}
            </div>
          ) : (
            <div className="text-sm text-gray-400">Loading...</div>
          )}
        </div>
      </Link>
      <div className="space-x-2 ml-4 flex-shrink-0">
        <button onClick={toggleFavorite} className={`lg:text-3xl text ${isFavorite && 'text-orange-600'} `}>
          {isFavorite ? "★" : "☆"}
        </button>
        <RemovedPopover city={city}/>
      </div>
    </div>
  );
};

export default CityCard;
