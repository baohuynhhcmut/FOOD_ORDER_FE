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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRegisterForm } from "@/api/UserApi";
import { toast } from "sonner";

interface ChildProps {
  setView: React.Dispatch<React.SetStateAction<AuthMode>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const strongPasswordSchema = z
  .string()
  .min(8, { message: "Password phải có ít nhất 8 ký tự" })
  .regex(/[A-Z]/, { message: "Password phải chứa ít nhất 1 chữ hoa" })
  .regex(/[a-z]/, { message: "Password phải chứa ít nhất 1 chữ thường" })
  .regex(/[0-9]/, { message: "Password phải chứa ít nhất 1 số" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password phải chứa ít nhất 1 ký tự đặc biệt",
  });

const userRegisterSchema = z
  .object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    name: z.string(),
    password: strongPasswordSchema,
    confirmPassword: z.string(),
    addressLine1: z.string(),
    city: z.string(),
    phoneNumber: z.string().min(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export type userRegisterType = z.infer<typeof userRegisterSchema>;
export type regiserRequest = Omit<userRegisterType,"confirmPassword">

const Register = ({ setView,setOpen }: ChildProps) => {
  const form = useForm<userRegisterType>({
    resolver: zodResolver(userRegisterSchema),
  });

  const { RegisterRequest,isLoading } = useRegisterForm()

  const handleRegister = async(data: userRegisterType) => {
      try {
        const {confirmPassword,...payload} = data
        const respone = await RegisterRequest(payload)
        console.log(respone)
        setOpen(false)
        setView(AuthMode.Login)
      } catch (error) {
        // console.log(error)
        setView(AuthMode.Login)
        setOpen(false)
      }
   };

    if(isLoading){
        setView(AuthMode.Loading)
    }


  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const respone = await fetch("https://provinces.open-api.vn/api/?depth=2");
      const result = await respone.json();
      setCity(result);
    };
    fetchApi();
  }, []);

//   console.log(">> City: ", city);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="max-h-[600px] overflow-y-auto space-y-4 p-3">
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

        <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                    <Input placeholder="Số điện thoại" {...field} />
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
                <Input placeholder="Name" {...field} />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Địa chỉ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thành phố, tỉnh thành</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tỉnh thành" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {city.map((item: any, index) => (
                    <SelectItem key={index} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-orange-500">Đăng kí</Button>
        <Button onClick={() => setView(AuthMode.Login)} className="w-full bg-orange-500">
            Đăng nhập
        </Button>
        <Button onClick={() => setView(AuthMode.ResetPassword)} className="w-full bg-orange-500">Quên mật khẩu</Button>
        <Button className="w-full bg-orange-500">
        <FaGoogle />
            Google
        </Button>
      </form>
    </Form>
  );
};
export default Register;
