import { CartItem, restaurant } from "@/type";
import { CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash2 } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import { userFormData } from "@/form/UserFormProfile";


type Props = {
    restaurant:restaurant;
    cartItems : CartItem[];
    removeToCart: (cartItem:CartItem) => void;
    onCheckout: (userData:userFormData) => void;
    loadingSession:boolean;
}

const OrderSummary = ({restaurant,cartItems,removeToCart,onCheckout,loadingSession}: Props) => {

    const gerOrderCost = () => {
        let totalPrice =  cartItems.reduce((acc,item) => acc + item.price * item.quantity,0) + restaurant.deliveryPrice
        return totalPrice
    }


    return (
        <>
            <CardHeader className="text-2xl font-bold tracking-tight flex-row flex justify-between items-center">
                <span>Your Order </span>
                <span>{gerOrderCost()} Đ</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <>
                        <div className="flex justify-between">
                            <span>
                                <Badge variant={'outline'} className="mr-2">
                                    {item.quantity}
                                </Badge>
                                {item.name}
                            </span>
                            <span className="flex">  
                                <Trash2 onClick={() => removeToCart(item)} className="text-red-500 mr-2 cursor-pointer" />
                                {item.price * item.quantity}
                            </span>
                        </div>
                    </>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{restaurant.deliveryPrice}</span>
                </div>
                <Separator />
            </CardContent>
            <CardFooter >
                <CheckoutButton disabled={cartItems.length === 0 } onCheckout={onCheckout} loadingSession={loadingSession}  />
            </CardFooter>
            
        </>
    );
}

export default OrderSummary;
