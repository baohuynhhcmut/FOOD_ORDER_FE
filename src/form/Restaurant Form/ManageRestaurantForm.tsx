
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import  { z } from "zod"
import DetailSection from "./DetailSection"
import { Separator } from "@/components/ui/separator"
import CuisineSection from "./CuisineSection"
import MenuSection from "./MenuSection"
import ImageSection from "./ImageSection"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const formSchema = z.object({
    restaurantName: z.string({
        required_error:'Restaurant name is required!'
    }),
    city: z.string({
        required_error:'City name is required!'
    }),
    country: z.string({
        required_error:'Country name is required!'
    }),
    deliveryPrice: z.coerce.number({
        required_error: 'Delivery price is required',
        invalid_type_error: 'muse be a valid number'
    }),
    estimateDeliveryTime: z.coerce.number({
        required_error: 'Delivery time is required',
        invalid_type_error: 'muse be a valid number'
    }),
    cuisine: z.array(z.string()).nonempty({
        message:'Please select one item'
    }),
    menuItem: z.array(z.object({
        name: z.string().min(1,{
            message:'is required'
        }),
        price: z.coerce.number().min(1,{
            message:'is required'
        })
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File,{
        message: 'File is required'
    }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image file is required",
    path: ["imageFile"]
})

type formRestaurnatData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantFormData:FormData) => void
    isLoading: boolean
    restaurant?:formRestaurnatData
}

const ManageRestaurantForm = ({onSave,isLoading,restaurant}: Props) => {

   
    const form = useForm<formRestaurnatData>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            cuisine:[],
            menuItem:[{name:'',price:0}]
        }
    })
    
    const onSubmit = (formData : formRestaurnatData) => {
        const form = new FormData()
        form.append('restaurantName',formData.restaurantName)
        form.append('city',formData.city)
        form.append('country',formData.country)
        form.append('deliveryPrice',formData.deliveryPrice.toString())
        form.append('estimateDeliveryTime',formData.estimateDeliveryTime.toString())
        formData.cuisine.forEach((cuisineItem,index) => {
            form.append(`cuisine[${index}]`,cuisineItem)
        })

        formData.menuItem.forEach((item,index) => {
            form.append(`menuItem[${index}][name]`,item.name)
            form.append(`menuItem[${index}][price]`,item.price.toString())
        })
        
        if(formData.imageFile){
            form.append('imageFile',formData.imageFile)
        }
        onSave(form)
    }


    useEffect(()=>{
        if(!restaurant){
            return
        }
        form.reset(restaurant)
    },[form,restaurant])


    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit,error => console.log(error))}
          className="space-y-8 bg-gray-50 p-10 rounded-lg"
        >
          <DetailSection />
          <Separator />
          <CuisineSection />
          <Separator />
          <MenuSection />
          <Separator />
          <ImageSection />
          <Separator />
          {isLoading ? <LoadingButton /> : <Button type="submit" className="bg-orange-500">Submit</Button>}
        </form>
      </Form>
    );
}

export default ManageRestaurantForm;
