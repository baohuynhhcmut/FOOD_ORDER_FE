import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Voucher } from "./RestaurantDetail"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addNewVoucher, UserVoucher } from "@/store/slice/UserVoucher";
import { userAddVoucher } from "@/api/Voucher";
import { toast } from "sonner";

type Props = {
  voucher : Voucher;
  userId: string;
}

const checkExit = (userVoucher:UserVoucher[],voucherCurr:Voucher) => {
  return userVoucher.find((item) => item.voucherId == voucherCurr._id) ? true : false
}

const VoucherSection = ({voucher,userId}:Props) => {

    const [search,setSearch] = useState('')
    const userVoucher = useSelector((state:RootState) => state.userVoucher.voucherList)
    const dispatch = useDispatch()
    console.log(userVoucher)

    const handleGetVoucher = async () => {
      let data 
      if(voucher.type == 'FREE'){
        data = {
          userId:userId,
          voucherId:voucher._id,
          code:voucher.code,
          type:voucher.type
        }
      }
      else{
        data = {
          userId:userId,
          voucherId:voucher._id,
          code:search,
          type:voucher.type
        }
      }
      const result = await userAddVoucher(data)
      if(result.code == 200){
        toast.success('Thêm voucher thành công')
        dispatch(addNewVoucher({data:result.data}))
      }
      else{
        toast.error('Mã code bạn nhập không đúng')
      }
    }
    
    return (
      <div className="flex items-start gap-x-10 pt-10 border-t border-b-orange-300">
          <div className="p-3 border border-gray-300 rounded-md">
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAf0X18-ccgWh0nFxo6hWLXU8W_71sidxAiA&s"} className="w-20 h-20 object-cover"/>
          </div>
          <div className="flex flex-col gap-y-2">
              <p className="font-bold">{voucher.name} - <span className="bg-red-500 rounded-md text-xm text-white p-1">{voucher.code_name}</span></p>
              <p className="text-gray-500 text-xs">{voucher.description}</p>
              <p className="text-gray-500 text-xs">Giảm {voucher.discount}% cho các sản phẩm</p>
              {checkExit(userVoucher,voucher) ? (
                <>
                  <Button variant={"outline"} className="w-52">Đã có trong voucher của bạn</Button>
                </>
              ): (
                <>
                    {voucher.type == 'FREE' ? (
                      <Button className="bg-green-500 w-40" onClick={handleGetVoucher}>Miễn phí</Button>
                    ):(
                      <div className="flex items-center gap-x-5">
                        <Input value={search} 
                             placeholder="Hãy nhập mã"
                            onChange={(e) => setSearch(e.target.value)}   
                          />
                        <Button onClick={handleGetVoucher}>Gửi</Button>
                    </div>
                    )}
                </>
              )}
          </div>
      </div>
    )
}

export default VoucherSection