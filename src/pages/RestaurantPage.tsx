import { useCreateRestaurant, useGetRestaurant, useUpdateMyRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/form/Restaurant Form/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetOrders } from "@/api/OrderApi";
import OrderCardItem from "@/components/OrderCardItem";


const RestaurantPage = () => {

    const { createRestaurant,isLoading:isCreateLoading } = useCreateRestaurant()

    const { restaurant,isLoading:isGetLoading } = useGetRestaurant()
    
    // const { updateRestaurant,isLoading:isUpdateLoading} = useUpdateMyRestaurant()

    // const { data:orders,isLoading:orderLoading } = useGetOrders()

    if(isGetLoading){
        return(
            <>
                <h2 className="text-2xl text-orange-500">Loading data...</h2>
            </>
        )
    }

    const isEditting = !!restaurant

    return (
      // <Tabs defaultValue="restaurant">
      //     <TabsList>
      //       <TabsTrigger value="orders">Order</TabsTrigger>
      //       <TabsTrigger value="restaurant">Manage restaurant</TabsTrigger>
      //     </TabsList>
      //     <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg lg:px-10">
      //         <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
      //         {orders?.map((order) => (
      //           <OrderCardItem  order={order}/>
      //         ))}
      //     </TabsContent>

      //     <TabsContent value="restaurant">
      //       <ManageRestaurantForm
      //         restaurant={restaurant}
      //         onSave={isEditting  ? updateRestaurant :  createRestaurant}
      //         isLoading={isCreateLoading || isUpdateLoading}
      //       />
      //     </TabsContent>
      // </Tabs>

            <ManageRestaurantForm
              restaurant={restaurant}
              onSave={createRestaurant}
              isLoading={isCreateLoading}
            />
    );
}

export default RestaurantPage;
