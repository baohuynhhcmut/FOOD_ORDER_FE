import { DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";


type Props = {
    onChange: (sortOption:string) => void;
    sortOption:string;
}


const SORT_OPTION = [
    {
        name: 'Best match',
        value: 'lastUpdate'
    },
    {
        name: 'Delivery price',
        value: 'deliveryPrice'
    },
    {
        name: 'Estimated delivery time',
        value: 'estimatedDeliveryTime'
    }
]

const SortDropDown = ({onChange,sortOption} : Props) => {

    const selectedOption = SORT_OPTION.find((item) => item.value === sortOption);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer" >
                <Button variant={'outline'}>Sorted By : {selectedOption ? selectedOption.name : 'Best match'}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                {SORT_OPTION.map((item,index) => (
                    <DropdownMenuItem key={index} onSelect={() => onChange(item.value)} className="hover:bg-slate-200" >
                     {item.name}
                 </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SortDropDown;
