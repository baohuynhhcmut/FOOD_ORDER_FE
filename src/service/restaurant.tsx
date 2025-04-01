import { removeRestaurant } from "@/api/RestaurantApi"
import React from "react"

export type removeType = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id:string;
    dispatch: any;
    toast:any;
    setRestaurant:any;
}

export const handeRemoveRes = async ({setOpen,id,dispatch,toast,setRestaurant}:removeType) => {
    setOpen(false)
    try {
        const result = await removeRestaurant(id)
        dispatch(setRestaurant({restaurant:result.data}))
        toast.success("Xóa nhà hàng thành công")
    } catch (error) {
        console.log(error)
    }
}

export type selectedBox = {
    resList: string[],
    setSelectedRes:React.Dispatch<React.SetStateAction<any[]>>
    e:any
}

export const handleCheckBoxRes = ({resList,setSelectedRes,e}:selectedBox) => {
    const checkbox = e.target 
    const value = checkbox.value
    if(checkbox.checked){
        setSelectedRes((prev) => [...prev,value])
    }
    else{
        const resSelectFilter = resList.filter((item) => item != value)
        setSelectedRes(resSelectFilter)
    }
}



