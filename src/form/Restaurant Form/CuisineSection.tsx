import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-option-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";


const CuisineSection = () => {

    const { control } = useFormContext()

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
                <FormField 
                    control={control}
                    name='cuisines'
                    render={({ field }) => (
                        <FormItem>
                            <div className="grid  md:grid-cols-3 lg:grid-cols-6 gap-1">
                                {cuisineList.map((cuisineItem,index) => {
                                    return <CuisineCheckBox field={field} cuisine={cuisineItem} key={index}/>
                                })}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

export default CuisineSection;
