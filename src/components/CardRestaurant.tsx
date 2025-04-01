import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { restaurant, setRestaurant } from "@/store/slice/RestaurantSlice"
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import ModalRestaurantDetail from "./ModalRestaurantDetail";
import ButtonEdit from "./CardResButton/ButtonEdit";
import ButtonDelete from "./CardResButton/ButtonDelete";
import ButtonSelect from "./CardResButton/ButtonSelect";
import { handeRemoveRes, handleCheckBoxRes, removeType, selectedBox } from "@/service/restaurant";
import { formatDate } from "@/utils/date";


type Props = {
    restaurant:restaurant,
    resList: string[],
    setSelectedRes:React.Dispatch<SetStateAction<any[]>>
}

const CardRestaurant = ({restaurant,setSelectedRes,resList}:Props) => {

    const [open,setOpen] = useState(false)

    const dispatch = useDispatch()

    const handleRemove = async (id:string) => {
        const params:removeType = {
            id:id,
            toast:toast,
            setOpen:setOpen,
            dispatch:dispatch,
            setRestaurant:setRestaurant
        }
        await handeRemoveRes(params)
    }

    const handleCheckBox = (e:any) => {
        const params:selectedBox = {
            resList:resList,
            setSelectedRes:setSelectedRes,
            e:e
        }
        handleCheckBoxRes(params)
    }   
    

    return (
        <Card>
            <CardHeader>
                <div  className="flex justify-between">
                    <div className="">
                        <CardTitle>{restaurant.restaurantName}</CardTitle>
                        <CardDescription>
                            <div className="flex flex-col">
                                <span>{restaurant.city}</span>
                                <span>Ngày tạo: {formatDate(restaurant.createdAt)}</span>
                            </div>
                        </CardDescription>
                    </div>
                    <ButtonSelect id={restaurant._id} resList={resList} handleCheckBox={handleCheckBox} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    <Zoom>
                        <img className="w-56 h-40 object-cover" src={restaurant.imageUrl} />
                    </Zoom>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex gap-x-2 w-full justify-between items-center flex-col gap-y-2">
                    <ButtonEdit id={restaurant._id} />
                    <ButtonDelete open={open} setOpen={setOpen} name={restaurant.restaurantName} handleRemove={async() => await handleRemove(restaurant._id)} />
                    <ModalRestaurantDetail restaurant={restaurant}  />
                </div>
            </CardFooter>
      </Card>
    )
}

export default CardRestaurant