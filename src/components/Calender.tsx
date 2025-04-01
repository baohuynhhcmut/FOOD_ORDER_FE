import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent } from "@radix-ui/react-popover"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"

type Props = {
    onSave : (day:DateRange) => void;
}

const Calender = ({onSave}:Props) => {

    const [date, setDate] = useState<DateRange | undefined>()

    const selected = (selected:any) => {
        setDate(selected)
        onSave(selected)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full">Tạo từ ngày</Button>
            </PopoverTrigger>
            <PopoverContent className="relative z-[9999]">
                <Calendar
                    mode="range"
                    selected={date}
                    onSelect={selected}
                    className="rounded-md border bg-white relative z-[9999]"
                />
            </PopoverContent>
        </Popover>
    )
}
export default Calender