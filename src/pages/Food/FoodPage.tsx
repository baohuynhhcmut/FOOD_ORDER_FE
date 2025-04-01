import { searchQuery } from "@/api/MenuApi";
import { setMenu } from "@/store/slice/MenuSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FoodGrid from "./FoodGrid";
import FoodFilter from "./FoodFilter";
import { paginationObj } from "@/type";
import SelectPageLimit from "@/components/ToolbarDashboard/SelectPageLimit";
import Pagination from "@/components/Pagination";
import { sortOptions } from "../MenuDashboard";
import Spinner from "@/components/Spinner";

export const checkBoxValue = ["Buger","Cơm gà","Mỳ ý","Bánh xèo","Gà rán","Hủ tiếu","Cơm sườn","Khác"]

type searchObjMenu = {
    searchText: string;
    sort:string[];
    genre: string [];
}

const initalValueSearchObj:searchObjMenu = {
    searchText:'',
    sort: sortOptions[0],
    genre:checkBoxValue,
}

const initPaginationObj:paginationObj = {
    page:1,
    limit:4,
    total:0 
}


const FoodPage = () => {
    
    const menuItems = useSelector((state:RootState) => state.menu.menuItems)
    const dispatch = useDispatch()

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searchTextQuery = query.get('food') as string

    const [paginateObj,setPaginateOjb] = useState<paginationObj>(initPaginationObj)

    const [searchObj,setSearchObj] = useState<searchObjMenu>({
        ...initalValueSearchObj,
        searchText : searchTextQuery ? searchTextQuery : ''
    })

    const [load,setLoad] = useState(false)

    useEffect(()=>{
        const fetchMenuItem = async () => {
            setLoad(true)
            const result = await searchQuery(searchObj,paginateObj)
            setPaginateOjb(result.pagination)
            dispatch(setMenu({menuItems:result.data}))
            setLoad(false)
        }
        fetchMenuItem()
    },[])


    const handleSelectedPageChange = async (value:string)  => { 
        setLoad(true)
        let tempVal = value == 'all' ? paginateObj.total : parseInt(value)
        const updatedPg = {...paginateObj,page:1,limit:tempVal}
        const result = await searchQuery(searchObj,updatedPg)
        setPaginateOjb(result.pagination)
        dispatch(setMenu({menuItems:result.data}))
        setLoad(false)
    }
    
    const handlePageChange =  async (currPage:number) => {
        setLoad(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smooth scrolling
        });
        const pageTemp = currPage+1 
        const updatePg = {...paginateObj,page:pageTemp}
        const result = await searchQuery(searchObj,updatePg)
        setPaginateOjb(result.pagination)
        dispatch(setMenu({menuItems:result.data}))
        setLoad(false)
    }



    return (
        <div className="max-w-7xl mx-auto">
            
            <div className="grid md:grid-cols-4 gap-2">

                <div className="">
                    <FoodFilter 
                        paginationObj={paginateObj}
                        setPaginationObj={setPaginateOjb}
                        searchObj={searchObj}
                        setSearchObj={setSearchObj}
                        setLoad={setLoad}
                    />
                </div>
                
                <div className="md:col-span-3 gap-y-6 flex flex-col">
                        <div className="flex justify-end">
                            <SelectPageLimit 
                                pagintionObj={paginateObj}
                                setValue={handleSelectedPageChange}
                            />
                        </div>

                    {load ? <Spinner /> :  <FoodGrid  
                        menuItem={menuItems} 
                    />}

                    <div className="flex flex-wrap flex-col w-full  gap-y-10">
                       <div className="w-full flex justify-center">
                            <Pagination
                                handlePageChange={handlePageChange}
                                paginationObj={paginateObj}
                            />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodPage