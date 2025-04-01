import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "./ui/button"
import { menuItem, MenuRequest, PaymentRequest } from "@/type"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "@/api/OrderApi";

type Props ={
    menuItem: menuItem
    setQuantity: (value:number) => void
    quantity: number
}


const FoodButtonBuy = ({menuItem,setQuantity,quantity}:Props) => {

    const [method,setMethod] = useState<string>("VNBANK") 

    const handelMinus = () => {
        if(quantity > 1){
            setQuantity(quantity - 1)
        }
        else{
            toast.error("Số lượng phải lớn hơn 0")
        }
    }

    const handlePayment = async () => {
        const menuRequest:MenuRequest = {
            item: menuItem._id,
            quantity: quantity,
        }

        const paymentRequest:PaymentRequest = {
            orderList:[menuRequest],
            bankCode: method,
        }
        const result = await createOrder(paymentRequest)
        window.location.href = result.data
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 w-full">Mua</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{menuItem.name}</DialogTitle>
                <img src={menuItem.imageMenu} className="w-full h-[300px] object-cover rounded-md" />
                <DialogDescription>
                    <div className="w-full flex justify-between items-center pt-10 gap-4 flex-col">
                        <div className="flex items-center gap-4">
                            <Button className="bg-orange-500 text-xs" onClick={handelMinus} >
                                Giảm
                            </Button>
                            <span className="border-2 border-black py-2 px-4 rounded-lg text-xl text-black">{quantity}</span>
                            <Button className="bg-orange-500 text-xs" onClick={() => setQuantity(quantity + 1)}>
                                Thêm
                            </Button>
                        </div>
                        <Select defaultValue={method} onValueChange={(value) => setMethod(value)}>
                            <SelectTrigger className="w-ffull font-bold text-black">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Vui lòng chọn phương thức thanh toán</SelectLabel>
                                <SelectItem value="INTCARD">Thanh toán quốc tế(VISA,MASTER CARD)</SelectItem>
                                <SelectItem value="VNBANK">Ngân hàng và thẻ ATM nội địa</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button className="bg-orange-500 w-full" onClick={handlePayment}>Thanh toán</Button>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default FoodButtonBuy