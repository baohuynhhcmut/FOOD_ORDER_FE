import { IoMdMenu } from "react-icons/io";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


type Props = {
    selectedOption:string;
    setSelectedOption:React.Dispatch<React.SetStateAction<string>>;
    onSearch: (value:string) => void;
}

const checkBoxValue:string[] = ["Phù hợp nhất","A-Z","Mới nhất","Đánh giá trung bình"]

const FoodSort = ({selectedOption,setSelectedOption,onSearch}:Props) => {

    const handleChange = (value:string) => {
        setSelectedOption(value);
        onSearch(value)
    };
    
    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex gap-x-2 items-center font-bold text-2xl">
                <IoMdMenu />
                <span className="text-orange-500">Theo</span>
            </div>
            <div className="flex flex-col gap-y-5">
                <RadioGroup value={selectedOption} onValueChange={handleChange} className="gap-y-5">
                    {checkBoxValue.map((item) => (
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={item} id={item} />
                            <Label htmlFor={item}>{item}</Label>
                    </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FoodSort