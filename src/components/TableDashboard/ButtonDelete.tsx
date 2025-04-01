import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useState } from "react";
import { deleteMenuRestaurant } from "@/api/MenuApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeMenuRestaurant } from "@/store/slice/MenuRestaurantSlice";

type Props = {
    _id:string;
}

const ButtonDelete = ({_id}:Props) => {

    const [open,setOpen] = useState(false) 
    const dispatch = useDispatch()

    const handleDeleted = async () => {
        setOpen(false)
        const result = await deleteMenuRestaurant(_id)
        if(result.code == 200){
            toast.success('Xóa thành công')
            dispatch(removeMenuRestaurant({data:[_id]}))
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="bg-red-500">Xóa</Button>
            </PopoverTrigger>
            <PopoverContent>
                Bạn có chắc muốn xóa sản phẩm này
                <div className="flex items-center gap-x-4">
                    <Button onClick={() => setOpen(false)} variant={"outline"}>Hủy</Button>
                    <Button onClick={handleDeleted}  className="bg-red-500">Có</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ButtonDelete