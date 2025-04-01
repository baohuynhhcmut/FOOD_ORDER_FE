import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkBoxValue } from "@/config/menu-category";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

type Props = {
    index:Number
    removeMenuItem:() => void;
    fields:any
}

const MenuItemInput = ({index,removeMenuItem,fields}: Props) => {
    
    const { control,watch } = useFormContext()
    const [imagePreview,setImagePreview] = useState<string|undefined>()
    
    const imageDefault = watch(`menuItem.${index}.imageMenu`)

    const handleFileChange = (e:any) => {
        const file = e.target.files[0]
        setImagePreview(URL.createObjectURL(file))
    }


    const handelRemove = () => {
        if(fields.length <= 1){
            toast.error('Phải tồn tại ít nhất 1 sản phẩm')
        }
        else{
            removeMenuItem()
        }
    }

    return (
        <>
            <div className="flex items-center gap-x-10">
                
                <div className="flex gap-y-2 text-center items-end flex-col justify-center">
                    <FormLabel className="w-full">
                        Ảnh menu
                    </FormLabel>
                    <img className="h-[200px] w-[200px] rounded-md object-cover" src={imagePreview ? imagePreview : imageDefault}/>
                    {/* <input onChange={handleFileChange} type="file" className="hidden" id={`item-${index}`} /> */}
                    <FormField
                        name={`menuItem.${index}.imageMenuFile`}
                        control={control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                    className="bg-white hidden"
                                    type="file"
                                    onChange={(e) => {
                                        field.onChange(e.target.files ? e.target.files[0] : null)
                                        handleFileChange(e)
                                    }}
                                    id={`item-${index}`}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    <div className="flex items-center gap-x-2">
                        <label className="p-2 text-sm bg-orange-500 rounded-md cursor-pointer text-white font-bold" htmlFor={`item-${index}`}>Thay đổi ảnh</label>
                        {/* <Button type="button" className="bg-orange-500" onClick={() => setImagePreview(imageDefault)}>Mặc định</Button> */}
                    </div>                    
                </div>  

                <div className="flex gap-2 items-center">
                    <FormField
                        control={control}
                        name={`menuItem.${index}.name`}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-1">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`menuItem.${index}.price`}
                        render={({field}) => (
                           <FormItem>
                                <FormLabel className="flex items-center gap-1">Price  </FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                           </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`menuItem.${index}.category`}
                        render={({field}) => (
                            <FormItem className="w-[200px] mb-3">
                                <FormLabel>Loại</FormLabel>
                                <select
                                    {...field} 
                                    className="w-full bg-white shadow-md p-1 border rounded" 
                                >
                                    <option value="" disabled>
                                    Chọn loại cho sản phẩm
                                    </option>
                                    {checkBoxValue.map((item: any, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                    ))}
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <div>
                    <Button type="button" onClick={handelRemove} className="bg-red-500">
                        Xóa sản phẩm
                    </Button>
                </div>
            </div>
        </>
    );
}

export default MenuItemInput;
