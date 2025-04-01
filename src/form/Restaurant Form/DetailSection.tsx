import { getResCity } from "@/api/RestaurantApi";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";


const DetailSection = () => {

    const { control } = useFormContext()
    const [cities,setCities] = useState([])

    useEffect(() => {
        const getCity = async () =>{
            const result = await getResCity()
            setCities(result)
        }
        getCity()
    },[])

    // const city = watch("city")
    
    // console.log(city)
    
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Thông tin</h2>
          <FormDescription>
            Hãy điền thông tin về nhà hàng của bạn
          </FormDescription>
        </div>

        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 w-full">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Thành phố, tỉnh thành</FormLabel>
                <select
                    {...field} 
                    className="w-full bg-white shadow-md p-1 border rounded" 
                >
                    <option value="" disabled>
                    Chọn tỉnh thành
                    </option>
                    {cities.map((item: any, index) => (
                    <option key={index} value={item.name}>
                        {item.name}
                    </option>
                    ))}
                </select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex">
          <FormField
            control={control}
            name="deliveryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá ship</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex">
          <FormField
            control={control}
            name="estimatedDeliveryTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời gian giao hàng trung bình</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
}

export default DetailSection;
