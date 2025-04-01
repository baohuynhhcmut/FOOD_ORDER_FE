import { useLocation } from "react-router-dom";
import { UseDispatch } from "react-redux";
import { setMenu } from "@/store/slice/MenuSlice";


export const getMenu = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    console.log(query.get('abc'))
}
