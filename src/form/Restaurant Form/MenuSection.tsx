import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";


const MenuSection = () => {

    const { control } = useFormContext()
    
    const { fields, append, remove } = useFieldArray({
        control,
        name:'menuItem'
    })


    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold"> Menu </h2>
                <FormDescription>Create your menu give it name and price</FormDescription>
            </div>
            
            <FormField 
                control={control}
                name="menuItem"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((_,index)=> (
                            <MenuItemInput fields={fields} index={index} removeMenuItem={() => remove(index)}  />
                        ))}
                    </FormItem>
                )}
            />
            <Button onClick={() => append({name:'',price:0,imageMenu:""})} type="button">
                Thêm sản phẩm
            </Button>
        </div>
    );
}

export default MenuSection;
