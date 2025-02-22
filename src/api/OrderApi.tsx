import { CheckoutSessionRequest } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL 


export const useCreateSession = () => {
    const {getAccessTokenSilently } = useAuth0()

    const createSession = async (checkoutSession:CheckoutSessionRequest) => {
        const token = await getAccessTokenSilently()
        const respone = await fetch(`${BASE_API_URL}/api/order/checkout/create-checkout-session`,{
            method: 'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(checkoutSession)
        })

        if(!respone.ok){
            throw new Error()
        }

        return respone.json()
    }

    const { 
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset
    } = useMutation(createSession)

    if(error){
        toast.error('Fail to create checkout')
        reset()
    }

    return {
        createCheckoutSession,
        isLoading
    }
}   