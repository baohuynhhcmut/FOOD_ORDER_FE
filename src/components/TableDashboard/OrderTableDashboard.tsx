import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { OrderMenu, setOrder, } from "@/store/slice/OrderSlice"
import { editOrderOfRestaurant } from "@/api/OrderApi"
import { Checkbox } from "../ui/checkbox"
import { formattedDate } from "@/utils/date"

type Props = {
    order:OrderMenu[]
}

const orderStatus = ["Khởi tạo","Thất bại","Đã thanh toán","Đang giao","Thành công"]


type checkbox = {
    orderId:string,
    menuId:string
}

type multichecboxType = checkbox[]

const lengthOfOrder = (order:any) => {
    let length = order.reduce((accumm:any,curr:any) => {
        return accumm + curr.menu.length
    },0)
    return length
}

const OrderTableDashboard = ({order}:Props) => {

    const dispatch = useDispatch()
    const [selected,setSelected] = useState<multichecboxType>([])
    

    const handleChangeValue = async (value:string,orderId:string,_id:string) => { 
        console.log(value)

        const updatedData = order.map((item) => {
            if(item._id == orderId && item.menu._id == _id){
                return {
                    ...item,
                    menu:{
                        ...item.menu,
                        status:value
                    }
                }
            }
            else{
                return item
            }
        })
        
        console.log(updatedData)

        const idList = [
            {
                orderId:orderId,
                menuId:_id
            }
        ]

        const result = await editOrderOfRestaurant(idList,value)
        if(result.code == 200){
            dispatch(setOrder({data:updatedData}))
        }
    }

    const handleCheckMulti = (checked:any,orderId:string,menuId:string) => {
        let  updatedData:multichecboxType = selected 
        // console.log(orderId,menuId)
        if(checked){
            updatedData = [...updatedData,{orderId: orderId,menuId:menuId}]
        }
        else{
            updatedData = updatedData.filter((item) => item.menuId != menuId && item.orderId != orderId)
        }
        setSelected(updatedData)
        // console.log(updatedData)
    }
    
    const handleMultiValueChange = async (value:string) => {
        const result = await editOrderOfRestaurant(selected,value)
        if(result.code == 200){
            const updatedData = order.map((item) => {
                const checkExist = selected.find((selectedItem) => selectedItem.menuId == item.menu._id && selectedItem.orderId == item._id)
                if(checkExist){
                    return {
                        ...item,
                        menu:{...item.menu,status:value}
                    }
                }
                else{
                    return item;
                }
            })
            dispatch(setOrder({data:updatedData}))
        }
    }

    const handleCheckAll = (checked:any) => {
        if(checked){
            const updatedData = order.map((item) => {return {menuId:item.menu._id,orderId:item._id}})
            setSelected(updatedData)
        }
        else{
            setSelected([])
        }
    }

    // console.log(selected)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="flex items-center gap-x-2 min-w-20">
                        <Checkbox 
                        checked={selected.length == order.length} 
                        onCheckedChange={(value) => handleCheckAll(value)}
                        />
                    </TableHead>
                    <TableHead className="min-w-20">Mã đơn hàng</TableHead>
                    <TableHead className="min-w-20">Tên sản phẩm</TableHead>
                    <TableHead className="min-w-20">Tình trạng</TableHead>
                    <TableHead className="min-w-20">Hình thức giao dịch</TableHead>
                    <TableHead className="min-w-20">Giá đơn vị</TableHead>
                    <TableHead className="min-w-20">Số lượng</TableHead>
                    <TableHead className="min-w-20">Tổng</TableHead>
                    <TableHead className="min-w-40">Ngày tạo</TableHead>
                    <TableHead className="min-w-40">Lần cập nhật cuối cùng</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {order.map((item) => (
                    <TableRow>
                        <TableCell>
                            <Checkbox 
                                checked={selected.find((selectIem) => selectIem.menuId == item.menu._id && selectIem.orderId == item._id) ? true : false}
                                onCheckedChange={(value) => handleCheckMulti(value,item._id,item.menu._id)}
                            />
                        </TableCell>
                        <TableCell>{item.menu._id}</TableCell>
                        <TableCell>{item.menuDetails.name}</TableCell>
                        <TableCell>
                            <Select value={item.menu.status} onValueChange={(value) => handleChangeValue(value,item._id,item.menu._id)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Chọn tình trạng đơn hàng" />
                                </SelectTrigger>
                                <SelectContent>
                                    {orderStatus.map((item) => (
                                        <SelectItem value={item} disabled={item == orderStatus[2] || item == orderStatus[0]}>{item}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>{item.bankCode == 'VNBANK' ? 'Thanh toán qua ATM ngân hàng' : 'Thanh thánh quốc tế'}</TableCell>
                        <TableCell>{item.menuDetails.price}</TableCell>
                        <TableCell>{item.menu.quantity}</TableCell>
                        <TableCell>{item.menu.quantity * item.menuDetails.price}</TableCell>
                        <TableCell>
                            {formattedDate(item.createdAt)}
                        </TableCell>
                        <TableCell>
                            {formattedDate(item.updatedAt)}
                        </TableCell>
                    </TableRow> 
                ))}
                <TableRow>
                    <TableCell colSpan={10}>
                        {selected.length > 0 && (
                            <Select onValueChange={(value) => handleMultiValueChange(value)}>
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Chọn tình trạng đơn hàng" />
                                </SelectTrigger>
                                <SelectContent>
                                    {orderStatus.map((item) => (
                                        <SelectItem value={item} disabled={item == orderStatus[2] || item == orderStatus[0]}>{item}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default OrderTableDashboard