import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import FormAddNew from "./FormAddNew"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { createVoucher } from "@/api/Voucher"
import { toast } from "sonner"


const ModalAddVoucher = () => {

    const {restaurantId} = useParams()
    const onSave = async (value:any) => {
        const data = {
            ...value,
            restaurantId: restaurantId
        }
        const result = await createVoucher(data)
        if(result.code == 200){
            toast.success('Tạo mã khuyến mãi mới thành công')
        }
    }   

    const [open,setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-500">Tạo mới</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Tạo voucher mới</DialogTitle>
                <DialogDescription>
                    <FormAddNew setOpen={setOpen} onSave={onSave} />
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default ModalAddVoucher
