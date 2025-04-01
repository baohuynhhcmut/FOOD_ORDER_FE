
import { Input } from "@/components/ui/input"
// import { searchObj } from "@/type"

type Props = {
    searchObj:any;
    onValueChange:(text:string) => void;
    onSubmitValue: () => void;
    placeHoder:string;
}

const Searchbar = ({searchObj,onValueChange,onSubmitValue,placeHoder}:Props) => {

    const onKeyDownSumit = (e:any) => {
        if (e.key === "Enter"){
            onSubmitValue();
        }
    }

    return (
        <Input 
            type="text" 
            placeholder={placeHoder} 
            value={searchObj.searchText} 
            onKeyDown={(e) => onKeyDownSumit(e)}
            onChange={(event) => onValueChange(event.target.value)}/>
    )
}

export default Searchbar