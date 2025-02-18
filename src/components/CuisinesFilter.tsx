import { cuisineList } from "@/config/restaurant-option-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUpIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}

const CuisinesFilter = ({selectedCuisines,onChange,isExpanded,onExpandedClick} : Props) => {

    const handleCuisinesReset = () => {
        onChange([])
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      const {value , checked} = event.target
      const isSelectedCuisines = checked ? [...selectedCuisines,value] : selectedCuisines.filter((item) => item !== value)

      onChange(isSelectedCuisines)
    }


    
    return (
      <>
        <div className="flex justify-between items-center px-2">
          <div className="text-md font-semibold mb-2">Filter by cuisines</div>
          <div onChange={handleCuisinesReset} className="text-sm font-semibold text-blue-500 mb-2 underline cursor-pointer">
            Reset filter
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
            {cuisineList.slice(0,isExpanded ? cuisineList.length : 8 ).map((item) => {
                  const isSelected = selectedCuisines.includes(item)
                    return(
                        <>
                          <div className="flex items-center space-x-2">
                              <input
                                id={`cuisine_${item}`}
                                type="checkbox"
                                value={item}
                                checked={isSelected}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <Label htmlFor={`cuisine_${item}`} className={`flex flex-1 px-4 py-2 items-center cursor-pointer text-sm rounded-full font-semibold ${
                                isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"
                              }`}>
                                {isSelected && <Check strokeWidth={'3'} size={20} />}
                                {item}
                              </Label>
                          </div>
                          
                        </>
                    )
            })}
            <Button variant={'link'} onClick={onExpandedClick}>
                {isExpanded ? (
                  <>
                    <ChevronUpIcon />
                    View less
                  </>
                ) : (
                  <>
                    <ChevronDown />
                    View more
                  </>
                )}
            </Button>
        </div>
      </>
    );
}

export default CuisinesFilter;
