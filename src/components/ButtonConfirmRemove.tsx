import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  removeItemCart } from "@/store/slice/CartSlice";

type Props = {
    _id:string;
}

const ButtonConfirmRemove = ({_id}:Props) => {

    const [open,setOpen] = useState(false)
    const dispach = useDispatch()

    const handleRemove = () => {
        setOpen(false)
        dispach(removeItemCart({data:_id}))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="bg-red-500 ">
                    <span>Xóa</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-red-500">Bạn có chắc muốn xóa</h2>
                    <div className="flex items-center gap-x-2">
                        <Button onClick={handleRemove} className="bg-red-500">Có</Button>
                        <Button onClick={() => setOpen(false)} variant={"outline"}>Hủy</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ButtonConfirmRemove