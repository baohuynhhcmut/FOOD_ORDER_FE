import { Checkbox } from "@/components/ui/checkbox"
import { checkBoxValue } from "@/config/menu-category";
import { CiForkAndKnife } from "react-icons/ci";

type searchObjMenu = {
    searchText: string;
    sort:string[];
    genre: string [];
  }

  
const checkBox = (name:string,selectedValues:searchObjMenu, handleCheckboxChange:(checked:boolean,value:string) => void) => {
    return(
        <div className="flex items-center space-x-2">
            <Checkbox 
                id={name} 
                checked={selectedValues.genre.includes(name)}   
                onCheckedChange={(checked:any) => {
                    handleCheckboxChange(checked,name)
                }} 
            />
            <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {name}
            </label>
        </div>
    )
}

type Props = {
    onSave: (checked:boolean,value:string) => void;
    selectedValue: searchObjMenu
}

const FoodCategory = ({onSave,selectedValue}:Props) => {
    return (
        <div className="flex flex-col  gap-y-5">
            <div className="flex gap-x-2 items-center font-bold text-2xl">
                <CiForkAndKnife />
                <span className="text-orange-500">Loại</span>
            </div>
            <div className="flex flex-col gap-y-5">
                {checkBoxValue.map((item) => checkBox(item,selectedValue,onSave))}
            </div>
        </div>
    )
}

export default FoodCategory