import {
  removeMultiRestaurant,
  searchRestaurant,
  useGetRestaurant,
} from "@/api/RestaurantApi";
import RestaurantNotFound from "@/components/RestaurantNotFound";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { setRestaurant } from "@/store/slice/RestaurantSlice";
import { MdOutlineClear } from "react-icons/md";
import { ComboboxCity } from "@/components/ComboboxCity";
import Calender from "@/components/Calender";
import { DateRange } from "react-day-picker";
import TableRestaurant from "@/components/Table";
import Card from "./Card";
import Table from "./Table";

export type query = {
  restaurantName: string;
  city: string;
  date: DateRange | null;
};

const RestaurantDefault = () => {
  const { isLoading } = useGetRestaurant();
  const restaurant = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );
  const navigate = useNavigate();
  const [selectedRes, setSelectedRes] = useState<string[]>([]);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<query>({
    restaurantName: "",
    city: "",
    date: null,
  });

  const [resultResFind, setResultResFind] = useState({
    active: false,
    result: 0,
    display: false,
  });

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (!restaurant.length) {
    if (!resultResFind.active) {
      const back = () => {
        navigate("/my-restaurant/create");
      };
      return (
        <>
          <RestaurantNotFound back={back} />
        </>
      );
    }
  }

  const handleDeleteAll = async () => {
    const dataResSelected = selectedRes.join(",");
    console.log(dataResSelected);
    const result = await removeMultiRestaurant(dataResSelected);
    dispatch(setRestaurant({ restaurant: result.data }));
    setSelectedRes([]);
  };

  const selectAll = () => {
    const selectedList = restaurant.map((item) => item._id);
    setSelectedRes(selectedList);
  };

  const handleSearch = async () => {
    const result = await searchRestaurant(searchText);
    dispatch(setRestaurant({ restaurant: result.data }));
    setResultResFind({
      active: true,
      result: result.data.length,
      display: true,
    });
  };

  const clearSearch = async () => {
    const updatedData: query = {
      ...searchText,
      restaurantName: "",
    };
    setSearchText(updatedData);

    const result = await searchRestaurant(updatedData);
    dispatch(setRestaurant({ restaurant: result.data }));
    setResultResFind({
      active: false,
      result: 0,
      display: false,
    });
  };

  const handleSelectCity = async (data: string) => {
    const updatedData: query = {
      ...searchText,
      city: data == "Mặc định" ? "" : data,
    };

    console.log(updatedData);

    setSearchText(updatedData);
    const result = await searchRestaurant(updatedData);
    dispatch(setRestaurant({ restaurant: result.data }));
    if (!updatedData.city) {
      setResultResFind({
        active: false,
        result: result.data.length,
        display: false,
      });
    } else {
      setResultResFind({
        active: true,
        result: result.data.length,
        display: false,
      });
    }
  };

  const handleSearchText = (e: any) => {
    const value = e.target.value;
    setSearchText((prev) => ({ ...prev, restaurantName: value }));
  };

  const handleDate = async (date: DateRange) => {
    const updatedData: query = { ...searchText, date };
    setSearchText(updatedData);
    const result = await searchRestaurant(updatedData);
    dispatch(setRestaurant({ restaurant: result.data }));
  };

  const clearDate = async () => {
    const updateData: query = { ...searchText, date: null };
    setSearchText(updateData);
    const result = await searchRestaurant(updateData);
    dispatch(setRestaurant({ restaurant: result.data }));
  };

  
  return (
    <>
      <div className="max-w-7xl md:mx-auto">
        <Tabs defaultValue="card" className="w-full">
          <TabsList>
            <TabsTrigger value="table">Xem dạng bảng</TabsTrigger>
            <TabsTrigger value="card">Xem dạng thẻ</TabsTrigger>
          </TabsList>

          <div className="w-full md:max-w-7xl md:mx-auto flex items-center justify-between  my-2 flex-col md:flex-row gap-y-5 md:gap-x-10 p-10  md:p-2">

            <div className="flex flex-col gap-y-2 w-full">
              <div className="relative border-b-2 border-black flex">
                <Input
                  value={searchText.restaurantName}
                  onChange={(e) => handleSearchText(e)}
                  placeholder="Tên nhà hàng bạn tìm"
                  className="px-10 w-full h-[40px]  border-none rounded-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:border-1"
                />
                <CiSearch className="text-3xl font-bold absolute top-1" />
                <Button onClick={handleSearch}>Tìm kiếm</Button>
              </div>
              {resultResFind.active && resultResFind.display && (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">
                    Có {resultResFind.result} kết quả tìm kiếm
                  </span>
                  <span
                    onClick={clearSearch}
                    className="text-xl font-bold cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
                  >
                    <MdOutlineClear />
                  </span>
                </div>
              )}
            </div>

            <ComboboxCity onSave={handleSelectCity} />

            <div className="flex gap-x-2 items-center justify-center my-2 w-full">
              <Calender onSave={handleDate} />
              {searchText.date && (
                <span
                  onClick={clearDate}
                  className="text-xl font-bold cursor-pointer rounded-full hover:bg-orange-500 hover:text-white"
                >
                  <MdOutlineClear />
                </span>
              )}
            </div>

            <div className="flex items-center gap-x-2 justify-center flex-col gap-y-2 w-full">
              <Button
                onClick={() => navigate("/my-restaurant/create")}
                className="bg-green-500 w-full"
              >
                Thêm nhà hàng
              </Button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex items-center gap-x-10 justify-between md:p-0 p-10 md:flex-row flex-col md:gap-0 gap-y-10">
            <Button onClick={selectAll} variant={"outline"}>
              Chọn tất cả
            </Button>
            {selectedRes.length > 0 && (
              <>
                <div className="flex items-center gap-x-2">
                  <Button onClick={handleDeleteAll} className="bg-red-500">
                    Xóa {selectedRes.length} nhà hàng
                  </Button>
                  <Button onClick={() => setSelectedRes([])}>
                    Bỏ chọn tất cả
                  </Button>
                </div>
              </>
            )}
          </div>

          <TabsContent value="table">
              {/* <TableRestaurant restaurant={restaurant} /> */}
              <Table 
                restaurant={restaurant}
                selectedRes={selectedRes}
                setSelectedRes={setSelectedRes}
              />
          </TabsContent>

          <TabsContent value="card">
              <Card 
                  restaurant={restaurant} 
                  resultResFind={resultResFind} 
                  clearSearch={clearSearch}
                  selectedRes={selectedRes}
                  setSelectedRes={setSelectedRes}
              />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default RestaurantDefault;
