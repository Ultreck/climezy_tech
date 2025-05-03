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

const CitySelector = ({ disabled, onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { favorites, setFavorites } = useAppContext();
  const isFavorite = favorites.includes(selectedCity?.name);
  const toggleFavorite = () => {
    setFavorites((prev) =>
      isFavorite ? prev.filter((c) => c !== selectedCity?.name) : [...prev, selectedCity?.name]
    );
  };


  const cityArray = useMemo(() => Object.keys(cities), []);
  
  const filteredCities = useMemo(() => {
    if (!searchTerm) return [];
    return cityArray
    .filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 200) 
}, [searchTerm, cityArray]); 

//   const handleCitySelect = (cityName) => {
//     const city = { name: cityName };
//     setSelectedCity(city);
//     onCityChange?.(city);
//     setOpenDropdown(false);
//     setSearchTerm("");
//   };

  const handleCitySelect = useCallback((cityName) => {
    const city = { name: cityName };
    setSelectedCity(city);
    onCityChange?.(city);
    setOpenDropdown(false);
    setSearchTerm('');
  }, [onCityChange]);

  return (
    <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
      <PopoverTrigger asChild>
        <Button
          variant=""
          role="combobox"
          aria-expanded={openDropdown}
          disabled={disabled}
          className="w-[300px] border justify-between"
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
            <CommandEmpty>No cities found</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="[350px] pb-10">
                {filteredCities.map((cityName) => (
                  <CommandItem
                    key={cityName}
                    value={cityName}
                    onSelect={() => handleCitySelect(cityName)}
                    className="flex justify-between"
                  >
                    {cityName}
                    <button onClick={toggleFavorite} className="text-xl">
                      {isFavorite ? "★" : "☆"}
                    </button>
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selectedCity?.name === cityName
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
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
