import { getRestaurantById, useUpdateMyRestaurant } from "@/api/RestaurantApi"
import EditRestaurantForm from "@/form/Restaurant Form/EditRestaurantForm"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const EditRestaurant = () => {
    
    const { restaurantId } = useParams()
    const [restaurant,setRestaurant] = useState()
    const {updateRestaurant,isLoading} = useUpdateMyRestaurant(restaurantId as string)

    const onSave = async(data:FormData) => {
        await updateRestaurant(data)
    }
    
    useEffect(() => {
        const getRes = async () => {
            const result = await getRestaurantById(restaurantId as string)
            setRestaurant(result.data)
        }
        getRes()
    },[])

    console.log(restaurant)

    return (        
       <EditRestaurantForm 
            restaurant={restaurant}
            onSave={onSave}
            isLoading={isLoading}
       />
    )
}

export default EditRestaurant