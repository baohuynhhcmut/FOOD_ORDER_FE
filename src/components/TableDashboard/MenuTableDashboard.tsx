import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { menuItem } from "@/type"
import { Checkbox } from "../ui/checkbox"
import { formattedDate } from "@/utils/date"
import MenuEditModal from "../MenuEditModal"
import ButtonDelete from "./ButtonDelete"
import { Button } from "../ui/button"

type Props = {
  menuItem:menuItem[]
  handleCheckAll: any;
  handleCheckBox:any;
  handleDeletedAll:any;
  valueInclude:string[];
}

export const statusMenu =  ['Đang bán','Ngừng bán','Sắp ra mắt']

const Bagde = (name:string) => {
  if(name == statusMenu[0]){
    return(
      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{name}</span>
    )
  }
  else if(name == statusMenu[1]){
    return(
      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">{name}</span>
    )
  }
  else{
    return(
      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">{name}</span>
    )
  }
}

const MenuTableDashboard = ({menuItem,handleCheckAll,handleCheckBox,valueInclude,handleDeletedAll}:Props) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
              <TableHead>
                  <div className="flex items-center gap-x-2">
                    <Checkbox checked={menuItem.length == valueInclude.length} onCheckedChange={(checked) => {
                      handleCheckAll(checked)
                    }} />
                    {valueInclude.length > 0 && <span onClick={handleDeletedAll} className="bg-red-600 text-xs cursor-pointer rounded-md p-2 text-white">Xóa hết</span>}
                  </div>
              </TableHead>
              <TableHead className="min-w-20">
                  Tên sản phẩm
              </TableHead>
              <TableHead className="min-w-40">
                  Ảnh
              </TableHead>
              <TableHead className="min-w-20">
                Tình trạng
              </TableHead>
              <TableHead>
                Giá
              </TableHead>
              <TableHead>
                Loại
              </TableHead>
              <TableHead>
                Ngày tạo
              </TableHead>
              <TableHead>
                Cập nhật lần cuối
              </TableHead>
              <TableHead>
                
              </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {menuItem.map((item) => (
              <TableRow>
                <TableCell className="min-w-20">
                  <Checkbox checked={valueInclude.includes(item._id)} onCheckedChange={(checked) => {
                    handleCheckBox(item._id,checked)
                  }} />
                </TableCell>
                <TableCell className="font-bold">
                  {item.name}
                </TableCell>
                <TableCell>
                  <img src={item.imageMenu} className="w-40  min-h-[80px] rounded-md object-cover" />
                </TableCell>
                <TableCell className="min-w-40">
                  {Bagde(item.status)}
                </TableCell>
                <TableCell className="min-w-20">
                  {item.price}
                </TableCell>
                <TableCell className="min-w-20">
                  {item.category}
                </TableCell>
                <TableCell className="min-w-40">
                  {formattedDate(item.createdAt).replace('lúc','')}
                </TableCell >
                <TableCell className="min-w-40">
                  {formattedDate(item.updatedAt).replace('lúc','')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2 justify-center h-full">
                    <MenuEditModal menuItem={item} />
                    <ButtonDelete _id={item._id} />
                  </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default MenuTableDashboard