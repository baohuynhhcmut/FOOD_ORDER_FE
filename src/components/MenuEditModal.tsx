import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { menuItem } from "@/type"
import { Button } from "./ui/button"
import MenuEditForm from "./MenuEditForm"
import { useState } from "react"

type Props = {
    menuItem: menuItem
}

const MenuEditModal = ({menuItem}:Props) => {

    const [open,setOpen] = useState(false)
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>{'Sửa'}</Button>
            </DialogTrigger>
            <DialogContent>
                <MenuEditForm menuItem={menuItem} setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    )
}

export default MenuEditModal