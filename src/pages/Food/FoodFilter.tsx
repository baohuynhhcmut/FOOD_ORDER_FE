import { searchQuery } from "@/api/MenuApi"
import FoodCategory from "@/components/FoodCategory"
import FoodSearchBar from "@/components/FoodSearchBar"
import FoodSort from "@/components/FoodSort"
import Sort from "@/components/ToolbarDashboard/Sort"
import { setMenu } from "@/store/slice/MenuSlice"
import { paginationObj } from "@/type"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { sortOptions } from "../MenuDashboard"
import { IoMdMenu } from "react-icons/io"

const checkBoxValue = ["Buger","Cơm gà","Mỳ ý","Bánh xèo","Gà rán","Hủ tiếu","Cơm sườn","Khác"]

type searchObjMenu = {
  searchText: string;
  sort:string[];
  genre: string [];
}

type Props = {
  paginationObj:paginationObj,
  setPaginationObj:React.Dispatch<React.SetStateAction<paginationObj>>
  searchObj:searchObjMenu,
  setSearchObj:React.Dispatch<React.SetStateAction<searchObjMenu>>
  setLoad:any
}

const FoodFilter = ({paginationObj,setPaginationObj,searchObj,setSearchObj,setLoad}:Props) => {

    const dispatch = useDispatch()
    
    const onSearch = async () => {
      setLoad(true)
      const updatePg = {...paginationObj,page:1}
      const result = await searchQuery(searchObj,updatePg)
      setPaginationObj(result.pagination)
      dispatch(setMenu({menuItems:result.data}))
      setLoad(false)
    }

    const handleSelectSort = async (index:number) => {
      setLoad(true)
      const updatePg = {...paginationObj,page:1}
      const updatedData = {...searchObj,sort:sortOptions[index]}
      setSearchObj(updatedData)
      const result = await searchQuery(updatedData,updatePg)
      setPaginationObj(result.pagination)
      dispatch(setMenu({menuItems:result.data}))
      setLoad(false)
    } 

    const handelValueChange = async (checked:boolean,value:string) => {
        setLoad(true)
        let updated = searchObj 
        if(checked){
          updated = {...updated,genre: [...searchObj.genre,value]}
        }
        else{
          updated = {...updated,genre: searchObj.genre.filter((item) => item!=value)}
        }
        const updatePg = {...paginationObj,page:1}
        setSearchObj(updated)
        const result = await searchQuery(updated,updatePg)
        setPaginationObj(result.pagination)
        dispatch(setMenu({menuItems:result.data}))
        setLoad(false)
    }

    return (
      <div className="flex flex-col gap-y-4 mt-[-25px]  p-10 md:0">
          <FoodSearchBar 
            onSearch={onSearch}
            setSearchObj={setSearchObj}
            searchObj={searchObj}
          />

          <div className="w-full flex flex-col gap-y-5">
            <div className="flex gap-x-2 items-center font-bold text-2xl">
                <IoMdMenu />
                <span className="text-orange-500">Theo</span>
            </div>
            <Sort
                valueDefault={sortOptions}
                onSelectValue={handleSelectSort}
                valueSelected={searchObj.sort}
            />
          </div>

           <FoodCategory 
            onSave={handelValueChange}
            selectedValue={searchObj}
          /> 
      </div>
    )
}

export default FoodFilter