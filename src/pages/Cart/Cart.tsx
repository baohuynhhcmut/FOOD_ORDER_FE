import { useSelector } from "react-redux"
import Order from "./Order"
import Summary from "./Summary"
import { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getMenuByListId } from "@/api/MenuApi"
import { useNavigate } from "react-router-dom"
import ApplyVoucher from "./ApplyVoucher"

const Cart = () => {

    const cart = useSelector((root:RootState) => root.cart.cart)
    const idList = cart.map((item) => item.item)
    const navigate = useNavigate()
    const [product,setProduct] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await getMenuByListId(idList)
            setProduct(result.data)
        }
        fetchAPI()
    },[])   

    // console.log(product)

    return (
        <> 
            {cart.length == 0 ?(
                <>
                    <div className="max-w-7xl mx-auto flex items-center justify-center flex-col gap-y-10">
                        <img className="w-[250px] h-[250px] object-cover border border-black rounded-full" src="https://cdn-icons-png.flaticon.com/512/5166/5166615.png"  />
                        <h2 className="font-bold text-2xl text-orange-500">Bạn chưa có đơn hàng nào</h2>
                        <div className="flex items-center gap-x-2">
                            <Button onClick={() => navigate('/food')} className="bg-orange-500">Mua ngay</Button>
                            <Button onClick={() => navigate('/restaurant')} className="bg-blue-500">Xem nhà hàng khác</Button>
                        </div>
                    </div>
                </>
            ):(
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-10 p-10 md:p-0">
                        <div className="md:col-span-2 overflow-x-auto">
                            <Order product={product} cart={cart} />
                        </div>
                        <div className="flex flex-col">
                            <Summary product={product} cart={cart} />
                            <ApplyVoucher product={product} />
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart