import { getOrderOfRestaurant } from "@/api/OrderApi"
import { setOrder } from "@/store/slice/OrderSlice"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Table from "./Table"
import Toolbar, { initPaginationObj, initValueSearch } from "./Toolbar"
import { paginateObj,searchObj } from "./Toolbar"
import Pagination from "@/components/Pagination"

const OrderDashboard = () => {

  const order = useSelector((state:RootState) => state.order.orderItem)
  const { restaurantId } = useParams()
  const dispatch = useDispatch()
  const [paginateObj,setPaginateObj] = useState<paginateObj>(initPaginationObj)
  const [searchObj,setSearchObj] = useState<searchObj>(initValueSearch)

  useEffect(() => {
    const fetchAPI = async () => {
      if(restaurantId){
        const result = await getOrderOfRestaurant(restaurantId,initValueSearch,initPaginationObj)
        setPaginateObj(result.pagination)
        dispatch(setOrder({data:result.data}))
      }
    }
    fetchAPI()
  },[])

  // console.log(order)

  const handlePageChange = async(currPage:number) => {
      const pagetemp = currPage + 1
      const updatedData = {...paginateObj,page:pagetemp}
      setPaginateObj(updatedData)
      if(restaurantId){
        const result = await getOrderOfRestaurant(restaurantId,searchObj,updatedData)
        dispatch(setOrder({data:result.data}))
      }
  }

  return (
    <div className="flex flex-col gap-y-4 p-3">
        <Toolbar 
          restaurantId={restaurantId as string}
          paginateObj={paginateObj}
          setPaginateObj={setPaginateObj}
          searchObj={searchObj}
          setSearchObj={setSearchObj}
        />
        <Table
          orders={order}
        />
        <Pagination 
          paginationObj={paginateObj}
          handlePageChange={handlePageChange}
        />
    </div>
  )
}



export default OrderDashboard