import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { provider } from "@/firebase";


const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, {
    message: "Name is required !"
  }),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  city: z.string().min(1, "City is require"),
  phoneNumber: z.string().min(1, "Country is require"),
  provider:z.string().optional()
});

export type userFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: userFormData) => any;
  isLoading: boolean;
  user: userFormData;
  title?:string;
  buttonText?: string;
};


const UserFormProfile = ({ onSave, isLoading,user,title='Thông tin cá nhân',buttonText='Thay đổi' }: Props) => {
  const form = useForm<userFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: user
  });

  useEffect(() => {
    
    form.reset(user)
  },[form,user])


  // useEffect(() => {
  //   if(onSave?.status == 200){
  //     form.reset(onSave?.data)
  //   }
  // },[onSave,form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-100 rounded-lg md:p-10 max-w-7xl mx-auto p-10 md:p-0"
      >
        <div>
          <h2 className="font-bold text-2xl ">{title}</h2>
          <FormDescription>
            Bạn có thể xem và thay đổi thông tin của mình tại đây
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@gmail.com" {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                    <Input placeholder="0386xxxxxxx" {...field}  className="bg-white" />
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
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Tran Van A" {...field}  className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col md:flex-row gap-4">
            
            <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormLabel>Địa chỉ nhà</FormLabel>
                <FormControl>
                    <Input placeholder="123 Dinh Van Hung street ..." {...field}  className="bg-white" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormLabel>Thành phố</FormLabel>
                    <FormControl>
                        <Input placeholder="Thu Duc City" {...field}  className="bg-white" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
            )}
            />


        </div>
          
        <div className="flex items-center gap-x-2">
          {isLoading ? <LoadingButton /> : <Button disabled={!form.formState.isDirty} type="submit" className="bg-orange-500">{buttonText}</Button>}
          {!user?.provider && <Button onClick={() => console.log(1)} className="bg-red-500">Đổi mật khẩu</Button>}
        </div>
        
      </form>
    </Form>
  );
};

export default UserFormProfile;
