import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci";

type searchObjMenu = {
  searchText: string;
  sort:string[];
  genre: string [];
}

type Props = {
  placeHolder?:string;
  onSearch : () => void;
  searchObj: any,
  setSearchObj:any
}

const FoodSearchBar = ({placeHolder="Tìm kiếm đồ ăn",onSearch,searchObj,setSearchObj}:Props) => {
  
  const handleEnter = async (e:any) => {
    if (e.key === 'Enter') {
        onSearch()
    }
  }

  const handleSearchText = (e:any) => {
    setSearchObj((prev:any) => {
      return {...prev,searchText:e.target.value}
    })
  }

  return (
    <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-x-2 items-center font-bold text-2xl">
          <CiSearch />
          <h2 className=" text-orange-500">Tìm kiếm</h2>
        </div>
        <Input 
          placeholder={placeHolder} 
          className="rounded-md p-3 ring-0 focus:ring-0" 
          value={searchObj.searchText}
          onChange={(e) => handleSearchText(e)}
          onKeyDown={handleEnter}
        />
    </div>
  )
}

export default FoodSearchBar