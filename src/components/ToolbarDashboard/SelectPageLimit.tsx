import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { paginationObj } from "@/type";

type Props = {
    pagintionObj:paginationObj
    setValue: (value:string) => void;
}

const paginationPg = [
    1,5,10,15,20,100
]

const SelectPageLimit = ({pagintionObj,setValue}:Props) => {
    return (
        <Select value={pagintionObj.limit == pagintionObj.total ? 'all' : pagintionObj.limit.toString()} onValueChange={(value) => {
            setValue(value);
        }}>
            <SelectTrigger className="w-full md:w-[180px] ring-0 focus:ring-0" >
                <SelectValue placeholder="Chọn số sản phẩm muốn hiển thị" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default SelectPageLimit