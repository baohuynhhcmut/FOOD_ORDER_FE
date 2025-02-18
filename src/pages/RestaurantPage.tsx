import { useCreateRestaurant, useGetRestaurant, useUpdateMyRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/form/Restaurant Form/ManageRestaurantForm";


const RestaurantPage = () => {

    const { createRestaurant,isLoading:isCreateLoading } = useCreateRestaurant()

    const { restaurant,isLoading:isGetLoading } = useGetRestaurant()
    
    const { updateRestaurant,isLoading:isUpdateLoading} = useUpdateMyRestaurant()

    if(isGetLoading){
        return(
            <>
                <h2 className="text-2xl text-orange-500">Loading data...</h2>
            </>
        )
    }

    const isEditting = !!restaurant

    return (
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={isEditting  ? updateRestaurant :  createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    );
}

export default RestaurantPage;
