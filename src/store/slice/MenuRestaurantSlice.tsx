
import { menuItem } from "@/type";
import { createSlice } from "@reduxjs/toolkit";


type initialValueType = {
    menuItem: menuItem[]
}

const initValue : initialValueType = {
    menuItem:[]
}

const menuRestaurantSlice = createSlice({
    name:'menuRestaurant',
    initialState:initValue,
    reducers:{
        setMenuRestaurant: (state,action) => {
            state.menuItem = action.payload.data
        },
        updateOneMenu: (state,action) => {
            const updated = action.payload.data 
            state.menuItem = state.menuItem.map((item) => {
                return item._id == updated._id ? updated : item
            })
        },
        removeMenuRestaurant: (state,action) => {
            const {data} = action.payload 
            state.menuItem = state.menuItem.filter((item) => {
                if(!data.includes(item._id)){
                    return item
                }
            })
        }
    }
})

export const { setMenuRestaurant,updateOneMenu,removeMenuRestaurant} = menuRestaurantSlice.actions

export default menuRestaurantSlice.reducer

