import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisinesFilter from "@/components/CuisinesFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { searchForm } from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import SearchResultCard from "@/components/SearchResultCard";
import SortDropDown from "@/components/SortDropDown";
import { SearchState } from "@/type";
import { useState } from "react";
import { useParams } from "react-router-dom";



const SearchPage = () => {

    const {city} = useParams()

    const [searchState,setSearchState] = useState<SearchState>(
        {
            searchQuery:"",
            page:1,
            cuisines: [],
            sortOption: 'Best match'
        }
    )

    const [isExpanded,setIsPanded] = useState<boolean>(false)

    const onExpandedClick = () => {
        setIsPanded((prev) => {
            return !prev
        })
    }


    const setSearchQuery = (searchFormData:searchForm) => {
        setSearchState((prev) => ( {
            ...prev,
            searchQuery: searchFormData.searchQuery
        }))
    }

    const resetSearch = () => {
        setSearchState((prev) => ( {
            ...prev,
            searchQuery: ''
        }))
    }

    const setPageChange = (page:number) => {
        setSearchState((prev) => ( {
            ...prev,
            page:page
        }))
    }

    const selectedCuisines = (cuisines: string[]) => {
        setSearchState((prev) => ( {
            ...prev,
            page:1,
            cuisines
        }))
    }

    const handleSortOption = (sortOption:string) => {
        setSearchState((prev) => ( {
            ...prev,
            sortOption,
            page:1
        }))
    }


    const { data : result, isLoading , isError } = useSearchRestaurant(searchState,city as string)


    if(isLoading){
        return(
            <>
                <h2 className="text-orange-500 text-center h-full text-xl">Loading data,please wait ...</h2>
            </>
        )
    }

    if(isError){
        return(
            <>
                <h2 className="text-orange-500 text-center h-full text-xl">No result matching</h2>
            </>
        )
    }
    


    return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div >    
            <CuisinesFilter selectedCuisines={searchState.cuisines} onChange={selectedCuisines}  isExpanded={isExpanded} onExpandedClick={onExpandedClick} />
        </div>


        <div className="flex flex-col gap-5 ">
          <SearchBar
            searchQuery={searchState.searchQuery}
            placeHolder={searchState.searchQuery}
            onReset={resetSearch}
            onSubmit={setSearchQuery}
          />

          <div className="flex gap-3 lg:mx-6 flex-col  justify-between lg:flex-row lg:items-center">
            <SearchResult
                total={result?.pagination.total || 0}
                city={city as string}
            />
            <SortDropDown onChange={handleSortOption} sortOption={searchState.sortOption} />
          </div>

          {result?.data.map((item) => {
            return <SearchResultCard restaurant={item} />;
          })}

          <PaginationSelector
            page={result?.pagination.page || 1}
            pages={result?.pagination.pages || 1}
            onPageChange={setPageChange}
          />
        </div>
      </div>
    );
}

export default SearchPage;
