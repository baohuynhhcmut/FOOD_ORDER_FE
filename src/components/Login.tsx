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
import { loginWithGoogleAuthen, useloginWithForm } from "@/api/UserApi";
import { AuthMode } from "./AuthModal";
import { useDispatch, UseDispatch } from "react-redux";
import { login } from "@/store/slice/AuthSlice";
import { toast } from "sonner";
import { loginWithGoogle } from "@/firebase/login";
import { useEffect } from "react";
import { getRedirectResult, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { capitalizeKeywords, moveFirstKeywordToLast } from "@/utils/StandardName";

interface ChildProps {
  setView: React.Dispatch<React.SetStateAction<AuthMode>>;
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const isValidEmailOrPhone = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0|\+84)[0-9]{9}$/; // VD: 0901234567 hoặc +84901234567
  return emailRegex.test(value) || phoneRegex.test(value);
};


const userSchema = z.object({
  account: z.string().min(5, {
    message: "Email phải ít nhất 5 kí tự.",
  }).refine(isValidEmailOrPhone, {
    message: "Vui lòng nhập email hoặc số điện thoại hợp lệ.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});


export type userLoginType = z.infer<typeof userSchema>;


const UserLogin = ({setView,setOpen}:ChildProps) => {

  const { Login, isLoading } = useloginWithForm();

  const dispatch = useDispatch()

  const form = useForm<userLoginType>({
    resolver: zodResolver(userSchema),
  });

  const handleLogin = async (userValue: userLoginType) => {
    
    try {
      const { data } = await Login(userValue);
      console.log(data)
      dispatch(login({user:data.user,token:data.accessToken}))
      setOpen(false)
    } catch (err) {
      setView(AuthMode.Login)
      toast.error('Không đúng tài khoản hoặc mật khẩu')
      setOpen(false)
    }
  };
  
  if(isLoading){
    setView(AuthMode.Loading)
  }
  
  const HandleloginWithGoogle = async () => {
    // await signOut(auth)
    const result:any = await loginWithGoogle()
    const {displayName,email,phoneNumber} = result[0]
    const name = moveFirstKeywordToLast(capitalizeKeywords(displayName as string))
    const data = {
      email:email,
      name:name,
      phoneNumber:phoneNumber
    }
    const res = await loginWithGoogleAuthen(data)
    console.log(res)
    dispatch(login({user:res.user,token:res.accessToken}))
    setOpen(false)
  }

  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email hoặc số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Email hoặc số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-orange-500">
            Đăng nhập
          </Button>
          <Button onClick={() => setView(AuthMode.Register)} className="w-full bg-orange-500">Đăng kí</Button>
          <Button onClick={() => setView(AuthMode.ResetPassword)} className="w-full bg-orange-500">Quên mật khẩu</Button>
          
        </form>
      </Form>
      <Button className="w-full bg-orange-500" onClick={HandleloginWithGoogle}>
          <FaGoogle />
        Google
      </Button>
    </>
  );
};
export default UserLogin;
