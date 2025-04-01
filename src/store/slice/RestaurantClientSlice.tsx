
import { restaurantClient } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

type init = {
    restaurants : restaurantClient[]
}
const initialState:init = {
    restaurants:[]
}

const restaurantClientSlice = createSlice({
    name: "restaurantClient",
    initialState,
    reducers: {
        setRestaurants(state, action){
            state.restaurants = action.payload.data;
        }
    }
})

export const { setRestaurants } = restaurantClientSlice.actions;

export default restaurantClientSlice.reducer;