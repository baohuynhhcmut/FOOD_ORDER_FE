import Collapse from "@/components/CollaspeOrder/Collapse"
import { ordersList } from "@/type"


type Props = {
    orderList:ordersList
}
const OrderTable = ({orderList}:Props) => {
    return (
        <div className="flex flex-col gap-y-5 w-full divide-y divide-gray-400">
            {orderList.map((item) => (
                <Collapse order={item} />
            ))}
        </div>
    )
}

export default OrderTable