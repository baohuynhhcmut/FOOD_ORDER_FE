import TableRestaurant from "@/components/Table"
import { restaurant } from "@/store/slice/RestaurantSlice"


type Props = {
    restaurant:restaurant[]
    setSelectedRes:any
    selectedRes:any
}

const Table = ({restaurant,selectedRes,setSelectedRes}:Props) => {

    return (
        <TableRestaurant 
            restaurant={restaurant}
            selectedRes={selectedRes}
            setSelectedRes={setSelectedRes}
        />
    )
}
export default Table