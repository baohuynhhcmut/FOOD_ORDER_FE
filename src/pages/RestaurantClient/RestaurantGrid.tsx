import RestaurantClientCard from "@/components/RestaurantClientCard";
import { restaurantClient } from "@/type";

type Props = {
  restaurants: restaurantClient[];
}

const RestaurantGrid = ({restaurants}:Props) => {
  return (
    <div className="grid  md:grid-cols-2 xl:grid-cols-4  gap-y-4 md:gap-x-4 p-10 md:p-0">
        {restaurants.map((item) => (
          <RestaurantClientCard restaurant={item} />
        ))}
    </div>
  )
}

export default RestaurantGrid