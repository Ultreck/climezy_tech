import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  const { weatherCache, favorites, setFavorites, removed, setRemoved } = useAppContext();
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

  const removeCity = () => {
    setRemoved((prev) => [...prev, city]);
  };

  return (
    <div className="border rounded p-3 flex justify-between items-center">
      <Link to={`/city/${city}`} className="flex-1 flex items-center space-x-4">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Weather Icon"
            className="w-10 h-10"
          />
        )}
        <div>
          <div className="font-semibold">{city}</div>
          {temp !== undefined ? (
            <div className="text-sm text-gray-700">
              <div>{temp}°C - {description}</div>
              <div>💧 {humidity}% | 🌬 {windSpeed} m/s</div>
            </div>
          ) : (
            <div className="text-sm text-gray-400">Loading...</div>
          )}
        </div>
      </Link>
      <div className="space-x-2 ml-4 flex-shrink-0">
        <button onClick={toggleFavorite} className="text-xl">
          {isFavorite ? "★" : "☆"}
        </button>
        <button onClick={removeCity} className="text-xl">🗑</button>
      </div>
    </div>
  );
};

export default CityCard;
