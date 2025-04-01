import { removeToken, setToken } from '@/utils/token'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    user: any,
    token:string ,
}

const initUser:User = {
    token: localStorage.getItem("accessToken") || "",
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState:initUser,
    reducers:{
        login: (state,action:PayloadAction<any>) => {
            const {user,token} = action.payload
            console.log(action.payload)
            state.user = user,
            state.token = token,
            setToken(token)
        },
        loadUser: (state,action:PayloadAction<any>) => {
            const { user } = action.payload
            state.user = user
        },
        logout:(state,action:PayloadAction<any>) => {
            state.user = null;
            state.token = "";
            removeToken()
        }
    }
})

export const { login,logout,loadUser } = userSlice.actions

// export const selectUser = (state)

export default userSlice.reducer

