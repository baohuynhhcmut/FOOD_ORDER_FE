import { restaurantClient } from "@/type"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { formattedDate } from "@/utils/date"

type Props = {
    restaurant:restaurantClient
}

const RestaurantIntro = ({restaurant}:Props) => {
  return (
    <div className="flex flex-col gap-y-5 h-full w-full">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl">Welcome to {restaurant.restaurantName}</CardTitle>
                <CardDescription>{restaurant.city}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-black">Giá vận chuyển: {restaurant.deliveryPrice}</p>
                <p>Thời gian vận chuyển: {restaurant.estimatedDeliveryTime}</p>
                <p>Tọa lạc tại trung tâm Hà Nội, Moo Beef Steak là điểm đến lý tưởng cho những tín đồ đam mê ẩm thực phương Tây, đặc biệt là các món steak hảo hạng. Với nguồn nguyên liệu nhập khẩu chất lượng cao, mỗi miếng bò tại Moo Beef Steak đều được chế biến công phu, giữ trọn vị ngọt tự nhiên và độ mềm hoàn hảo.</p>
            </CardContent>
        </Card>
    </div>
  )
}
export default RestaurantIntro