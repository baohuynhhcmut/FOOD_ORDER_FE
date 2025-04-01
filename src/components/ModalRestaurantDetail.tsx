import { restaurant } from "@/store/slice/RestaurantSlice"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { formatDate } from "@/utils/date"

type Props = {
  restaurant: restaurant
}

const ModalRestaurantDetail = ({restaurant}:Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 w-full">Xem chi tiết</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{restaurant.restaurantName}</DialogTitle>
          <DialogDescription>
              <div className="flex flex-col gap-y-2">
                <div>
                    <img src={restaurant.imageUrl} className="w-40 h-40 object-cover" />
                </div>
                <span>Thành phố: <span className="font-bold text-black">{restaurant.city}</span></span>
                <span>Giá ship: <span className="font-bold text-black">{restaurant.deliveryPrice}</span></span>
                <span>Tạo vào ngày: <span className="font-bold text-black">{formatDate(restaurant.createdAt)}</span></span>
                <span>Cập nhật vào ngày: <span className="font-bold text-black">{formatDate(restaurant.updatedAt)}</span></span>
                <span>Ẩm thực:   
                    <span className="font-bold text-black">
                    {restaurant.cuisines.map((item) => (
                        <span>{item} </span>
                    ))}
                  </span>
                </span>
              </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ModalRestaurantDetail