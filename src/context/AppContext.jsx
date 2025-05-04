import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [removed, setRemoved] = useState(
    () => JSON.parse(localStorage.getItem("removed")) || []
  );
  const [weatherCache, setWeatherCache] = useState(
    () => JSON.parse(localStorage.getItem("weatherCache")) || {}
  );
  const [recentSearched, setRecentSearched] = useState(() =>
    JSON.parse(localStorage.getItem("recently-searched")) || []
  );
  const [searchLocation, setSearchLocation] = useState(() =>
    JSON.parse(localStorage.getItem("searched-location")) || {}
  );
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || {}
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("removed", JSON.stringify(removed));
    localStorage.setItem("weatherCache", JSON.stringify(weatherCache));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("recently-searched", JSON.stringify(recentSearched));
    localStorage.setItem("searched-location", JSON.stringify(searchLocation));
  }, [favorites, removed, weatherCache, recentSearched, searchLocation, notes]);

  const updateWeatherCache = (city, data) => {
    setWeatherCache((prev) => ({ ...prev, [city]: data }));
  };

  const updateRecentlySearchedCity = (city) => {
      setRecentSearched((prev) => {
        const newList = [...prev, city];
        const uniqueList = newList.filter((value, index, self) => {
            return index === self.findIndex((t) => t.name === value.name);
        })
        return uniqueList.slice(-10).reverse();
    });
  };
  return (
    <AppContext.Provider
      value={{
        favorites,
        setFavorites,
        removed,
        setRemoved,
        weatherCache,
        updateWeatherCache,
        notes,
        setNotes,
        setSearchLocation,
        searchLocation,
        recentSearched,
        setRecentSearched,
        updateRecentlySearchedCity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
