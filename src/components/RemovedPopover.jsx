import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppContext } from "../context/AppContext";
import { SlOptionsVertical } from "react-icons/sl";
import { Button } from "@/components/ui/button"
import { TfiTrash } from "react-icons/tfi";

const RemovedPopover = ({con = '', city = ''}) => {
    const {handleRemoveRecentSearched, setRemoved} = useAppContext();
    const removeCity = (city) => {
        console.log('clicked', city);
        
        setRemoved((prev) => [...prev, city]);
      };
  return (
    <Popover >
      <PopoverTrigger>
       {con === 'ico'? <SlOptionsVertical className="text-xs cursor-pointer lg:text-2xl"/> : <TfiTrash className="text-sm lg:text-2xl cursor-pointer"/>}
      </PopoverTrigger>
      <PopoverContent side={'left'} className="w-auto h-auto p-0 bg-transparent border-0">
        <Button  onClick={() => {
            con === 'ico' ? handleRemoveRecentSearched(city) : removeCity(city);
          }}>
            Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default RemovedPopover;
