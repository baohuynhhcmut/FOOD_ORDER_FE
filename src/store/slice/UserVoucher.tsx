import { Voucher } from "@/pages/RestaurantClientDetail/RestaurantDetail";
import { createSlice } from "@reduxjs/toolkit";

export type UserVoucher = {
    userId:string;
    voucherId:string;
    status:string;
    createdAt:string;
    updatedAt:string;
    voucherDetail: Voucher
}

type initial = {
    voucherList : UserVoucher[]
}
const initialState:initial = {
    voucherList:[]
}

const UserVoucherSlice = createSlice({
    name:'UserVoucher',
    initialState,
    reducers:{
        setUserVoucher: (state,action) => {
            state.voucherList = action.payload.data
        },
        addNewVoucher:  (state,action) => { 
            state.voucherList = [...state.voucherList,action.payload.data]
        }
    }
})

export const {  setUserVoucher,addNewVoucher } = UserVoucherSlice.actions
export default UserVoucherSlice.reducer