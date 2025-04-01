import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { getUserVoucher } from "@/api/Voucher"
import { setUserVoucher } from "@/store/slice/UserVoucher"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
    product:any
}

const ApplyVoucher = ({product}:Props) => {

    
    const voucherUser = useSelector((state:RootState) => state.userVoucher.voucherList)
    const user = useSelector((state:RootState) => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAPI = async () =>{
            if(user && voucherUser.length == 0){
                const result = await getUserVoucher(user._id)
                if(result.code == 200 && result.data > 0){
                    dispatch(setUserVoucher({data:result.data}))
                }
            }
        }
        fetchAPI()
    },[])

    console.log(product)
    // console.log(voucherUser)

    return (
       <>
        <h2 className="font-bold text-base">Bạn có một số mã giảm giá có thể áp dụng</h2>
        <div className="flex gap-x-2 mt-5 items-center justify-between ">
            <div className="flex items-center gap-x-2 p-2">
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf0X18-ccgWh0nFxo6hWLXU8W_71sidxAiA&s"} className="w-10 h-10 object-cover" />
            </div>
            <div className="flex flex-col flex-1">
                <span>Mã giảm giá thân thiện</span>
                <span className="text-xs text-gray-500">Giảm 15% sản phẩm</span>
                <span className="text-xs text-gray-500">Áp dụng cho  
                    <span className="font-bold text-black text-wrap max-w-10"> Cánh gà,Cánh gà,Cánh gà,Cánh gà,Cánh gà,Cánh gà,Cánh gà, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi perferendis magni laborum possimus, obcaecati quam tempore commodi ut voluptatem recusandae tempora eos omnis nam vero in sunt tenetur. Deserunt, quibusdam.</span>
                </span>
            </div>
            <Button className="bg-green-500 w-20">Áp dụng</Button>
        </div>
       </>
    )
}

export default ApplyVoucher