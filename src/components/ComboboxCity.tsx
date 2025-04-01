import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getResCity } from "@/api/RestaurantApi"

type Props = {
    onSave: (data:string) => void;
}

export function ComboboxCity({onSave}:Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [cities,setCities] = React.useState<any[]>([])

    React.useEffect(() => {
        const getCity = async() => {
            const result = await getResCity()
            setCities([{name:"Mặc định"},...result])
        }
        getCity()
    },[])


    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            >
            {value
                ? cities.find((city:any) => city.name === value)?.name
                : "Thành phố, tỉnh thành..."}
            <ChevronsUpDown className="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
            <CommandInput placeholder="Chọn..." className="h-9" />
            <CommandList>
                <CommandEmpty>Không có kết quả phù hợp.</CommandEmpty>
                <CommandGroup>
                {cities.map((city) => (
                    <CommandItem
                    key={city.name}
                    value={city.name}
                    onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        onSave(currentValue)
                    }}
                    >
                    {city.name}
                    <Check
                        className={cn(
                        "ml-auto",
                        value === city.value ? "opacity-100" : "opacity-0"
                        )}
                    />
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
    )
}
