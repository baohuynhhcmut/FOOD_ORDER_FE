import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

type Props = {
    id:string;
}

const ButtonEdit = ({id}:Props) => {
    
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate(`/dashboard/overview/${id}`)} className="bg-orange-500 w-full">Quản lý</Button>
    )
}

export default ButtonEdit

