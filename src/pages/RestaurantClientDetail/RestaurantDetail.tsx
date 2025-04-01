import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Hero from "./Hero"
import { Button } from "@/components/ui/button"
import RestaurantIntro from "./RestaurantIntro"
import { restaurantClient } from "@/type"
import MenuItemSection from "./MenuItemSection"
import VoucherSection from "./VoucherSection"
import { useEffect, useState } from "react"
import { getRestaurantVoucher, getUserVoucher } from "@/api/Voucher"
import { setUserVoucher } from "@/store/slice/UserVoucher"

export type Voucher = {
    _id:string;
    restaurantId: string;
    code: string;
    type: string;
    code_name:string;
    discount: number;
    name: string;
    description: string;
    menu: string[];
    createdAt: Date;
    expiredAt: Date;
};


const RestaurantDetail = () => {

    const {restaurantId} = useParams()
    const listRestaurant = useSelector((state:RootState) => state.restaurantClient.restaurants)
    const user = useSelector((state:RootState) => state.user.user)
    const navigate = useNavigate()
    const restaurant = listRestaurant.find((item) => item._id == restaurantId)
    const dispatch = useDispatch()
    const [voucher,setVoucher] = useState<Voucher[]>([])

    useEffect(() => {
        const fetchAPI = async () => {
            if(restaurantId){
                const result = await getRestaurantVoucher(restaurantId)
                setVoucher(result.data)
            }
        }
        fetchAPI()
    },[])

    useEffect(() => {
        const fetchAPI = async () => {
            if(user){
                const result = await getUserVoucher(user._id)
                dispatch(setUserVoucher({data:result.data}))
            }
        }
        fetchAPI()
    },[])

    // console.log(user)
    
    return (
        <div className="flex flex-col gap-y-10 max-w-7xl mx-auto">
            <div>
                <Button variant={"outline"} onClick={() => navigate('/restaurant')}>Trở lại</Button>
            </div>
            <div className="grid grid-cols-2 gap-10">
                <Hero image={restaurant?.imageUrl as string} />
                {restaurant && <RestaurantIntro restaurant={restaurant} />}
            </div>
            <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-y-5 w-full">
                    {restaurant?.menuItem.map((item) => (
                        <MenuItemSection belongVoucher={voucher} menuItem={item}/>
                    ))}
                </div>
                <div className="flex flex-col gap-y-5 w-full">
                    {voucher.map((item) => (
                        <VoucherSection voucher={item} userId={user._id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetail