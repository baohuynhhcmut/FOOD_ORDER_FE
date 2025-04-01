import { ORDER_STATUS_CONFIG } from "@/config/order-status-config";
import { Order } from "@/type";
import { Progress } from "./ui/progress";

type Props = {
    order: Order
}

const OrderStatusHeader = ({order} : Props) => {

    const handleTime = () => {
        const createDate = new Date(order.createAt)
        
        createDate.setMinutes(
            createDate.getMinutes() + order.restaurant.estimatedDeliveryTime
        )

        const minute = createDate.getMinutes() < 10 ? `0${createDate.getMinutes()}` : createDate.getMinutes()
        const hours = createDate.getHours()
        return `${hours} : ${minute}`
    }   

    const getOrderStatus = () => {
        const status = ORDER_STATUS_CONFIG.find((item) => item.value === order.status) 
        return status ?? ORDER_STATUS_CONFIG[0];
    }

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span className="">Order Status: {getOrderStatus().label}</span>
                <span className="">Expected by: {handleTime()}</span>
            </h1>
            <Progress className="[&>div]:bg-orange-500" value={getOrderStatus().progessValue} />
        </>
    );
}

export default OrderStatusHeader;
