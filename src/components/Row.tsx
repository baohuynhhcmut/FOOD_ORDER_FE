import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { restaurant, setRestaurant } from "@/store/slice/RestaurantSlice"
import { useState } from "react"
import ButtonSelect from "./CardResButton/ButtonSelect"
import { useDispatch } from "react-redux"
import { handeRemoveRes, handleCheckBoxRes, removeType, selectedBox } from "@/service/restaurant"
import { toast } from "sonner"
import { formatDate } from "@/utils/date"
import ButtonDelete from "./CardResButton/ButtonDelete"
import ModalRestaurantDetail from "./ModalRestaurantDetail"
import ButtonEdit from "./CardResButton/ButtonEdit"

type Props = {
    item : restaurant
    setSelectedRes:any
    selectedRes:any
}

const Row = ({item,selectedRes,setSelectedRes}:Props) => {

    const [open,setOpen] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleCheckBox = (e:any) => {
            const params:selectedBox = {
                resList:selectedRes,
                setSelectedRes:setSelectedRes,
                e:e
            }
            handleCheckBoxRes(params)
    }

    const handleRemove = async(id:string) => {
        console.log(id)
        const params:removeType = {
            id:id,
            toast:toast,
            setOpen:setOpen,
            dispatch:dispatch,
            setRestaurant:setRestaurant
        }
        await handeRemoveRes(params)
    }

    
    return (
        <TableRow className="z-0! static! hover:z-0! hover:static">
            <TableCell>
                <ButtonSelect  
                    id={item._id}
                    resList={selectedRes}
                    handleCheckBox={handleCheckBox}
                />  
            </TableCell>
            <TableCell className="font-medium min-w-20">{item.restaurantName}</TableCell>
            <TableCell>
                <img src={item.imageUrl} className="w-20 min-w-20 h-20 object-cover" />
            </TableCell>
            <TableCell className="min-w-20">{formatDate(item.createdAt)}</TableCell>
            <TableCell className="flex w-full justify-end">
                <div className="flex items-center  gap-x-2">
                    <ButtonDelete open={open} setOpen={setOpen} name={item.restaurantName} handleRemove={async() => handleRemove(item._id)} />
                    <ButtonEdit id={item._id}/>
                    <ModalRestaurantDetail restaurant={item} />
                </div>
            </TableCell>

        </TableRow>
    )
}

export default Row