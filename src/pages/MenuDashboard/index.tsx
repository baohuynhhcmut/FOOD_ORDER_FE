import { useParams } from "react-router-dom"
import Table from "./Table"
import { useEffect, useState } from "react"
import { deleteMultiMenuRestaurant, getMenuByRestarantId } from "@/api/MenuApi"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { removeMenuRestaurant, setMenuRestaurant } from "@/store/slice/MenuRestaurantSlice"
import Pagination from "@/components/Pagination"
import Spinner from "@/components/Spinner"
import ToolBarDashboard from "@/components/ToolbarDashboard"
import { paginationObj, searchObj } from "@/type"
import { checkBoxValue } from "@/config/menu-category"
import { toast } from "sonner"


export const sortOptions = [
  ['createdAt', '-1', 'Ngày tạo mới nhất'],
  ['createdAt', '1', 'Ngày tạo lâu nhất'],
  ['updatedAt', '-1', 'Ngày cập nhật mới nhất'],
  ['updatedAt', '1', 'Ngày cập nhật lâu nhất'],
  ['price', '-1', 'Giá cao nhất'],
  ['price', '1', 'Giá thấp nhất'],
  ['name', '-1', 'Tên giảm dần'],
  ['name', '1', 'Tên tăng dần']
];

const statusMenuSelected =  ['Đang bán','Ngừng bán','Sắp ra mắt',"Tất cả"]

const dataAll = statusMenuSelected.slice(0,3).join(',')

const checkStatus = (status:string) => {
  if(status == statusMenuSelected[3]) {
    return dataAll
  }
  return status
}

const initialValuePagination:paginationObj = {
  page:1,
  limit:5,
  total:0
}

const initalValueSearchObj:searchObj = {
  searchText:'',
  sort: sortOptions[0],
  genre:checkBoxValue,
  status:statusMenuSelected[3]
}


