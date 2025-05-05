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

const RemovedPopover = ({con = ''}) => {
    const {handleRemoveRecentSearched, setRemoved} = useAppContext();
    const removeCity = () => {
        setRemoved((prev) => [...prev, city]);
      };
  return (
    <Popover >
      <PopoverTrigger>
       {con === 'ico'? <SlOptionsVertical/> : <TfiTrash />}
      </PopoverTrigger>
      <PopoverContent side={'left'} className="w-auto h-auto p-0 bg-transparent border-0">
        <Button  onPress={() => {
            console.log(city?.name);
            con === 'ico' ? handleRemoveRecentSearched(city?.name) : removeCity();
          }}>
            Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default RemovedPopover;
