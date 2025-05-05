import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppContext } from "../context/AppContext";
import { SlOptionsVertical } from "react-icons/sl";
import { Button } from "@/components/ui/button"

const RemovedPopover = () => {
    const {handleRemoveRecentSearched} = useAppContext();
  return (
    <Popover >
      <PopoverTrigger>
        <SlOptionsVertical
         
        />
      </PopoverTrigger>
      <PopoverContent side={'left'} className="w-auto h-auto p-0 bg-transparent border-0">
        <Button  onPress={() => {
            console.log(city?.name);
            handleRemoveRecentSearched(city?.name);
          }}>
            Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default RemovedPopover;
