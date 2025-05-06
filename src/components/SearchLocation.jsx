import React, { useCallback, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import cities from "cities-list";
import { useAppContext } from "../context/AppContext";
import { getWeatherByCity } from "../api/weather";
import { SlOptionsVertical } from "react-icons/sl";
import RemovedPopover from "./RemovedPopover";


const CitySelector = ({ disabled, onCityChange }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const {
    favorites,
    setFavorites,
    setSearchLocation,
    searchLocation,
    updateRecentlySearchedCity,
    recentSearched,
    updateFavoriteStatus,
    clearAll,
    updateWeatherCache,
  } = useAppContext();
  const [selectedCity, setSelectedCity] = useState(searchLocation || null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const isFavorite = favorites.includes(selectedCity?.name);
  const toggleFavorite = (name, favorite) => {
        updateFavoriteStatus(name, favorite);
    setFavorites((prev) =>
      isFavorite
        ? prev.filter((c) => c !== selectedCity?.name)
        : [...prev, selectedCity?.name]
    );
  };

  const cityArray = useMemo(() => Object.keys(cities), []);

 
  const filteredCities = useMemo(() => {
    if (!searchTerm) return;
    return cityArray
      .filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 200);
  }, [searchTerm, cityArray]);

  const handleCitySelect = useCallback(
    async (cityName) => {
      try {
        const data = await getWeatherByCity(cityName);
        setSearchLocation(data);
        updateRecentlySearchedCity({...data, favorite:false});
        updateWeatherCache(cityName, data);
      } catch (err) {
        console.error(`Failed to fetch weather for ${cityName}`, err);
      }
      const city = { name: cityName };
      setSelectedCity(city);
      onCityChange?.(city);
      //   setOpenDropdown(false);
      setSearchTerm("");
    },
    [onCityChange]
  );

  return (
    <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={openDropdown}
          disabled={disabled}
          className="lg:w-[400px] w-56 py-6 cursor-pointer bg-slate-700 hover:bg-slate-600 justify-between"
        >
          {selectedCity ? selectedCity.name : "Select City..."}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[400px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search city..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className=""
          />
          <CommandList>
            <CommandEmpty>Type to search for the city you want...</CommandEmpty>
            <CommandGroup className="p-0 ">
              <ScrollArea className=" pb-5 px-0">
                {searchTerm ? (
                  filteredCities.map((cityName) => (
                    <CommandItem
                      key={cityName}
                      value={cityName}
                      onSelect={() => handleCitySelect(cityName)}
                      className={` flex rounded-none ${
                        selectedCity?.name === cityName && "bg-gray-100"
                      } justify-between  `}
                    >
                      <div
                        className={`text-base  flex justify-between items-center w-full`}
                      >
                        {cityName}
                        <div className={`text  flex items-center space-x-2`}>
                          <button onClick={toggleFavorite} className="text-3xl">
                            {isFavorite && selectedCity?.name === cityName
                              ? "★"
                              : "☆"}
                          </button>
                          <Check
                            className={cn(
                              "h-5 w-5 text-xl",
                              selectedCity?.name === cityName
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <>
                    {!!recentSearched?.length && (
                      <div className="text-xl flex justify-between mt-5 py-2 px-2">
                        Recent Searches
                        <button onClick={() => {
                            clearAll();
                        }} className="text-sm hover:bg-slate-100 px-2 rounded cursor-pointer">
                            Clear All
                        </button>
                      </div>
                    )}
                    {recentSearched.map((city) => (
                      <CommandItem
                        key={city?.name}
                        value={city?.name}
                        onSelect={() => handleCitySelect(city?.name)}
                        className={`flex rounded-none ${
                          selectedCity?.name === city?.name && "bg-gray-200"
                        } justify-between`}
                      >
                        <div
                          className={`text-base flex justify-between items-center w-full`}
                        >
                          {city?.name}
                          <div className={`text  flex items-center space-x-2`}>
                            <button
                              onClick={() =>toggleFavorite(city?.name, !city?.favorite)}
                              className={`text-3xl ${city?.favorite && 'text-orange-600'} `}
                            >
                              {city?.favorite ? "★" : "☆"}
                            </button>
                            <RemovedPopover con='ico' city={city?.name}/>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </>
                )}

                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySelector;
