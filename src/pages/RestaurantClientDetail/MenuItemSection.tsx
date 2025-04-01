import { Button } from "@/components/ui/button"
import { menuItem } from "@/type"
import { FaRegHeart } from "react-icons/fa";
import { Voucher } from "./RestaurantDetail";


type Props = {
  menuItem:menuItem,
  belongVoucher:Voucher[]
}

const checkBelongVoucher = (item:string,list:string[],codeName:string) => {
    if(list.includes(item)){
      return (
        <>
          <span className="bg-red-500 rounded-md text-xm text-white p-1" >{codeName}</span>
        </>
      )
    }
    else{
      return(
        <></>
      )
    }
}

const MenuItemSection = ({menuItem,belongVoucher}:Props) => {
  return (
    <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-10 border-t border-gray-300 pt-10 w-full items-start">
            <img src={menuItem.imageMenu} className="w-40 h-40 object-cover rounded-md " />
            <div className="flex flex-col gap-y-2 flex-1">
                <div className="flex items-center gap-x-2">
                  <span>Tên sản phẩm: </span>
                  <span className="font-bold">{menuItem.name}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Giá: </span>
                  <span className="font-bold">{menuItem.price}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Loại: </span>
                  <span className="font-bold">{menuItem.category}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Tình trạng: </span>
                  <span className="font-bold">{menuItem.status}</span>
                </div>
            </div>
            <div className="flex items-center flex-col gap-y-4 justify-end">
                <Button variant={"outline"}>Thêm giỏ hàng</Button>
                <Button className="bg-red-500 flex items-center text-white">
                  Yêu thích
                  <FaRegHeart />
                </Button>
            </div>  
        </div>
        <div className="flex items-center gap-x-2">
            Có voucher: 
            <div className="flex gap-x-2 items-center">
              {belongVoucher.map((item) => {
                return checkBelongVoucher(menuItem._id,item.menu,item.code_name)
              })}
            </div>
        </div>
    </div>

  )
}
export default MenuItemSection