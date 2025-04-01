import { paginationObj } from '@/type';
import ReactPaginate from 'react-paginate';


type Props = {
  paginationObj: paginationObj
  handlePageChange: (currPage:number) => void;
}

const Pagination = ({ paginationObj,handlePageChange }:Props) => {

    // console.log(paginationObj)
    const handlePageClick = (event:any) => {
      const currPage  = event.selected
      handlePageChange(currPage)
    };
    

    return (
      <>
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={paginationObj.total > paginationObj.limit ? Math.ceil(paginationObj.total/paginationObj.limit) : 1}
          // pageCount={10}
          renderOnZeroPageCount={null}
          containerClassName='flex flex-wrap gap-y-10 text-base items-center justify-center gap-x-10'
          pageClassName= "bg-black text-white rounded-sm hover:cursor-pointer"
          pageLinkClassName="px-4 "
          activeClassName="bg-white  rounded-md border border-gray-900"
          activeLinkClassName="text-black"
          
        />
      </>
    );
}

export default Pagination