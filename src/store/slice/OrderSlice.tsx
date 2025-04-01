import { createSlice } from "@reduxjs/toolkit";

// Type cho menu item
interface MenuItem {
    item: string; // ObjectId của menu
    quantity: number;
    status: string;
    _id: string; // ObjectId của menu item
    totalPrice: number;
  }
  
  // Type cho menuDetails (thông tin chi tiết của món ăn)
  interface MenuDetails {
    _id: string; // ObjectId của món ăn
    name: string;
    price: number;
    imageMenu: string;
    category: string;
    createdAt: string; // Chuỗi dạng ISO 8601
    updatedAt: string; // Chuỗi dạng ISO 8601
    __v: number;
    restaurant: string; // ObjectId của nhà hàng
    status: string;}
  
  // Type cho order (đơn hàng)
export interface OrderMenu {
    _id: string; // ObjectId của đơn hàng
    menu: MenuItem;
    status: string; // Trạng thái đơn hàng
    total: number; // Tổng giá trị đơn hàng
    bankCode: string; // Mã ngân hàng
    email: string;
    createdAt: string; // Chuỗi dạng ISO 8601
    updatedAt: string; // Chuỗi dạng ISO 8601
    __v: number;
    menuDetails: MenuDetails; // Thông tin chi tiết món ăn
}

  

type initialValueType = {
    orderItem: OrderMenu[]
}

const initValue : initialValueType = {
    orderItem:[]
}

const orderMenuSlice = createSlice({
    name:'order',
    initialState:initValue,
    reducers:{
        setOrder: (state,action) => {
            state.orderItem = action.payload.data
        },
        // updateMulti: (state, action) => {
        //     const { orderId, menuId, status } = action.payload.data;
        //     console.log(orderId, menuId, status);
        //     console.log(state.orderItem);
        
        //     state.orderItem = state.orderItem.map((item) => {
        //         if (item._id === orderId) {
        //             return {
        //                 ...item,
        //                 menu: item.menu.map((e: any) =>
        //                     e._id === menuId ? { ...e, status } : e
        //                 ),
        //             };
        //         }
        //         return item;
        //     });
        // }
    }
})

export const { setOrder } = orderMenuSlice.actions

export default orderMenuSlice.reducer
