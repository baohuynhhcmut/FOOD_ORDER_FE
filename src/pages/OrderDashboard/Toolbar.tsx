import { getOrderOfRestaurant } from "@/api/OrderApi"
import Searchbar from "@/components/ToolbarDashboard/Searchbar"
import SelectPageLimit from "@/components/ToolbarDashboard/SelectPageLimit"
import Sort from "@/components/ToolbarDashboard/Sort"
import Status from "@/components/ToolbarDashboard/Status"
import { setOrder } from "@/store/slice/OrderSlice"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export type searchObj = {
    searchText:'',
    sort:string[],
    bankCode:string,
    status:string
}   

export type paginateObj = {
    page:number;
    limit:number;
    total:number;
}

const orderStatus = ["Khởi tạo","Thất bại","Đã thanh toán","Đang giao","Thành công",'Tất cả']

const bankCode = ["Thanh toán thẻ ATM  ngân hàng","Thanh toán thẻ quốc tế",'Tất cả']

const sortOptions = [
    ['createdAt', '-1', 'Ngày tạo mới nhất'],
    ['createdAt', '1', 'Ngày tạo lâu nhất'],
    ['updatedAt', '-1', 'Ngày cập nhật mới nhất'],
    ['updatedAt', '1', 'Ngày cập nhật lâu nhất'],
    ['menu.totalPrice', '-1', 'Giá cao nhất'],
    ['menu.totalPrice', '1', 'Giá thấp nhất'],
    ['menuDetails.name', '1', 'Tên theo thứ tự tăng dần'],
    ['menuDetails.name', '1', 'Tên sản phẩm theo thứ tự giảm dần'],
];


export const initValueSearch:searchObj = {
    searchText:'',
    sort: sortOptions[0],
    bankCode:bankCode[2],
    status:orderStatus[5]
}

export const initPaginationObj:paginateObj = {
    page:1,
    limit:5,
    total:0 
}

type Props = {
    restaurantId:string;
    paginateObj:paginateObj,
    setPaginateObj:React.Dispatch<React.SetStateAction<paginateObj>>
    searchObj:searchObj,
    setSearchObj : React.Dispatch<React.SetStateAction<searchObj>>
}

const Toolbar = ({restaurantId,paginateObj,setPaginateObj,searchObj,setSearchObj}:Props) => {
    
    const dispatch = useDispatch()

    const onValueChange = (text:string) => {
        setSearchObj((prev:any) => {
            return {...prev,searchText:text}
        })
    }

    const onSubmitValue =  async () => {
        if(restaurantId){
            const updatedPg = {...paginateObj,page:1}
            const result = await getOrderOfRestaurant(restaurantId,searchObj,updatedPg)
            setPaginateObj(result.pagination)
            dispatch(setOrder({data:result.data}))
        }
    }

    const onSelectedStatus = async(value:string) => {
        const updatedData = {...searchObj,status:value}
        setSearchObj(updatedData)
        if(restaurantId){
            const updatedPg = {...paginateObj,page:1}
            
            const result = await getOrderOfRestaurant(restaurantId,updatedData,updatedPg)

            setPaginateObj(result.pagination)

            dispatch(setOrder({data:result.data}))
        }
    }

    const onSelectValue =  async (value:number) => {
        const updatedData = {...searchObj,sort: sortOptions[value]}
        setSearchObj(updatedData)
        if(restaurantId){
            const updatedPg = {...paginateObj,page:1}
            
            const result = await getOrderOfRestaurant(restaurantId,updatedData,updatedPg)
            
            setPaginateObj(result.pagination)

            dispatch(setOrder({data:result.data}))
        }
    }
    
    const onSelectValueBankCode =  async (value:string) => {
        const updatedData = {...searchObj,bankCode:value}

        setSearchObj(updatedData)

        if(restaurantId){
            const updatedPg = {...paginateObj,page:1}
           
            const result = await getOrderOfRestaurant(restaurantId,updatedData,updatedPg)
            
            setPaginateObj(result.pagination)

            dispatch(setOrder({data:result.data}))
        }
    }
    

    const handleSelectedPageChange = async (value:string)  => {
        let updatedData:paginateObj
        if(value == 'all'){
            updatedData = {...paginateObj,page:1,limit:paginateObj.total}
        }
        else{
            updatedData = {...paginateObj,page:1,limit: parseInt(value)}
        }

        if(restaurantId){
            const result = await getOrderOfRestaurant(restaurantId,searchObj,updatedData)
            setPaginateObj(result.pagination)
            dispatch(setOrder({data:result.data}))
        }
    }

    // console.log(paginateObj)

    return (
        <div className="p-3 flex items-center justify-between gap-4 md:flex-row flex-col">
            <Searchbar 
                searchObj={searchObj}
                onSubmitValue={onSubmitValue}
                onValueChange={onValueChange}
                placeHoder="Tìm kiếm theo mã sản phẩm"
            />
            
            <Status 
                valueDefaultStatus={orderStatus}
                onSelectedStatus={onSelectedStatus}
                valueSelectedStatus={searchObj.status}
            />

            <Status 
                valueDefaultStatus={bankCode}
                onSelectedStatus={onSelectValueBankCode}
                valueSelectedStatus={searchObj.bankCode}
            />

            <Sort 
                valueDefault={sortOptions}
                valueSelected={searchObj.sort}
                onSelectValue={onSelectValue}
            />
            
            <SelectPageLimit 
                pagintionObj={paginateObj}
                setValue={handleSelectedPageChange}
            />
        </div>
    )
}



export default Toolbar