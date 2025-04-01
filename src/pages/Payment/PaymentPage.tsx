import OrderDetail from "./OrderDetail"
import PaymentMethod from "./PaymentMethod"


const PaymentPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-2">
            <PaymentMethod />
            <OrderDetail />
        </div>
    </div>
  )
}
export default PaymentPage