import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL 

type CreateUserRequest = {
    auth0ID: string,
    email:string
}

export const useCreateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0()

    const createMyUserRequest =  async (user: CreateUserRequest) => {

        const accessToken = await getAccessTokenSilently()

        const respone = await fetch(`${BASE_API_URL}/api/my/user`,{
            method:'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(user)
        })
        if(!respone.ok){
            throw new Error('Failed to create user')
        }
    } 

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest)

    return{
        createUser,
        isLoading,
        isError,
        isSuccess
    }
}

type formUpdateUserData = {
    name:string
    addressLine1: string
    city:string,
    country:string
}

export const useUpdateMyUser =  () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyUserRequest = async (formData : formUpdateUserData) => {

        const accessToken = await getAccessTokenSilently()

        const respone = await fetch(`${BASE_API_URL}/api/my/user`,{
            method:'PUT',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(formData)
        })

        if(!respone.ok){
            throw new Error('Faild to update user')
        }
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isError,
        isSuccess,
        error,
        reset
    } = useMutation(updateMyUserRequest)

    if(isSuccess){
        toast.success('Update user success')
    }   

    if(isError){
        toast.error('Faild to update user')
        reset()
    }

    return{
        updateUser,
        isLoading,
        isError,
        isSuccess,
        error,
        reset
    }
}


export const useGetCurrentUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyUserRequest = async () => {

        const accessToken = await getAccessTokenSilently()

        const respone = await fetch(`${BASE_API_URL}/api/my/user`,{
            method:'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        })

        if(!respone.ok){
            throw new Error('Faild to get user')
        }

        return respone.json()
    }

    const {
        data: currentUser,
        isLoading,
        isError
    } = useQuery('fetchingCurrentUser',getMyUserRequest)

    if(isError){
        toast.error('Faild to get user information')
    }

    return{
        currentUser,
        isLoading
    }

}   