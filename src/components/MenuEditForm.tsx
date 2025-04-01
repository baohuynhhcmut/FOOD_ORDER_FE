
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { menuItem } from "@/type"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { checkBoxValue } from "@/config/menu-category"
import { statusMenu } from "./TableDashboard/MenuTableDashboard"
import { editMenuRestaurant } from "@/api/MenuApi"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { updateOneMenu } from "@/store/slice/MenuRestaurantSlice"

const MenuSchema = z.object({
    name: z.string({
        required_error:'Tên sản phẩm là bắt buộc',
    }),
    price:z.coerce.number({
        required_error: 'Giá hàng chuyển là bắt buộc',
        invalid_type_error: 'Hãy nhập số'
    }).min(10000),
    imageMenu: z.string(),
    imageMenuFile:z.instanceof(File).optional()
})

export type MenuRestaurant = z.infer<typeof MenuSchema>

type Props = {
    menuItem:menuItem,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuEditForm = ({menuItem,setOpen}:Props) => {

    const form = useForm<MenuRestaurant>({
        resolver: zodResolver(MenuSchema),
        defaultValues: menuItem 
    })  

    useEffect(() => {
        form.reset(menuItem)
    },[])

    const [category,setCategory] = useState(menuItem.category)
    const [status,setStatus] = useState(menuItem.status)
    const [displayImage,setDisplayImage] = useState(menuItem.imageMenu)
    const dispatch = useDispatch()

    const handleFileChange = (e:any) => {
        const file = e.target.files[0]; 
        if (file) {
        const reader = new FileReader(); 

        reader.onloadend = () => {
            setDisplayImage(reader.result); 
        };

        reader.readAsDataURL(file); 
        }
    }

    const onSubmit = async (values:MenuRestaurant) => {
        const form = new FormData()
        
        form.append('name',values.name)
        form.append('price',values.price.toString())

        if(values.imageMenuFile){
            form.append('image',values.imageMenuFile)
        }
        form.append('category',category)
        form.append('status',status)

        const result = await editMenuRestaurant(menuItem._id,form)
        if(result.code == 200){
            toast.success('Cập nhật thành công')
            dispatch(updateOneMenu({data:result.data}))
        }
        setOpen(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                <div className="flex items-end gap-x-2">
                    <img src={displayImage} className="w-40 h-40 object-cover" />
                    <FormField
                        control={form.control}
                        name="imageMenuFile"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input id={menuItem._id} type="file" className="hidden"  onChange={(e) => {
                                field.onChange(e.target.files ? e.target.files[0] : null)
                                handleFileChange(e)
                            }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <label htmlFor={menuItem._id} className="bg-orange-500 p-2 rounded-md cursor-pointer font-bold text-white">Thay ảnh</label>
                </div>
                
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <FormControl>
                        <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Giá sản phẩm</FormLabel>
                        <FormControl>
                        <Input  {...field}  />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex flex-col gap-y-2">
                    <FormLabel>Loại đồ ăn</FormLabel>
                    <Select value={category} onValueChange={(value) => {setCategory(value)}}>
                        <FormControl>
                            <SelectTrigger >
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {checkBoxValue.map((item,_) => (
                                <SelectItem className="hover:bg-gray-100" value={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="flex flex-col gap-y-2">
                    <FormLabel>Tình trạng</FormLabel>
                    <Select value={status} onValueChange={(value) => {setStatus(value)}}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue  />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {statusMenu.map((item,_) => (
                                <SelectItem className="hover:bg-gray-100" value={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                
                
                <Button type="submit">Sửa</Button>
            </form>
        </Form>
    )
}


export default MenuEditForm