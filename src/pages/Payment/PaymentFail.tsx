import { Button } from "@/components/ui/button"

const PaymentFail = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-y-5">
        <img className="h-[200px] w-[200px]" src={'https://cdn-icons-png.flaticon.com/512/7326/7326025.png'}/>
        <h2 className="font-bold text-3xl text-orange-500">Có lỗi xảy ra</h2>
        <span className="font-bold text-xs text-gray-500">Đơn hàng của bạn đã thanh toán không thành công</span>
        <div className="flex items-center gap-x-10">
            <Button className="bg-orange-500 p-3">Mua món khác</Button>
            <Button className="bg-blue-500 p-3">Xem nhà hàng</Button>
        </div>
    </div>
  )
}
export default PaymentFail