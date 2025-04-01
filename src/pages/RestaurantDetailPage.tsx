import { useCreateSession } from "@/api/OrderApi";
import { useGetRestaurantDetail } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
import { userFormData } from "@/form/UserFormProfile";
import { CartItem, CheckoutSessionRequest, menuItem } from "@/type";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetRestaurantDetail(id as string);

  const { createCheckoutSession, isLoading: sessionLoading } =
    useCreateSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const existCart = sessionStorage.getItem(`cartItem-${data?._id}`);
    console.log(existCart);
    return existCart ? JSON.parse(existCart) : [];
  });

  const handleCheckout = async (data: userFormData) => {
    const checkOutData: CheckoutSessionRequest = {
      cartItems: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
      })),
      deliveryDetail: data,
      restaurantId: id as string,
    };
    const url: any = await createCheckoutSession(checkOutData);

    window.location.href = url.url;
  };

  const addToCart = (menuItem: menuItem) => {
    setCartItems((prev) => {
      const existItem = prev.find((item) => item._id == menuItem._id);
      let tempCart;
      if (existItem) {
        tempCart = prev.map((item) =>
          item._id == existItem._id
            ? { ...existItem, quantity: existItem.quantity + 1 }
            : item
        );
      } else {
        tempCart = [...prev, { ...menuItem, quantity: 1 }];
      }
      sessionStorage.setItem(`cartItem-${data?._id}`, JSON.stringify(tempCart));
      return tempCart;
    });
  };

  const removeToCart = (menuItem: CartItem) => {
    setCartItems((prev) => {
      let tempCart = prev.filter((item) => item._id != menuItem._id);
      sessionStorage.setItem(`cartItem-${data?._id}`, JSON.stringify(tempCart));
      return tempCart;
    });
  };

  if (isLoading) {
    return (
      <>
        <h2 className="text-orange-500 text-center h-full text-xl">
          Loading data,please wait ...
        </h2>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h2 className="text-orange-500 text-center h-full text-xl">
          No result matching
        </h2>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={data?.imageUrl}
          alt={data?.restaurantName}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">
        <div className="flex flex-col gap-4">
          {data && <RestaurantInfo restaurant={data} />}
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {data?.menuItem.map((item) => (
            <MenuItem menuItem={item} addToCart={() => addToCart(item)} />
          ))}
        </div>

        <Card>
          {data && (
            <OrderSummary
              restaurant={data}
              cartItems={cartItems}
              removeToCart={removeToCart}
              onCheckout={handleCheckout}
              loadingSession={sessionLoading}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
  