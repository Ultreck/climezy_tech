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

const CitySelector = ({ disabled, onCityChange }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { favorites, setFavorites, setSearchLocation, searchLocation } =
    useAppContext();
  const [selectedCity, setSelectedCity] = useState(searchLocation || null);
  const [searchTerm, setSearchTerm] = useState("");
  const isFavorite = favorites.includes(selectedCity?.name);
  const toggleFavorite = () => {
    setFavorites((prev) =>
      isFavorite
        ? prev.filter((c) => c !== selectedCity?.name)
        : [...prev, selectedCity?.name]
    );
  };

  const cityArray = useMemo(() => Object.keys(cities), []);

  const filteredCities = useMemo(() => {
    if (!searchTerm) return [];
    return cityArray
      .filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 200);
  }, [searchTerm, cityArray]);

  //   const handleCitySelect = (cityName) => {
  //     const city = { name: cityName };
  //     setSelectedCity(city);
  //     onCityChange?.(city);
  //     setOpenDropdown(false);
  //     setSearchTerm("");
  //   };

  const handleCitySelect = useCallback(
    async (cityName) => {
      try {
        const data = await getWeatherByCity(cityName);
        console.log(data);
        setSearchLocation(data);
      } catch (err) {
        console.error(`Failed to fetch weather for ${cityName}`);
      }
      const city = { name: cityName };
      setSelectedCity(city);
      onCityChange?.(city);
      setOpenDropdown(false);
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
          className="w-[300px] py-6 cursor-pointer bg-slate-700 hover:bg-slate-600 justify-between"
        >
          {selectedCity ? selectedCity.name : "Select City..."}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search city..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>Type to search for the city you want...</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="[350px] pb-10">
                {filteredCities.map((cityName) => (
                  <CommandItem
                    key={cityName}
                    value={cityName}
                    onSelect={() => handleCitySelect(cityName)}
                    className={`flex ${selectedCity?.name === cityName && 'bg-gray-100'} justify-between`}
                  >
                    <div className={`text-base flex justify-between items-center w-full`}>
                      {cityName}
                      <div className={`text  flex items-center space-x-2`}>
                        <button onClick={toggleFavorite} className="text-3xl">
                          {isFavorite ? "★" : "☆"}
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
                ))}
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
