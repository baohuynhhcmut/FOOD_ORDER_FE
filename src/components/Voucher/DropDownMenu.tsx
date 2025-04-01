import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { getMenuResIdVoucher } from "@/api/MenuApi"
import { menuItem } from "@/type"
import { Checkbox } from "../ui/checkbox"

type Props = {
    selected:string[],
    setSelected:React.Dispatch<React.SetStateAction<string[]>>
}
const DropDownMenu = ({selected,setSelected}:Props) => {

        const {restaurantId} = useParams()
        const [menu,setMenu] = useState([])
        
        // console.log(restaurantId)

        useEffect(() => {
            const fetchAPI = async () => {
               if(restaurantId){
                const result = await getMenuResIdVoucher(restaurantId)
                setMenu(result.data)
               }
            }
            fetchAPI()
        },[])

        const handelSelected = (_id:string,checked:any) => {
            if(checked){
                const updated = [...selected,_id]
                setSelected(updated)
            }
            else{
                const updated = selected.filter((item) => item != _id)
                setSelected(updated)
            }
        }   

        const handelSelectedAll = (checked:any) => {
            if(checked){
                const updated = menu.map((item:menuItem) => item._id)
                setSelected(updated)
            }
            else{
                setSelected([])
            }
        }


        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} className="w-full"> Lựa chọn món ăn</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="h-[400px] overflow-y-auto">
                    <DropdownMenuLabel>Hãy lựa chọn món ăn bạn muốn áp dụng voucher này</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                            
                            <div className="flex flex-col gap-y-4 px-5 divide-y divide-gray-500">
                                <div className="flex items-center gap-x-10">
                                    <Checkbox id="all" checked={menu.length == selected.length} onCheckedChange={(checked) => handelSelectedAll(checked)} />
                                    <label htmlFor="all" className="font-bold">Chọn hết</label>
                                </div>
                                {menu.map((item:menuItem) => (
                                    <div className="flex items-center gap-x-10 py-5">
                                        <Checkbox  
                                            checked={selected.includes(item._id)}
                                            onCheckedChange={(checked) => handelSelected(item._id,checked)}
                                        />
                                        <img src={item.imageMenu} className="w-20 h-20 rounded-md object-cover" />
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                </DropdownMenuContent>
            </DropdownMenu>
        )
}
export default DropDownMenu