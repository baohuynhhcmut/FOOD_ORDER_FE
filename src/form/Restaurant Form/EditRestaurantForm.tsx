import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import  { z } from "zod"
import DetailSection from "./DetailSection"
import { Separator } from "@/components/ui/separator"
import CuisineSection from "./CuisineSection"
import ImageSection from "./ImageSection"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    restaurantName: z.string({
        required_error:'Tên khách sản là bắt buộc!'
    }),
    city: z.string({
        required_error:'Thành phố tỉnh thành là bắt buộc!'
    }),
    deliveryPrice: z.coerce.number({
        required_error: 'Giá hàng chuyển là bắt buộc',
        invalid_type_error: 'Hãy nhập số'
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'Thời gian vận chuyển ước tính là bắt buộc',
        invalid_type_error: 'Hãy nhập số'
    }),
    cuisines: z.array(z.string()).nonempty({
        message:'Hãy chọn 1 ẩm thực'
    }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File,{
        message: 'File bắt buộc'
    }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Ảnh nhà hàng là bắt buộc",
    path: ["imageFile"]
})

type formRestaurnatData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantFormData:FormData) => any
    isLoading: boolean
    restaurant?:formRestaurnatData,
}

const EditRestaurantForm = ({onSave,isLoading,restaurant}: Props) => {

    console.log(restaurant)
    
    const navigate = useNavigate()

    const form = useForm<formRestaurnatData>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            cuisines:[]
        }
    })
    
    const onSubmit = async (formData : formRestaurnatData) => {

        console.log('Submit: ',formData)
        const form = new FormData()
        form.append('restaurantName',formData.restaurantName)
        form.append('city',formData.city)
        form.append('deliveryPrice',formData.deliveryPrice.toString())
        form.append('estimatedDeliveryTime',formData.estimatedDeliveryTime.toString())
        formData.cuisines.forEach((cuisineItem,index) => {
            form.append(`cuisines[${index}]`,cuisineItem)
        })

        if(formData.imageFile){
            form.append('imageFile',formData.imageFile)
        }
        
        
        // for (const pair of form.entries()) {
        //     console.log(pair[0], pair[1]);
        // }

        await onSave(form)
    }


    useEffect(()=>{
        if(!restaurant){
            return
        }
        form.reset(restaurant)
    },[form,restaurant])


    return (
        
      <>
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit,error => console.log(error))}
            className="space-y-8 p-10 rounded-lg max-w-7xl mx-auto"
            >
            {/* <Button onClick={() => navigate("/my-restaurant")} className="bg-orange-500">Quay lại</Button> */}
            <DetailSection />
            <Separator />
            <CuisineSection />
            <Separator />
            <ImageSection />
            <Separator />
            {isLoading ? <LoadingButton /> : <Button disabled={!form.formState.isDirty} type="submit" className="bg-orange-500">Submit</Button>}
            </form>
        </Form>
      </>
    );
}

export default EditRestaurantForm;
