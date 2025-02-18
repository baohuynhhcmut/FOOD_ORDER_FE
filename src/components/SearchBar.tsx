import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

// create form schema 
const formSchema = z.object({
    searchQuery: z.string({
        required_error: 'Restaurant name is required!'
    })
})

export type searchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: searchForm) => void;
    placeHolder: string,
    onReset?: () => void;
    searchQuery: string;
}



const SearchBar = ({onSubmit,placeHolder,searchQuery}: Props) => {

  
    const form = useForm<searchForm>({
        resolver: zodResolver(formSchema),
        defaultValues:{
          searchQuery
        }
    })

    const handleReset = () => {
        form.reset({
            searchQuery:''
        })
    }

    useEffect(() => {
      form.reset({searchQuery})
    },[form,searchQuery])

    
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-row items-center  gap-3 w-full border-2 border-gray-100 p-2 rounded-full mx-auto ${form.formState.errors.searchQuery && 'border-red-500'} `}
        >
          <Search size={30} className="hidden md:block text-orange-500" />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="text-xl focus-visible:ring-0 border-none shadow-none"
                    placeholder={placeHolder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isDirty && (
            <Button
              onClick={handleReset}
              type="button"
              className="rounded-full"
              variant="outline"
            >
              Reset
            </Button>
          )}
          <Button type="submit" className="rounded-full bg-orange-500">
            Search
          </Button>
        </form>
      </Form>
    );
}

export default SearchBar;
