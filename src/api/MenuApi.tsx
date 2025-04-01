import { paginationObj } from "@/type"
import { getToken } from "@/utils/token"

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL 

const options = ["Phù hợp nhất","A-Z","Mới nhất","Đánh giá trung bình"]

type searchObjMenu = {
    searchText: string;
    sort:string[];
    genre: string [];
}

export const searchQuery = async(searchObj:searchObjMenu,paginateObj:paginationObj) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu?search=${searchObj.searchText}&sort=${searchObj.sort.join(',')}&category=${searchObj.genre.join(',')}&page=${paginateObj.page}&limit=${paginateObj.limit}`,{
            method: 'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        return respone.json()
    } catch (error) {
        console.log(error)
    }
}

export const getMenuById = async (id:string) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/detail/${id}`,{
            method: 'GET',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        return respone.json()
    }
    catch (error) { console.log(error) }
}


export const getMenuByListId = async (idList:any) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/detail/list`,{
            method: 'POST',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({idList})
        })
        return respone.json()
    }
    catch (error) { console.log(error) }
}

export const getMenuByRestarantId = async (id:string,page='',limit='',search='',genre='',sort='',status='') => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/restaurant/${id}?page=${page}&limit=${limit}&search=${search}&genre=${genre}&sort=${sort}&status=${status}`,{
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

export const editMenuRestaurant = async (id:string,data:FormData) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/restaurant/${id}`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body:data
        })
        const result =  await respone.json()
        return result
    }
    catch (error) { console.log(error) }
}

export const deleteMenuRestaurant = async (id:string) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/restaurant/${id}`,{
            method: 'DELETE',
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

export const deleteMultiMenuRestaurant = async (menuList:string[]) => {
    try {
        console.log(menuList)
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/restaurant-multi`,{
            method: 'DELETE',
            headers:{
                "Content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({menuList})
        })
        const result =  await respone.json()
        return result
    }
    catch (error) { console.log(error) }
}

export const getMenuResIdVoucher = async(restauranId:string) => {
    try {
        const token = getToken()
        const respone = await fetch(`${BASE_API_URL}/api/menu/voucher/${restauranId}`,{
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