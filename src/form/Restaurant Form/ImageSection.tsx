import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio"

const ImageSection = () => {

    const { control , watch} = useFormContext()
    
    const existImage = watch('imageUrl')

    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Image</h2>
          <FormDescription>Add your restaurant image</FormDescription>
        </div>
        <div className="flex flex-col gap-16 w-[50%]">
            <div className="md:w-[50%] w-[100%]">
                {existImage && 
                    <>
                        <AspectRatio ratio={16 / 9}>
                            <img src={existImage} alt="Image" className="rounded-md object-cover" />
                        </AspectRatio>
                    </>
                }
            </div>
          <FormField
            name="imageFile"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="file"
                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
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
