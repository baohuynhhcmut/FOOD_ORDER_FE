import { useCreateRestaurant, useGetRestaurant, useUpdateMyRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/form/Restaurant Form/ManageRestaurantForm";


const RestaurantPage = () => {

    const { createRestaurant,isLoading:isCreateLoading } = useCreateRestaurant()

    const { restaurant } = useGetRestaurant()
    
    const { updateRestaurant,isLoading:isUpdateLoading} = useUpdateMyRestaurant()

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
