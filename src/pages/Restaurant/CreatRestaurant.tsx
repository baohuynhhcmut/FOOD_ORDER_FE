import { useCreateRestaurant } from "@/api/RestaurantApi"
import ManageRestaurantForm from "@/form/Restaurant Form/ManageRestaurantForm"

const CreatRestaurant = () => {

    const { createRestaurant,isLoading } = useCreateRestaurant()

    return (
        <ManageRestaurantForm 
            onSave={createRestaurant}
            isLoading={isLoading}
        />
    )
}

export default CreatRestaurant