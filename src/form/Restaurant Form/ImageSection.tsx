import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {

    const { control , watch} = useFormContext()
    
    const [imagePreview,setImagePreview] = useState<string|undefined>()

    const existImage = watch('imageUrl')

    const handleFileChange = (e:any) => {
        const file = e.target.files[0]
        setImagePreview(URL.createObjectURL(file))
    }
      
  
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Ảnh nhà hàng</h2>
          <FormDescription>Thêm ảnh nhà hàng của bạn</FormDescription>
        </div>
        <div className="flex flex-col gap-y-16 w-[50%]">
            {imagePreview ? (
              <> 
                  <div className="md:w-[400px] md:h-[400px] w-40 h-40">
                      <>
                        <img src={imagePreview} alt="Image" className="h-full w-full rounded-md object-cover" />
                      </>
                  </div>
              </>
            ):(
              <> 
                  {existImage && 
                    <div className="md:w-[400px] md:h-[400px] w-40 h-40 ">
                            <>
                              <img src={existImage} alt="Image" className="h-full w-full rounded-md object-cover" />
                            </>
                    </div>
                  }
              </>
            )}
          <FormField
            name="imageFile"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files ? e.target.files[0] : null)
                      handleFileChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
}

export default ImageSection;
