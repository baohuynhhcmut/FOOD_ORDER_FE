import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Props = {
    menu:[
        {
            item:{
                _id:string;
                name:string;
                imageMenu:string;
                price:number;
                restaurant:{
                    _id:string;
                    restaurantName:string;
                },
                category:string;
            },
            quantity:number;
        }
    ];
}

const TableMenu = ({menu}:Props) => {
  return (
    <Table>
        <TableHeader>
            <TableRow > 
                <TableHead >Mã sản phẩm</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead >Nhà hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Tổng</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {menu.map((data) => (
                
                 <TableRow>
                    <TableCell className="font-medium w-40">{data.item.name}</TableCell>
                    <TableCell className="w-20">{data.item.name}</TableCell>
                    <TableCell className="w-40">
                        <img src={data.item.imageMenu} className="w-40 h-20 rounded-lg" />
                    </TableCell>
                    <TableCell className="w-20">{data.item.restaurant.restaurantName}</TableCell>
                    <TableCell >{data.item.category}</TableCell>
                    <TableCell >{data.quantity}</TableCell>
                    <TableCell >{data.item.price}</TableCell>
                    <TableCell >{data.item.price * data.quantity}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}
export default TableMenu