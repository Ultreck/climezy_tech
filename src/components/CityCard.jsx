import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
    
    const { weatherCache, favorites, setFavorites, removed, setRemoved } = useAppContext();
    const temp = weatherCache[city]?.main?.temp;
    
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
      <Link to={`/city/${city}`}>{city} - {temp ? `${temp}°C` : "Loading..."}</Link>
      <div className="space-x-2">
        <button onClick={toggleFavorite}>{isFavorite ? "★" : "☆"}</button>
        <button onClick={removeCity}>🗑</button>
      </div>
    </div>
  );
};

export default CityCard;