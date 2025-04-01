import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"


type Props = {
    valueDefault:string[],
    valueInclude:string[],
    onSubmitValue: (value:boolean,name:string) => void;
}

const Filter = ({valueDefault,valueInclude,onSubmitValue}:Props) => {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant={"outline"} className="w-full">Lọc sản phẩm</Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className="divide-y divide-gray-300 gap-y-4">
                {valueDefault.map((item,_) => (
                   <div className="flex items-center gap-x-10">
                        <Checkbox 
                            id={item} 
                            key={_} 
                            value={item} 
                            checked={valueInclude.includes(item)}
                            onCheckedChange={(value:any) => onSubmitValue(value,item)}
                        />
                        <label htmlFor={item} className="text-sm">{item}</label>
                    </div>
                ))}
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default Filter