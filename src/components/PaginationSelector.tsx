import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onPageChange: (page:number) => void;

}

const PaginationSelector = ({page,pages,onPageChange} : Props) => {

    const pageNumber = []
    for(let i = 1; i<= pages;i++){
        pageNumber.push(i)
    }

    return (
        <Pagination>
            <PaginationContent>
                {page !== 1 && (
                     <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onPageChange(page-1)} />
                    </PaginationItem>
                )}
               
                {pageNumber.map((item) => (
                    <PaginationItem>
                        <PaginationLink href="#" onClick={() => onPageChange(item)} isActive={page === item} >{item}</PaginationLink>
                    </PaginationItem>
                ))}

                {page !== pages && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page+1)} />
                    </PaginationItem>
                )}
               

            </PaginationContent>
        </Pagination>
    );
}

export default PaginationSelector;
