const BASE_API_URL = import.meta.env.VITE_API_BASE_URL 
import { getToken } from "@/utils/token"

export const createVoucher = async(dataUpdated:any) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/voucher`,{
            method: 'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({dataUpdated})
        })
        const result =  await respone.json()
        return result
    }
    catch (error) { console.log(error) }
}

export const getRestaurantVoucher = async(restaurantId:string) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/voucher/${restaurantId}`,{
            method: 'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const result =  await respone.json()
        return result
    }
    catch (error) { console.log(error) }
}

type dataAdd = {
    userId:string,
    voucherId:string,
    type:string,
    code:string,
}

export const userAddVoucher = async(data:dataAdd) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/voucher/add-user`,{
            method: 'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({data})
        })
        const result =  await respone.json()
        return result
    }
    catch (error) { console.log(error) }
}

export const getUserVoucher = async(userId:dataAdd) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/voucher/get-user/${userId}`,{
            method: 'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const result =  await respone.json()
        console.log(result)
        return result
    }
    catch (error) { console.log(error) }
}
