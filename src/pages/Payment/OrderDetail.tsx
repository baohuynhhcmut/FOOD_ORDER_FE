import { getMenuById } from "@/api/MenuApi";
import { menuItem } from "@/type";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


const OrderDetail = () => {

    const [searchParams] = useSearchParams();
    const [menuOrder,setMenuOrder] = useState<menuItem | undefined>()

    const id = searchParams.get('id') as string;          
    const quantity = searchParams.get('quantity') as string; 

    useEffect(()=>{
        const fetchMenuOrder = async () => {
            const result = await getMenuById(id)
            setMenuOrder(result.data)
        }
        fetchMenuOrder()
    },[])


    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold text-xl text-center">{menuOrder?.name}</CardTitle>
                <div className="flex items-center justify-center space-x-4">
                    <img className="w-40 h-40 object-cover rounded-md" src={menuOrder?.imageMenu} />
                    <div>
                        <span>Số lượng : <span className="font-bold">{quantity}</span></span>
                    </div>
                </div>

            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}

export default OrderDetail