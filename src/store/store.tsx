import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/AuthSlice"
import restaurantReducer from "./slice/RestaurantSlice"
import menuReducer from "./slice/MenuSlice"
import cartReducer from "./slice/CartSlice"
import restaurantClientReducer from "./slice/RestaurantClientSlice"
import menuRestaurantSliceReducer from "./slice/MenuRestaurantSlice"
import orderReducer from "./slice/OrderSlice"
import userVoucher from "./slice/UserVoucher"


export const store = configureStore({
    reducer:{
        user:userReducer,
        restaurant:restaurantReducer,
        menu: menuReducer,
        cart: cartReducer,
        restaurantClient: restaurantClientReducer,
        menuRestaurant:menuRestaurantSliceReducer,
        order:orderReducer,
        userVoucher:userVoucher
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

