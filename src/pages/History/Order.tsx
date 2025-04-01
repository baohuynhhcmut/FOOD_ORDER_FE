import { ordersList, paginationObj } from "@/type"
import OrderFilter from "./OrderFilter"
import OrderTable from "./OrderTable"
import { useState,useEffect } from "react"
import { getAllOrder } from "@/api/OrderApi"
import { paginateObj } from "../OrderDashboard/Toolbar"
import Pagination from "@/components/Pagination"
import Spinner from "@/components/Spinner"

export const sortOptionsOrder = [
    ['createdAt', '-1', 'Ngày tạo mới nhất'],
    ['createdAt', '1', 'Ngày tạo lâu nhất'],
    ['updatedAt', '-1', 'Ngày cập nhật mới nhất'],
    ['updatedAt', '1', 'Ngày cập nhật lâu nhất'],
    ['total', '-1', 'Tổng chi phí cao nhất'],
    ['total', '1', 'Tổng chi phí thấp nhất'],
];

type searchObj = {
    searchText:string;
    sort:string[];
}

const initialSearch:searchObj = {
    searchText : '',
    sort:  sortOptionsOrder[0]
}

const initialPaginationObj:paginationObj = {
    limit:5,
    page:1,
    total:0
}

const Order = () => {

    const [orders,setOrders] = useState<ordersList>([])
    const [paginatioObj,setPaginationObj] = useState<paginateObj>(initialPaginationObj)
    const [searchObj,setSearchObj] = useState<searchObj>(initialSearch)
    const [load,setLoad] = useState(false)

    useEffect(()=>{
        const fetchOrder = async () => {
            setLoad(true)
            const result = await getAllOrder(searchObj,paginatioObj)
            setPaginationObj(result.pagination)
            setOrders(result.data)
            setLoad(false)
        }
        fetchOrder()
    },[])


    const handlePageChange = async (curr:number) => {
        setLoad(true)
        const updatedPg = { ...paginatioObj, page: curr + 1 };
        const result = await getAllOrder(searchObj,updatedPg)
        // console.log(result)
        setPaginationObj(result.pagination)
        setOrders(result.data)
        setLoad(false)
    }

    // console.log(paginatioObj)

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
                <OrderFilter 
                    searchObj={searchObj}
                    setSearchObj={setSearchObj}
                    paginatioObj={paginatioObj}
                    setPagination={setPaginationObj}
                    setOrder={setOrders}
                    setLoad={setLoad}
                />
                {load ?  <Spinner /> : <OrderTable orderList={orders} />}
                {/* <Pagination
                    paginationObj={paginatioObj}
                    handlePageChange={handlePageChange}
                /> */}
            </div>
        </div>  
    )

}

export default Order


