import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { menuItem } from "@/type"
import { Button } from "./ui/button"
import FoodButtonBuy from "./FoodButtonBuy"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addCart } from "@/store/slice/CartSlice"
import FoodCartButton from "./FoodCartButton"

type Props = {
    menuItem: menuItem
}

const FoodCard = ({menuItem}:Props) => {

    const [quantity,setQuantity] = useState(1)

    const cart = useSelector((root:RootState) => root.cart.cart)
    
    const dispatch = useDispatch()

    const handleAdd = () => {
        dispatch(addCart({data:menuItem._id}))
    }

    // console.log('>> Cart: ',cart)

    return (
        <Card>
            <CardHeader>
                <img className="w-full object-cover h-[300px] md:h-[200px] lg:h-32 rounded-md" src={menuItem.imageMenu} />
            </CardHeader>
            <CardContent>
                <p className="font-bold">{menuItem.name}</p>
                <p>{menuItem.price} Vnđ</p>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-between w-full flex-col gap-y-2 md:p-0 p-10">
                    <FoodButtonBuy
                        quantity={quantity}
                        setQuantity={setQuantity}
                        menuItem={menuItem}
                    />
                    <>
                        {cart.find((item) => item.item == menuItem._id) ? (
                           <>
                                <FoodCartButton _id={menuItem._id}/>
                           </>
                        ):(
                            <>
                                <Button className="bg-orange-500 w-full" onClick={handleAdd}>Thêm vào giỏ hàng</Button>
                            </>
                        )}
                    </>
                </div>
            </CardFooter>
        </Card>
    )
}

export default FoodCard