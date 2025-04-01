import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { restaurantClient } from "@/type"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

type Props = {
  restaurant:restaurantClient
}

const badge = (name:string) => {
  if(name.toLowerCase().includes('gà')){
    return (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">{name}</span>
    )
  }
  else if(name.toLowerCase().includes('hủ tiếu')){
    return(
      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{name}</span>
    )
  }
  else if(name.toLowerCase().includes('cơm')){
    return(
      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">{name}</span>
    )
  }
  return(
    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-indigo-900 dark:text-indigo-300">{name}</span>
  )
}

const RestaurantClientCard = ({restaurant}:Props) => {

  const navigate  = useNavigate()

  return (
    <Card>
      <CardHeader>
        <img className="w-full h-40" src={restaurant.imageUrl} />
      </CardHeader>
      <CardContent className="flex flex-col h-[180px] overflow-ellipsis overflow-hidden">
        <h2 className="font-bold text-xl h-[60px] line-clamp-2 mb-2">{restaurant.restaurantName}</h2>
        <span className="text-gray-800 text-xs">{restaurant.city}</span>
        <span className="text-gray-800 text-xs">Giá ship: {restaurant.deliveryPrice} Vnđ</span>
        <span className="text-gray-800 text-xs">Thời gian vận chuyển: {restaurant.estimatedDeliveryTime} phút</span>
        <div className="flex flex-wrap gap-2 mt-5">
        {restaurant && restaurant.menuItem.map((item, index) => {
              // Create a set to track displayed categories
              const displayedCategories = new Set();

              // Check if the category has already been displayed
              if (!displayedCategories.has(item.category)) {
                // If not, display the badge and add the category to the set
                displayedCategories.add(item.category);
                return badge(item.category);
              }

              // Return null if the category has already been displayed
              return null;
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => navigate(`/restaurant/detail/${restaurant._id}`)}>Xem nhà hàng</Button>
      </CardFooter>
    </Card>
  )
}

export default RestaurantClientCard