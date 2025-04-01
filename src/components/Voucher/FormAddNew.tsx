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
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DropDownMenu from "./DropDownMenu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const voucherSchema = z.object({
    code: z.string().min(6, { message: "Mã code không được để trống và ít nhất 6 chữ số." }), // Đảm bảo mã code không trống
    type: z.string().min(1, { message: "Loại không được để trống." }), // Đảm bảo loại không trống
    discount: z.coerce.number().min(0, { message: "Giảm giá phải là một số không âm." }), // Đảm bảo discount là số không âm
    name: z.string().min(1, { message: "Tên không được để trống." }), // Đảm bảo tên không trống
    description: z.string().min(1, { message: "Mô tả không được để trống." }), // Đảm bảo mô tả không trống,
});

export type voucherType = z.infer<typeof voucherSchema>
type Props = {
    onSave : (value:any) => void;
    setOpen: any
}
const FormAddNew = ({onSave,setOpen}:Props) => {

    const form = useForm<voucherType>({
        resolver: zodResolver(voucherSchema)
    })

    const onSubmit = (value:voucherType) => {
        if(menu.length == 0){
            toast.error('Phải lựa ít nhất 1 sản phẩm giảm giá')
        }
        else{
            const data = {
                ...value,
                menu:menu
            }
            onSave(data)
            setOpen(false)
        }
    }

    const [menu,setMenu] = useState<string[]>([])



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Voucher miễn phí</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Yes or No" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="FREE">Có</SelectItem>
                        <SelectItem value="NOT FREE">Không</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />


                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mã giảm giá</FormLabel>
                        <FormControl>
                            <Input placeholder="Mã giảm giá" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Giảm giá</FormLabel>
                        <FormControl>
                            <Input placeholder="3%"  {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tên voucher</FormLabel>
                        <FormControl>
                            <Input placeholder="Khuyến mãi đầu năm"  {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nội dung mã giảm</FormLabel>
                        <FormControl>
                            <Input placeholder="Miễn phí ship cho lần đầu đặt hàng" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-y-2">
                    <FormLabel>Lựa chọn món ăn thuộc chương trình giảm</FormLabel>
                    <DropDownMenu 
                        selected={menu}
                        setSelected={setMenu}
                    />
                </div>
                
                <Button type="submit">Gửi</Button>
            </form>
            </Form>
    )
}
export default FormAddNew