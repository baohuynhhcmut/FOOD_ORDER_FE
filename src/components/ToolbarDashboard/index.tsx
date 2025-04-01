import Filter from "./Filter";
import Searchbar from "./Searchbar";
import SelectPageLimit from "./SelectPageLimit"
import { paginationObj, searchObj } from "@/type";
import Sort from "./Sort";
import Status from "./Status";

type Props = {
    paginationObj:paginationObj,
    searchObj:searchObj,
    handleSelectedPageChange : (value:string) => void;
    valueFilter:string[]
    onValueChange:(text:string) => void;
    onSubmitValue: () => void;
    onChangeFilter: (value:boolean,name:string) => void;
    onSelectValue: (value:number) => void;
    sortValueDefault: string[][];

    valueDefaultStatus :string[];
    onSelectedStatus: (value:string) => void;
}

const ToolBarDashboard = ({paginationObj,handleSelectedPageChange,searchObj,onValueChange,onSubmitValue,valueFilter,onChangeFilter,onSelectValue,sortValueDefault,valueDefaultStatus,onSelectedStatus}:Props) => {
    return (
        <div className="p-3 flex items-center justify-between gap-4 md:flex-row flex-col">
            <Searchbar
                searchObj={searchObj}
                onValueChange={onValueChange}
                onSubmitValue={onSubmitValue}
                placeHoder="Tim kiếm theo tên sản phẩm"
            />
            <Status 
                valueDefaultStatus={valueDefaultStatus}
                onSelectedStatus={onSelectedStatus}
                valueSelectedStatus={searchObj.status}
            />
            <Sort
                valueDefault={sortValueDefault}
                onSelectValue={onSelectValue}
                valueSelected={searchObj.sort}
            />
            <Filter 
                valueDefault={valueFilter}
                onSubmitValue={onChangeFilter}
                valueInclude={searchObj.genre}
            />
            <SelectPageLimit 
                pagintionObj={paginationObj} 
                setValue={handleSelectedPageChange} 
            />
        </div>
    )
}

export default ToolBarDashboard