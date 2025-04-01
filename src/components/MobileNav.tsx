import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLink from "./MobileNavLink";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import UserNameMenu from "./UserNameMenu";
import { logout } from "@/store/slice/AuthSlice";

const MobileNav = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handelLogout = () => {
      dispatch(logout({}))
      navigate("/")
    }


  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        {user ? (
          <SheetTitle>
            {/* <UserNameMenu user={user} /> */}
            <div className="flex items-center gap-x-2">
              <CircleUserRound className="text-orange-500" />
              {user?.name}
            </div>
            <div className="flex flex-col gap-y-10 mt-10">
              <Link to={"/food?food="}>
                <Button
                  variant={"link"}
                  className="text-xl md:text-xl font-bold"
                >
                  Đồ ăn
                </Button>
              </Link>
              <Link to={"/restaurant"}>
                <Button
                  variant={"link"}
                  className="text-xl md:text-xl font-bold"
                >
                  Nhà hàng
                </Button>
              </Link>
              <Link to={"/food"}>
                <Button
                  variant={"link"}
                  className="text-xl md:text-xl font-bold"
                >
                  About us
                </Button>
              </Link>
              <Link
                to={"/user-profile"}
                className="font-bold hover:text-orange-500"
              >
                <Button
                  variant={"link"}
                  className="text-xl md:text-xl font-bold"
                >
                  Tài khoản
                </Button>
              </Link>
              <Link
                to={"/my-restaurant"}
                className="font-bold hover:text-orange-500"
              >
                <Button
                  variant={"link"}
                  className="text-xl md:text-xl font-bold"
                >
                  Nhà hàng
                </Button>
                
              </Link>

              <Link
                to={"/order/history"}
                className="font-bold hover:text-orange-500"
              >
                 <Button
                  variant={"link"}
                  className="text-xl md:text-xl font-bold"
                >
                  Lịch sử
                </Button>
              </Link>
              <Button onClick={() => handelLogout()} className="w-full bg-red-500">Thoát</Button>
            </div>
          </SheetTitle>
          
        ) : (
          <>
            <AuthModal />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
