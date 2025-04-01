import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"


type Props = {
    text?:string;
    buttonText?:string,
    back: () => void;
}

const RestaurantNotFound = ({text="Bạn chưa có nhà hàng nào cả",buttonText="Tạo mới",back}:Props) => {

    return (
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-col space-y-4">
            <img className="w-[250px] rounded-full object-cover" src="https://img.freepik.com/free-vector/cute-chicken-thinking-with-book-cartoon-vector-icon-illustration-animal-education-isolated-flat_138676-11756.jpg" />
            <h2 className="font-bold text-3xl">{text}</h2>
            <Button onClick={back} className="bg-orange-500">{buttonText}</Button>
        </div>
    )
}


export default RestaurantNotFound