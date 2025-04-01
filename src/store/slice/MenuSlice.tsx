import { menuItem } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type menus = {
    menuItems: menuItem[]
}

const init:menus = {
    menuItems: []
}


const menuSlice = createSlice({
    name:  "menu",
    initialState:init,
    reducers:{
        setMenu: (state,action:PayloadAction<any>) =>{
            // console.log(action.payload)
            state.menuItems = action.payload.menuItems
        }
    }
})

export const { setMenu } = menuSlice.actions

export default menuSlice.reducer