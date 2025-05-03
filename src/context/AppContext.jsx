import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [removed, setRemoved] = useState(() => JSON.parse(localStorage.getItem("removed")) || []);
  const [weatherCache, setWeatherCache] = useState(() => JSON.parse(localStorage.getItem("weatherCache")) || {});
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || {});

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("removed", JSON.stringify(removed));
    localStorage.setItem("weatherCache", JSON.stringify(weatherCache));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [favorites, removed, weatherCache, notes]);

  const updateWeatherCache = (city, data) => {
    setWeatherCache((prev) => ({ ...prev, [city]: data }));
  };

  return (
    <AppContext.Provider value={{
      favorites, setFavorites,
      removed, setRemoved,
      weatherCache, updateWeatherCache,
      notes, setNotes
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);