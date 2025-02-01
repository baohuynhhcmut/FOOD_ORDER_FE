import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"


const BASE_API_URL = import.meta.env.VITE_API_BASE_URL 


export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    
    const createRestaurantRequest = async (formData:FormData) => {
        const accessToken = await getAccessTokenSilently()
        const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`,{
            method:'POST',
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            body: formData
        })
        if(!respone.ok){
            throw new Error('Faild to create restaurant')
        }
        return respone.json()
    }

    const {
      mutateAsync: createRestaurant,
      isLoading,
      isSuccess,
      error,
    } = useMutation(createRestaurantRequest);

    if(isSuccess){
        toast.success('Create restaurant success')
    }

    if(error){
        toast.error('Fail to create restaurant')
    }

    return {
        createRestaurant,
        isLoading
    }
}


export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getRestaurantRequest = async () => {
        const accessToken = await getAccessTokenSilently()
        
        // console.log(accessToken)

        const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`,{
            method:'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        if(!respone.ok){
            throw new Error('Faild to create restaurant')
        }
        return respone.json()
    }

    const {data:restaurant,isLoading} = useQuery('fetchMyRestaurant',getRestaurantRequest)
    return{
        restaurant,
        isLoading
    }
}


export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyRestaurantRequest = async (formData: FormData) => {
        const accessToken = await getAccessTokenSilently()
        const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`,{
            method:'PUT',
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            body: formData
        })
        if(!respone.ok){
            throw new Error('Faild to create restaurant')
        }
        return respone.json()
    }

    const {
        mutateAsync: updateRestaurant,
        isLoading,
        isSuccess,
        error,
      } = useMutation(updateMyRestaurantRequest);
  
      if(isSuccess){
          toast.success('Update restaurant success')
      }
  
      if(error){
          toast.error('Fail to Update restaurant')
      }
  
      return {
        updateRestaurant,
        isLoading
      }
}