const MenuDashboard = () => {

  const { restaurantId } = useParams() 
  
  const menuRestaurant = useSelector((state:RootState ) => state.menuRestaurant.menuItem)
  const [pagination,setPagination] = useState<paginationObj>(initialValuePagination)
  const [searchObj,setSearchObj] = useState<searchObj>(initalValueSearchObj)

  const [selectedCheckBox,setSelectedCheckBox] = useState<string[]>([])


  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAPI = async () => {
        if(restaurantId){
            setLoading(true)
            const result = await getMenuByRestarantId(restaurantId)
            dispatch(setMenuRestaurant({data:result.data.menu}))
            const paginatioObj = result.data.pagination
            setPagination(paginatioObj)
            setLoading(false)
        }
    }
    fetchAPI()
  },[])

  // console.log(menuRestaurant)


  const handlePagination = async (currPage:number) => {
    const pagetemp = currPage + 1
    if(restaurantId){
      setLoading(true)
      const result = await getMenuByRestarantId(restaurantId,pagetemp.toString(),pagination.limit.toString(),searchObj.searchText,searchObj.genre.join(','),searchObj.sort.join(','),checkStatus(searchObj.status))
      dispatch(setMenuRestaurant({data:result.data.menu}))
      const paginatioObj = result.data.pagination
      setPagination(paginatioObj)
      setLoading(false)
    }
  }

  const handleSelectedPageChange = async (value:string) => {
      let itemPerPage = '5'
      if(value == 'all'){
        if(restaurantId){
          itemPerPage = pagination.total.toString()
        }
      }
      else{
        itemPerPage = value
      }   
      if(restaurantId){
        setLoading(true)
        const result = await getMenuByRestarantId(restaurantId,'1',itemPerPage,searchObj.searchText,searchObj.genre.join(','),searchObj.sort.join(','),checkStatus(searchObj.status))
        dispatch(setMenuRestaurant({data:result.data.menu}))
        const paginatioObj = result.data.pagination
        setPagination(paginatioObj)
        setLoading(false)
      }
    }  

    const handleTextSearch = (value:string) => {
      setSearchObj((prev) => {
        return {...prev,searchText:value}
      })
    }

    const onEnterSearch = async () => {
      if(restaurantId){
        setLoading(true)
        const result = await getMenuByRestarantId(restaurantId,'1',pagination.limit.toString(),searchObj.searchText,searchObj.genre.join(','),searchObj.sort.join(','),checkStatus(searchObj.status))
        dispatch(setMenuRestaurant({data:result.data.menu}))
        const paginatioObj = result.data.pagination
        setPagination(paginatioObj)
        setLoading(false)
      }
    }

    const onChangeFilter = async (checked:boolean,name:string) => {
      const updatedData = searchObj.genre
      let updatedCheck = updatedData
      if(checked){
        updatedCheck = [...updatedData,name]
      }
      else{
        updatedCheck = updatedData.filter((item) => item != name)
      }
      setSearchObj((prev) => {
        return {...prev,genre:updatedCheck}
      })

      if(restaurantId){ 
        setLoading(true)
        const result = await getMenuByRestarantId(restaurantId,'1',pagination.limit.toString(),searchObj.searchText,updatedCheck.join(','),searchObj.sort.join(','),checkStatus(searchObj.status))
        dispatch(setMenuRestaurant({data:result.data.menu}))
        const paginatioObj = result.data.pagination
        setPagination(paginatioObj)
        setLoading(false)
      }
    }

    const handelSelectedSort = async (value:number) => {
        const updatedData = sortOptions[value]
        setSearchObj((prev) => {
          return {...prev,sort:updatedData}
        })

        if(restaurantId){ 
          setLoading(true)
          const result = await getMenuByRestarantId(restaurantId,'1',pagination.limit.toString(),searchObj.searchText,searchObj.genre.join(','),updatedData.join(','),checkStatus(searchObj.status) )
          dispatch(setMenuRestaurant({data:result.data.menu}))
          const paginatioObj = result.data.pagination
          setPagination(paginatioObj)
          setLoading(false)
        }
    }


    const handleSelectedStatus = async (value:string) => {
        let updatedData:any = ''
        if(value != statusMenuSelected[3]){
          updatedData = value
        }
        else{
          updatedData = statusMenuSelected.slice(0,3).join(',')
        }
        setSearchObj((prev) => {
          return {...prev,status:value}
        })
        if(restaurantId){ 
          setLoading(true)
          const result = await getMenuByRestarantId(restaurantId,'1',pagination.limit.toString(),searchObj.searchText,searchObj.genre.join(','),searchObj.sort.join(','),updatedData)
          dispatch(setMenuRestaurant({data:result.data.menu}))
          const paginatioObj = result.data.pagination
          setPagination(paginatioObj)
          setLoading(false)
        }
    }

    const handleCheckAll = (checked:boolean) => {
      if(checked){
        setSelectedCheckBox(menuRestaurant.map((item) => item._id))
      }
      else{
        setSelectedCheckBox([])
      }
    }

    const hanldeCheckbox = (name:string,checked:boolean) => {
      if(checked){
        setSelectedCheckBox((prev) => {
          return  [...prev,name]
        })
      }
      else{
        setSelectedCheckBox((prev) => {
          return  prev.filter((item) => item != name)
        })
      }
    }

    const deletedMulti = async () => {
      const respone = await deleteMultiMenuRestaurant(selectedCheckBox)
      if(respone.code == 200){
        dispatch(removeMenuRestaurant({data:selectedCheckBox}))
        toast.success('Xóa thành công')
      }
      setSelectedCheckBox([])
    }

    return (
      <>
        <div className="flex flex-col gap-y-4 p-3">
              <ToolBarDashboard 
                paginationObj={pagination} 
                searchObj={searchObj}
                handleSelectedPageChange={handleSelectedPageChange} 
                onValueChange={handleTextSearch}
                onSubmitValue={onEnterSearch}
                valueFilter={checkBoxValue}
                onChangeFilter={onChangeFilter}
                sortValueDefault={sortOptions}
                onSelectValue={handelSelectedSort}
                valueDefaultStatus={statusMenuSelected}
                onSelectedStatus={handleSelectedStatus}
              />
              {loading ? <Spinner /> : 
              <Table 
                menuItem={menuRestaurant}
                handleCheckAll={handleCheckAll}
                handleCheckBox={hanldeCheckbox}
                valueInclude={selectedCheckBox}
                handleDeletedAll={deletedMulti}
              />}
              <Pagination paginationObj={pagination} handlePageChange={handlePagination}  />
          </div>
      </>
    )
}

export default MenuDashboard