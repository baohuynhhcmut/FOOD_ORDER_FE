import Spinner from "@/components/Spinner"
import { loadUser } from "@/store/slice/AuthSlice"
import { RootState } from "@/store/store"
import { getToken } from "@/utils/token"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface Props {
    children: React.ReactNode
}

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

const PERMISSON_WITHOUT_LOGIN = [
    "/"
]

const ProtectedRoute = ({children} : Props ) => {

    const user = useSelector((state:RootState) => state.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const CheckAuth = async () => {
            const token = getToken()

            if(!token){
                navigate("/")
                toast.warning("Bạn cần đăng nhập để truy cập trang này",{
                    duration:4000,
                    action: {
                        label: "Đóng",
                        onClick: () => toast.dismiss()
                    }
                })
            }  
            try {
                const respone = await fetch(`${BASE_API_URL}/api/my/user/info`,{
                    method:"GET",
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                const {data} = await respone.json()
                dispatch(loadUser({user:data}))
            } catch (error) {
                console.log(error)
            } 
        }
        CheckAuth()
    }, [])  
    


    if(!user){
        return(
            <>
                <Spinner />
            </>
        )
    }
    

    return (
        <>
            {children}
        </>
    )
}
export default ProtectedRoute
