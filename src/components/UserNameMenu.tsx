import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/AuthSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const UserNameMenu = ({user}:{user:any}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const handelLogout = async () => {
    await signOut(auth)
    dispatch(logout({}))
    navigate("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2 focus:outline-none focus:ring-0 focus:border-transparent">
        <CircleUserRound className="text-orange-500" />
        {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to={"/user-profile"}
            className="font-bold hover:text-orange-500"
          >
            Tài khoản
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            to={"/my-restaurant"}
            className="font-bold hover:text-orange-500"
          >
            Nhà hàng 
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            to={"/order/history"}
            className="font-bold hover:text-orange-500"
          >
            Lịch sử 
          </Link>
        </DropdownMenuItem>


        <Separator />
        <DropdownMenuItem>
          <Button className="flex flex-1 mt-2 font-bold bg-red-500" onClick={() => handelLogout()}>Logout</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
