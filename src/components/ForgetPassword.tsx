import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaGoogle } from "react-icons/fa";
import { AuthMode } from "./AuthModal";
import { useResetPassword } from "@/api/UserApi";

interface ChildProps {
    setView: React.Dispatch<React.SetStateAction<AuthMode>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const userSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});


export type forgetPassType = z.infer<typeof userSchema>;


const ForgetPassword = ({setView,setOpen}:ChildProps) => {


    const { ResetPassword,isLoading } = useResetPassword()

    const form = useForm<forgetPassType>({
        resolver: zodResolver(userSchema),
    });

  const handleForgetPassword = async (userValue: forgetPassType) => {
      await ResetPassword(userValue.email);
      setOpen(false)
      setView(AuthMode.Login)
  };  

    if(isLoading){
      setView(AuthMode.Loading)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleForgetPassword)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                
                <Button type="submit" className="w-full bg-orange-500">Gửi mật khẩu mới</Button>
                <Button onClick={() => setView(AuthMode.Register)} className="w-full bg-orange-500">Đăng kí</Button>
                <Button onClick={() => setView(AuthMode.Login)}  className="w-full bg-orange-500">
                    Đăng nhập
                </Button>
                <Button className="w-full bg-orange-500">
                    <FaGoogle />
                    Google
                </Button>
                </form>
            </Form>
        </>
    )
}
export default ForgetPassword