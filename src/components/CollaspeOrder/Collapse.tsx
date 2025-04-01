import { order } from "@/type"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formattedDate } from "@/utils/date"
import TableMenu from "./TableMenu"
  
type Props = {
    order:order
}

const Collapse = ({order}:Props) => {
  return (
    <Collapsible>
        <div className="flex items-center justify-between gap-x-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Mã đơn hàng</TableHead>
                        <TableHead className="w-20 overflow-hidden">Tình trạng</TableHead>
                        <TableHead>Tổng chi phí</TableHead>
                        <TableHead>Phương thức thanh toán</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead>Cập nhật lần cuối</TableHead>
                        <TableHead>Sản phẩm</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-52">{order._id}</TableCell>
                        <TableCell className="w-24">
                            <span>{order.status}</span>
                        </TableCell>
                        <TableCell className="w-24">{order.total}</TableCell>
                        <TableCell className="w-24">{order.bankCode == "VNBANK" ? 'ATM Ngân hàng' : 'Thẻ quốc tế'}</TableCell>
                        <TableCell className="w-10">{order.email}</TableCell>
                        <TableCell >{formattedDate(order.createdAt).replace('lúc','')}</TableCell>
                        <TableCell >{formattedDate(order.updatedAt).replace('lúc','')}</TableCell>
                        <TableCell>
                            <CollapsibleTrigger asChild>
                                <Button className="bg-green-600">Xem</Button>
                            </CollapsibleTrigger>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>
                            <CollapsibleContent className="px-3">
                                <TableMenu menu={order.menu} />
                            </CollapsibleContent>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>

            
        </div>
    </Collapsible>
  )
}

export default Collapse