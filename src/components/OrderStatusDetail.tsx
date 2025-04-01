import { Order } from "@/type";
import { Separator } from "./ui/separator";


type Props = {
    order: Order
}
const OrderStatusDetail = ({order} : Props) => {
    return (
        <div className="space-ỵ-5">
            <div className="flex flex-col">
                <span className="font-bold">Delivery to:</span>
                <span>{order.user.name}</span>
                <span>{order.user.addressLine1}, {order.user.city }</span>
            </div>
            <div className="flex flex-col">
            <span className="text-xl font-bold">Your order</span>
                <ul>
                    {order.cartItem.map((item) => (
                        <li>
                            {item.name} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <Separator />
            <div className="flex flex-col">
                <span className="text-xl font-bold">Total</span>
                <span className="">{order.totalAmout}</span>    
            </div>
        </div>
    );
}

export default OrderStatusDetail;
