import { Button } from "@/components/ui/button"


const PaymentSuccess = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-y-10">
        <img className="h-[200px] w-[200px]" src={'https://static.vecteezy.com/system/resources/previews/034/211/463/non_2x/cartoon-chicken-with-thumb-up-chicken-logo-cartoon-character-a-funny-cartoon-rooster-chicken-giving-a-thumbs-up-vector.jpg'}/>
        <h2 className="font-bold text-3xl text-orange-500">Chúc mừng bạn đã thanh toán thành công</h2>
        <div className="flex items-center gap-x-10">
            <Button className="bg-orange-500 p-3">Mua món khác</Button>
            <Button className="bg-blue-500 p-3">Xem đơn hàng</Button>
        </div>
    </div>
  )
}

export default PaymentSuccess