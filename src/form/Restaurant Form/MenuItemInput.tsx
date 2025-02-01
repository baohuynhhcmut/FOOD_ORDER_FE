import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
    index:Number
    removeMenuItem:() => void;
}

const MenuItemInput = ({index,removeMenuItem}: Props) => {
    
    const { control } = useFormContext()
    
    return (
        <div className="flex gap-2">
            <FormField
                control={control}
                name={`menuItem.${index}.name`}
                render={({field}) => (
                    <>
                        <FormLabel className="flex items-center gap-1">
                            Name
                            <FormMessage />
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                    </>
                )}
            />

                <FormField
                control={control}
                name={`menuItem.${index}.price`}
                render={({field}) => (
                    <>
                        <FormLabel className="flex items-center gap-1">Price <FormMessage /> </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                    </>
                )}
            />

            <Button type="button" onClick={removeMenuItem} className="bg-red-500">
                Remove
            </Button>
        </div>
    );
}

export default MenuItemInput;
