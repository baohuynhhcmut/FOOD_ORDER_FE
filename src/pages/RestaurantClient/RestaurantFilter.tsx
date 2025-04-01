import { searchQuery } from "@/api/MenuApi";
import FoodCategory from "@/components/FoodCategory";
import FoodSearchBar from "@/components/FoodSearchBar";
import FoodSort from "@/components/FoodSort";
import { setMenu } from "@/store/slice/MenuSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRestauntType, sortOptionsRes } from "./RestaurantClient";
import { paginationObj } from "@/type";
import { setRestaurants } from "@/store/slice/RestaurantClientSlice";
import { getRestaurant } from "@/api/RestaurantApi";
import Sort from "@/components/ToolbarDashboard/Sort";
import { IoMdMenu } from "react-icons/io";
import { ComboboxCity } from "@/components/ComboboxCity";
import { FaCity } from "react-icons/fa";

type Props = {
  searchObj: searchRestauntType;
  setSearchObj: React.Dispatch<React.SetStateAction<searchRestauntType>>;
  paginationOb: paginationObj;
  setPagination: React.Dispatch<React.SetStateAction<paginationObj>>;
  load: any;
  setLoad: any;
};

const RestaurantFilter = ({
  searchObj,
  setSearchObj,
  paginationOb,
  setPagination,
  load,
  setLoad,
}: Props) => {
  // const [textSearch,setTextSearch] = useState('')
  // const [selectedOption, setSelectedOption] = useState(checkBoxValue[0]);
  // const [selected,setSelected] = useState<string[]>([])
  const dispatch = useDispatch();

  const onSearch = async () => {
    setLoad(true);
    const upPg = { ...paginationOb, page: 1 };
    const result = await getRestaurant(searchObj, upPg);
    setPagination(result.pagination);
    dispatch(setRestaurants({ data: result.data }));
    setLoad(false);
  };

  // const handleSelect = async (value:string) => {
  //   const result = await searchQuery(textSearch,value,selected.join(","))
  //   dispatch(setMenu({menuItems:result.data}))
  // }

  // const handelValueChange = async (value:string) => {
  //   let updatedData = selected
  //   if(updatedData.includes(value)){
  //     updatedData = updatedData.filter((item) => item !== value)
  //   }
  //   else{
  //     updatedData = [...updatedData,value]
  //   }
  //   setSelected(updatedData)
  //   const category = updatedData.join(",")
  //   const result = await searchQuery(textSearch,selectedOption,category)
  //   dispatch(setMenu({menuItems:result.data}))
  // }

  const onSelectValue = async (index: number) => {
    const updatedData = { ...searchObj, sort: sortOptionsRes[index] };
    setSearchObj(updatedData);
    setLoad(true);
    const upPg = { ...paginationOb, page: 1 };
    const result = await getRestaurant(updatedData, upPg);
    setPagination(result.pagination);
    dispatch(setRestaurants({ data: result.data }));
    setLoad(false);
  };

  const onSave = async (data: string) => {
    const updatedData = { ...searchObj, city : data == 'Mặc định' ? '' : data };
    setSearchObj(updatedData);
    setLoad(true);
    const upPg = { ...paginationOb, page: 1 };
    const result = await getRestaurant(updatedData, upPg);
    setPagination(result.pagination);
    dispatch(setRestaurants({ data: result.data }));
    setLoad(false);
  };

  return (
    <div className="flex flex-col gap-y-10  w-full p-10 md:p-0">
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
          valueDefault={sortOptionsRes}
          valueSelected={searchObj.sort}
          onSelectValue={onSelectValue}
        />
      </div>

      <div className="w-full flex flex-col gap-y-5">
        <div className="flex gap-x-2 items-center font-bold text-2xl">
          <FaCity />
          <span className="text-orange-500">Thành phố, tỉnh thành</span>
        </div>
        <ComboboxCity onSave={onSave} />
      </div>
    </div>
  );
};

export default RestaurantFilter;
