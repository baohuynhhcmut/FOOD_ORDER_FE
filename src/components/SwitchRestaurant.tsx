import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate, useParams } from "react-router-dom";

const SwitchRestaurant = () => {

  const {restaurantId} = useParams()
  console.log(restaurantId)
  const restaurantUser = useSelector((state:RootState) => state.restaurant.restaurant)
  const navigate = useNavigate()
  const idxSelected = restaurantUser.findIndex((item) => item._id == restaurantId)

  const handleNavigate = (_id:string) => {
    navigate(`/dashboard/overview/${_id}`)
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="w-full" variant={"link"}>
                <TiTick className="text-green-500" />
                {restaurantUser[idxSelected].restaurantName}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Chuyển nhà hàng</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {restaurantUser.map((item) => (
              item._id != restaurantId ? (
                <DropdownMenuItem onClick={() => handleNavigate(item._id)}>{item.restaurantName}</DropdownMenuItem>
              ):(
                <>
                </>
              )
            ))}
           
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SwitchRestaurant