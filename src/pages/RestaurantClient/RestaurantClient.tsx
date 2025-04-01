import { useDispatch, useSelector } from "react-redux"
import RestaurantFilter from "./RestaurantFilter"
import RestaurantGrid from "./RestaurantGrid"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { getResCity, getRestaurant } from "@/api/RestaurantApi"
import { setRestaurants } from "@/store/slice/RestaurantClientSlice"
import Spinner from "@/components/Spinner"
import { paginationObj } from "@/type"
import SelectPageLimit from "@/components/ToolbarDashboard/SelectPageLimit"
import Pagination from "@/components/Pagination"


export const sortOptionsRes = [
    ['createdAt', '-1', 'Ngày tạo mới nhất'],
    ['createdAt', '1', 'Ngày tạo lâu nhất'],
    ['updatedAt', '-1', 'Ngày cập nhật mới nhất'],
    ['updatedAt', '1', 'Ngày cập nhật lâu nhất'],
    ['estimatedDeliveryTime', '-1', 'Thời gian vận chuyển lâu'],
    ['estimatedDeliveryTime', '1', 'Thời gian vận chuyển ngắn'],
    ['restaurantName', '-1', 'Tên giảm dần'],
    ['restaurantName', '1', 'Tên tăng dần'],
    ['deliveryPrice', '-1', 'Giá ship cao'],
    ['deliveryPrice', '1', 'Giá ship thấp']
];


const paginationInit :paginationObj = {
    page:1,
    limit:4,
    total:0,
}

export type searchRestauntType = {
    searchText:string;
    sort: string[],
    city: string
}

const searchInit:searchRestauntType = {
    searchText:'',
    sort:sortOptionsRes[0],
    city:''
}

const RestaurantClient = () => {

    const restaurant = useSelector((state:RootState) => state.restaurantClient.restaurants)
    const dispatch = useDispatch()
    const [load,setLoad] = useState(false)

    const [pgObj,setPgObj] = useState<paginationObj>(paginationInit)
    const [searchObj,setSearchObj] = useState<searchRestauntType>(searchInit)

    const [city,setCity] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setLoad(true)
            const result = await getRestaurant(searchObj,pgObj)
            // console.log(result)
            dispatch(setRestaurants({data:result.data}))
            setPgObj(result.pagination)
            setLoad(false)
        }
        const getCity = async() => {
            const result = await getResCity()
            const updatedData = result.map((item:any) => item.name)
            setCity(updatedData)
        }
        fetchAPI()
        getCity()
    },[])

    // console.log(restaurant)
    const setValue =  async (value:string) => {
        setLoad(true)
        const updated = {...pgObj,page:1,limit:value == 'all' ? pgObj.total : parseInt(value)}
        console.log(updated)
        const result = await getRestaurant(searchObj,updated)
        setPgObj(result.pagination)
        dispatch(setRestaurants({data:result.data}))
        setLoad(false)
    }


    const handlePageChange = async (currPage:number) => {
        setLoad(true)
        const updated = {...pgObj,page:currPage+1}
        console.log(updated)
        const result = await getRestaurant(searchObj,updated)
        setPgObj(result.pagination)
        dispatch(setRestaurants({data:result.data}))
        setLoad(false)
    }   


    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
                <div>
                    <RestaurantFilter 
                        load={load}
                        setLoad={setLoad}
                        paginationOb={pgObj}
                        setPagination={setPgObj}
                        searchObj={searchObj}
                        setSearchObj={setSearchObj}
                    />
                </div>
                <div className="md:col-span-3 flex flex-col gap-y-5">
                    <div className="w-full flex justify-end p-10 md:p-0">
                        <SelectPageLimit 
                            pagintionObj={pgObj}
                            setValue={setValue}
                        />
                    </div>
                   {load ? <Spinner /> : <RestaurantGrid restaurants={restaurant} />}
                    <Pagination 
                        paginationObj={pgObj}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default RestaurantClient