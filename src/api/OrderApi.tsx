import { paginateObj, searchObj } from "@/pages/OrderDashboard/Toolbar"
import { CheckoutSessionRequest, order, Order, ordersList, paginationObj, PaymentRequest } from "@/type"
import { getToken } from "@/utils/token"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
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



export const useGetOrders = () => {
    const {getAccessTokenSilently } = useAuth0()
    const getOrderRequest = async () : Promise<Order[]> => {   
        const token = await getAccessTokenSilently()
        const respone = await fetch(`${BASE_API_URL}/api/order`,{
            method:'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        if(!respone){
            throw new Error()
        }

        return respone.json()
    }

    const { data,isLoading,isError } = useQuery('getOrder',getOrderRequest)

    if(isError){
        toast.error('Cannot get order')
    }

    return{
        data,
        isLoading
    }
}

export const createOrder = async (paymentRequest:PaymentRequest) => {
    const token = getToken()
    try {
        const respone = await fetch(`${BASE_API_URL}/api/order/vn-pay`,{
            method:'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(paymentRequest)
        })
        const result = await respone.json()
        return result
    } 
    catch (error) {
        console.log(error)
    }
}


type orderRespone = {
    code:number;
    data:ordersList;
    pagination:paginateObj
    message:string;
}

type searchObjOrder = {
    searchText:string;
    sort:string[];
}

export const getAllOrder = async(searchObj:searchObjOrder,paginationObj:paginationObj) : Promise<orderRespone>=> {
    const token = getToken()
    try {
        const respone = await fetch(`${BASE_API_URL}/api/order?search=${searchObj.searchText}&sort=${searchObj.sort}&page=${paginationObj.page}&limit=${paginationObj.limit}`,{
            method:'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const result:orderRespone = await respone.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getOrderOfRestaurant = async(restaurantId:string,searchObj:searchObj,paginateObj:paginateObj)=> {
    const token = getToken()
    try {
        const url = `${BASE_API_URL}/api/order/restaurant/${restaurantId}?search=${searchObj.searchText}&bankCode=${searchObj.bankCode}&status=${searchObj.status}&sort=${searchObj.sort.join(',')}&page=${paginateObj.page}&limit=${paginateObj.limit}`

        const respone = await fetch(url,{
            method:'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        const result = await respone.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const editOrderOfRestaurant = async(idList:any,status:string)=> {
    const token = getToken()
    try {
        const respone = await fetch(`${BASE_API_URL}/api/order/restaurant/edit`,{
            method:'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({idList,status})
        })
        const result = await respone.json()
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

