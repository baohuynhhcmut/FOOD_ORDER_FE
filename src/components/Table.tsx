import {
    Table ,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { restaurant, setRestaurant } from "@/store/slice/RestaurantSlice"
import { Button } from "./ui/button"
import { formatDate } from "@/utils/date"
import ButtonSelect from "./CardResButton/ButtonSelect"
import { handeRemoveRes, handleCheckBoxRes, removeType, selectedBox } from "@/service/restaurant"
import { useState } from "react"
import ButtonDelete from "./CardResButton/ButtonDelete"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import Row from "./Row"

type Props = {
    restaurant : restaurant[]
    setSelectedRes:any
    selectedRes:any
}

const TableRestaurant = ({restaurant,selectedRes,setSelectedRes}:Props) => {

    return (
        <>
            <Table>
                <TableCaption>Danh sách nhà hàng của bạn</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            Chọn
                        </TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>Ảnh</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {restaurant.map((item) => (
                        <Row item={item} selectedRes={selectedRes} setSelectedRes={setSelectedRes} />
                    ))}
                </TableBody>
            </Table>
        </>
  )
}

export default TableRestaurant