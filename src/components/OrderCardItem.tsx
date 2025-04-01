import { Order } from "@/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";

type Props = {
    order: Order
}

const OrderCardItem = ({order} : Props) => {

    const getTime = () => {
        const currDate = new Date(order.createAt)

        const hour = currDate.getHours()
        const   mininute = currDate.getMinutes()
        const padMinute = mininute < 10 ? `0${mininute}` : `${mininute}`
        return `${hour} : ${padMinute}`
    }

    return (
        <Card>
            <CardHeader >
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3 items-center">
                <div>
                    Customer Name: 
                    <span className="font-normal ml-2 ">{order.user.name}</span>
                </div>
                <div>
                    Address : 
                    <span className="font-normal ml-2 ">{order.user.addressLine1} , {order.user.city} , {order.user.country}</span>
                </div>
                <div>
                    Time: 
                    <span className="font-normal ml-2 ">{getTime()}</span>
                </div>
                <div>
                    Total cost: 
                    <span className="font-normal ml-2 ">{order.totalAmout}</span>
                </div>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                
            </CardContent>
        </Card>
    );
}

export default OrderCardItem;
