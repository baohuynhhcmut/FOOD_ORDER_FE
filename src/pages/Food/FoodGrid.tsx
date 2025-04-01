import FoodCard from "@/components/FoodCard"
import { menuItem } from "@/type"


type Props = {
    menuItem: menuItem[]
}

const FoodGrid = ({menuItem}:Props) => {

    // console.log(menuItem)

    return (
        <div className="w-full h-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-10 md:p-0">
                {menuItem.map((item) => (
                    <FoodCard menuItem={item} />
                ))}
            </div>
        </div>
    )
}

export default FoodGrid