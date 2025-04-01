import ButtonConfirmRemove from "@/components/ButtonConfirmRemove"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { addCart, clearCart, decreCart } from "@/store/slice/CartSlice"
import { MenuRequest } from "@/type"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

type Props = {
    product:any,
    cart:MenuRequest[]
}




const Order = ({product,cart}:Props) => {

    const dispatch = useDispatch()
    const [checkAll,setCheckAll] = useState(false)

    const handleDecre = (quantity:number,_id:string) => {
        console.log(quantity,_id)

        if(quantity == 1){
            toast.error('Số lượng phải lớn 0')
        }
        else{
            dispatch(decreCart({data:_id}))
        }
    }

    const [selected,setSelected] = useState<string[]>([])

    const handleSelect = (_id:string) => {
        if(selected.includes(_id)){
            const updated = selected.filter((item) => item != _id)
            setSelected(updated)
        }
        else{
            const updated = [...selected,_id]
            setSelected(updated)
            if(updated.length == cart.length){
                setCheckAll(true)
            }
            
        }
    }

    const handleCheckAll = (checkState:any) => {
        if(checkState){
            setCheckAll(true)
            const updated = cart.map((item) => item.item)
            setSelected(updated)
        }
        else{
            setCheckAll(false)
            setSelected([])
        }
    }

    const handleRemoveAll = () => {
        dispatch(clearCart({}))
    }

    return (
        <Table className="min-w-full table-auto">
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <div className="flex items-center gap-x-1">
                            <Checkbox checked={checkAll} onCheckedChange={(checkState) => handleCheckAll(checkState)}/>
                        </div>
                    </TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Ảnh</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead className="text-right">Tổng</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cart.map((item:any,index:number) => (
                    <TableRow>
                        <TableCell>
                            <Checkbox checked={selected.includes(item.item)} onCheckedChange={() => handleSelect(item.item)} />
                        </TableCell>
                        <TableCell>
                            {product[index]?.name}
                        </TableCell>
                        <TableCell>
                            <img src={product[index]?.imageMenu} className="w-40 min-w-40 h-40 object-cover rounded-md"/>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-2">
                                <Button className="w-3" onClick={() => handleDecre(item.quantity,item.item)}>-</Button>
                                <span className="font-bold border border-black rounded-md p-2 text-xs">{item?.quantity}</span>
                                <Button className="w-3" onClick={() => {
                                    dispatch(addCart({data:item.item}))}
                                }>+</Button>
                            </div>                            
                        </TableCell>
                        <TableCell>
                            {product[index]?.price}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                            {product[index]?.price * item.quantity} Vnđ
                        </TableCell>
                        <TableCell className="text-right font-bold">
                            <ButtonConfirmRemove _id={item.item} />
                        </TableCell>
                    </TableRow>
                ))}
                {selected.length > 0 && (
                    <TableRow>
                        <TableCell>
                            <Button className="bg-red-500" onClick={handleRemoveAll}>
                                Xóa hết
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default Order