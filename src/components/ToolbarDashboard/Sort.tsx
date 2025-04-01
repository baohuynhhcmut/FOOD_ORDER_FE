import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    valueDefault : string [][],
    valueSelected:string[];
    onSelectValue: (value:number) => void;
}

const Sort = ({valueDefault,valueSelected,onSelectValue}:Props) => {
    return (
        <Select value={valueDefault.findIndex((item) => {
            return item[2] == valueSelected[2]
        }).toString()} onValueChange={(value) => {
            const indexChange = parseInt(value)
            onSelectValue(indexChange)
        }}>
            <SelectTrigger className="w-full ring-0 focus:ring-0">
                <SelectValue placeholder="Sắp xếp theo thứ tự" />
            </SelectTrigger>
            <SelectContent>
                {valueDefault.map((item,index) => (
                    <SelectItem value={`${index}`}>{item[2]}</SelectItem>
                ))}

                {/* <SelectItem value="CreateAt">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem> */}
            </SelectContent>
        </Select>
    )
}

export default Sort