import { getCart, removeCart, setCart } from "@/service/cart";
import { MenuRequest } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

type Init = {
    cart: MenuRequest[]
}

const initValue:Init = {
    cart : []
}

export const cartSlice= createSlice({
    name:'cart',
    initialState:initValue,
    reducers:{
        getCurrCart : (state,action) => {
            state.cart = getCart()
        },
        addCart: (state,action) => {
            const { data } = action.payload
            const exits = state.cart.findIndex((item) => item.item == data)
            if(exits != -1){
                state.cart[exits].quantity += 1
            }
            else{
                state.cart = [...state.cart,{
                    item:data,
                    quantity:1
                }]
            }
            setCart(state.cart)
        },
        decreCart:(state,action) => {
            const { data } = action.payload
            const exits = state.cart.findIndex((item) => item.item == data)
            if(exits != -1){
                if(state.cart[exits].quantity > 1){
                    state.cart[exits].quantity -= 1
                }
            }
            setCart(state.cart)
        },
        removeItemCart: (state,action) => {
            const { data } = action.payload
            const exits = state.cart.findIndex((item) => item.item == data)
            if(exits != -1){
                state.cart = state.cart.filter((item) => item.item != data)
                setCart(state.cart)
            }
        },
        clearCart: (state,action ) => {
            state.cart = []
            removeCart()
        }
    }
})

export const { getCurrCart,addCart,clearCart,decreCart,removeItemCart } = cartSlice.actions

export default cartSlice.reducer