import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { menuItem } from "@/type";

export type restaurant = {
    _id:string;
    email: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItem: menuItem[];
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

type init = {
    restaurant: restaurant[]
}

const initialState:init = {
    restaurant:[]
}

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState:initialState,
    reducers:{
        setRestaurant: (state,action:PayloadAction<any>) =>{
            // console.log(action.payload)
            state.restaurant = action.payload.restaurant
        }
    }
})

export const { setRestaurant } = restaurantSlice.actions

export default restaurantSlice.reducer