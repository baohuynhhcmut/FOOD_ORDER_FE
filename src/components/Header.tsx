import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
// import MainNav from "./MainNav";
import UserLogin from "./Login";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import type { RootState } from "@/store/store";
import UserNameMenu from "./UserNameMenu";
import { useEffect } from "react";
import { getToken } from "@/utils/token";
import { loadUser } from "@/store/slice/AuthSlice";
import { Button } from "./ui/button";
import { IoNotifications } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import Notification from "./Notification";


const PERMISSION_WITHOUT_LOGIN = [
  "/"
]
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;


const Header = () => {

  // const token = useSelector((state:RootState) => state.user.token)
  const user = useSelector((state:RootState) => state.user.user)

  const location = useLocation()
  const dispatch = useDispatch()
  const cart = useSelector((state:RootState) => state.cart.cart)

  useEffect(() => {
   
    if(PERMISSION_WITHOUT_LOGIN.includes(location.pathname)){
      const token = getToken()
      if(token){
        try {
          const getAuth = async()=>{
            const respone = await fetch(`${BASE_API_URL}/api/my/user/info`,{
              method:"GET",
              headers:{
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
              }
            })
            const {data} = await respone.json()
            dispatch(loadUser({user:data}))
          }
          getAuth()
        } catch (error) {
          console.log(error)
        }
      } 
    }
  },[location.pathname])

  return (
    <div className="border-b-2 border-b-orange-500 py-6 ">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">

       <div className="flex items-center gap-x-2 md:gap-x-10">
          <Link
              to={"/"}
              className="text-4xl font-bold tracking-tight text-orange-500"
            >
              BKU Chicken
            </Link>

            <div className="md:flex items-center gap-x-2 text-2xl font-bold hidden ">
                <Link to={"/food?food="}>
                  <Button variant={"link"} className="text-sm md:text-xl font-bold">Đồ ăn</Button>
                </Link>
                <Link to={"/restaurant"}>
                  <Button variant={"link"} className="text-sm md:text-xl font-bold">Nhà hàng</Button>
                </Link>
                <Link to={"/food"}>
                  <Button variant={"link"} className="text-sm md:text-xl font-bold">About us</Button>
                </Link>
            </div>
       </div>
        
        <div className="md:hidden flex items-center gap-x-10">
              <Link to={'/cart'}>
                <Button variant={"ghost"} className="relative">
                  <FaCartShopping className="text-orange-500" />
                  {cart.length > 0 && 
                  <span className="text-xs w-[15px] h-[15px] absolute right-0 top-0 rounded-full bg-red-500 text-white  inline-flex justify-center items-center">
                      {cart.length}
                  </span>}
                </Button>
              </Link>
          <MobileNav />
        </div>
        <div className="hidden md:block">
          {/* <UserLogin /> */}

          {user ? (
              <div className="flex items-center gap-x-2"> 
                <Link to={'/cart'}>
                  <Button variant={"ghost"} className="relative">
                    <FaCartShopping className="text-orange-500" />
                   {cart.length > 0 && 
                    <span className="text-xs w-[15px] h-[15px] absolute right-0 top-0 rounded-full bg-red-500 text-white  inline-flex justify-center items-center">
                        {cart.length}
                    </span>}
                  </Button>
                </Link>

                <Notification user={user} />

                <UserNameMenu user={user} />
              </div>
          ):(
            <AuthModal />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
