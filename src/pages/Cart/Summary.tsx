import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MenuRequest } from "@/type"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"


type Props = {
  product:any;
  cart: MenuRequest[];
}
const total = (product:any,cart:MenuRequest[]) => {
  let result = 0
  if(product){
      result = cart.reduce((accum,curr,index) => {
          return accum + curr.quantity*product[index]?.price
      },0)
  }
  return result
}

const Summary = ({product,cart}:Props) => {

  const [method,setMethod] = useState<string>("VNBANK") 
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center font-bold text-xl">Tổng đơn hàng</CardTitle>
      </CardHeader>

      <CardContent>
         <div className="divide-y divide-gray-400 flex flex-col  gap-y-10 md:gap-y-2">
            {cart.map((item,index) => (
              <div className="flex justify-between items-center px-10 ">
                  <span>{product[index]?.name}</span>
                  <span className="font-bold">{product[index]?.price * item.quantity} Vnđ</span>
              </div>
            ))}
         </div>
          <Separator className="mt-10" />
          <div className="flex justify-between items-center px-10 mt-5">
            <span className="text-xl"></span>
            <span className="font-bold text-xl">{total(product,cart)} Vnđ</span>
          </div>
      </CardContent>
      
      <CardFooter>

        <div className="flex w-full flex-col gap-y-5">
          <Select defaultValue={method} onValueChange={(value) => setMethod(value)}>
            <SelectTrigger className="w-full ring-0 focus:ring-0">
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
          <Button className="w-full bg-orange-500 py-5">
              Thanh toán
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
export default Summary