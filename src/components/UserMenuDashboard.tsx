import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "./ui/button"
import SwitchRestaurant from "./SwitchRestaurant"
import { Separator } from "./ui/separator"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const UserMenuDashboard = () => {

  const navigate = useNavigate()

  const user = useSelector((state:RootState) => state.user.user)


  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant={"outline"}>
                 <span className="font-bold">Welcome {user?.name}</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]">
            <div className="flex flex-col gap-y-3 justify-center items-center ">
                <SwitchRestaurant />
                <Separator />
                <Button className="bg-red-600 w-full" onClick={() => navigate('/my-restaurant')}>
                    Thoát
                </Button>
            </div>
        
        </PopoverContent>
    </Popover>
  )
}
export default UserMenuDashboard