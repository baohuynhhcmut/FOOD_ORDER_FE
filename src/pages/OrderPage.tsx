import { useGetOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";



const OrderPage = () => {

    const {  data,isLoading } =  useGetOrders()
    
    if(isLoading){
        return(
            <>
                <h2 className="text-2xl text-orange-500">Loading data...</h2>
            </>
        )
    }

    if(!data || data.length == 0){
        return(
            <>
                <h2 className="text-2xl text-orange-500">No data found ...</h2>
            </>
        )
    }

    console.log(data)
    return (
        <div className="space-y-10 lg:px-10">
            {data.map((item) => (
                <>
                     <OrderStatusHeader  order={item}/>
                     <div className="grid md:grid-cols-2 gap-10">
                        <OrderStatusDetail order={item} />
                        <AspectRatio ratio={16/5}>
                            <img src={item.restaurant.imageUrl} className="w-full h-full object-cover rounded-md" />
                        </AspectRatio>
                     </div>
                </>
            ))}
        </div>
    );
}

export default OrderPage;
