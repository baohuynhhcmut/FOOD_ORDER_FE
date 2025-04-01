import Spinner from "@/components/Spinner"
import { sortObject } from "@/utils/sort"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const PaymentCallBack = () => {

    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const checkStatus = () => {
            const  queryParams = new URLSearchParams(location.search) ;
            const resCode = queryParams.get('vnp_ResponseCode')

            if(resCode == '00'){
                navigate('/payment/success')
                toast.success('Đơn hàng đã thanh toán thành công')
            } else{
                navigate('/payment/fail')
            }
        }    
        checkStatus()  
    },[])

    return (
        <Spinner />
    )
}

export default PaymentCallBack