import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"

type Props = {
    defaultValue:string,
    setDefaultValue: React.Dispatch<React.SetStateAction<string>>
}

const SelectType = () => {
  return (
    <Select>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="light">Có</SelectItem>
            <SelectItem value="dark">không</SelectItem>
        </SelectContent>
    </Select>
  )
}
export default SelectType