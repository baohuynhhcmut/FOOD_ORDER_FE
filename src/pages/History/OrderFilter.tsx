import Searchbar from "@/components/ToolbarDashboard/Searchbar";
import { paginateObj } from "../OrderDashboard/Toolbar";
import Sort from "@/components/ToolbarDashboard/Sort";
import { sortOptionsOrder } from "./Order";
import { getAllOrder } from "@/api/OrderApi";
import { order, paginationObj } from "@/type";
import { useEffect } from "react";

type searchObj = {
  searchText:string;
  sort:string[];
}
type Props = {
    searchObj:searchObj;
    setSearchObj:React.Dispatch<React.SetStateAction<searchObj>>
    paginatioObj:paginateObj,
    setPagination:React.Dispatch<React.SetStateAction<paginateObj>>
    setOrder: React.Dispatch<React.SetStateAction<order[]>>
    setLoad:any
}




const OrderFilter = ({searchObj,setSearchObj,paginatioObj,setPagination,setOrder,setLoad}:Props) => {


  const onValueChange = (value:string) => {
    setSearchObj((prev) => {
      return {...prev,searchText:value}
    })
  }

  const onSubmit = async () => {
    setLoad(true)
    const updatedPg:paginationObj = {...paginatioObj,page:1}
    const result = await getAllOrder(searchObj,updatedPg)
    setPagination(result.pagination)
    setOrder(result.data)
    setLoad(false)
  }

  const handelSelectedValue = async(value:number) => {
    setLoad(true)
    const searchUpdatedd:searchObj = {...searchObj,sort:sortOptionsOrder[value]}
    const updatedPg:paginationObj = {...paginatioObj,page:1}
    console.log(updatedPg)
    setSearchObj(searchUpdatedd)
    const result = await getAllOrder(searchUpdatedd,updatedPg)
    setPagination(result.pagination)
    setOrder(result.data)
    setLoad(false)
  }

  // useEffect(() => {
  //   console.log('Go here')
  // },[paginatioObj,searchObj])

    return (
      <div className="flex md:flex-row flex-col items-center justify-between gap-10 mb-10 p-10 md:mb-0 md:p-0">
       <div className="w-full md:w-[500px]">
        <Searchbar 
            searchObj={searchObj}
            onSubmitValue={onSubmit}
            onValueChange={onValueChange}
            placeHoder="Tìm kiếm theo mã đơn hàng"
          />
       </div>

        <div className="w-full md:max-w-[200px]">
          <Sort 
            valueDefault={sortOptionsOrder}
            valueSelected={searchObj.sort}
            onSelectValue={handelSelectedValue}
          />
        </div>
      </div>
    )
}

export default OrderFilter