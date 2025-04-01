import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

type Props = {
    open:boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    name:string;
    handleRemove: () => void;
}

const ButtonDelete = ({open,setOpen,name,handleRemove}:Props) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button className="bg-red-500 w-full">Xóa</Button>
        </PopoverTrigger>
        <PopoverContent>
            <div className="flex flex-col">
                <p className="text-wrap">Bạn có chắc muốn xóa <span className="text-red-500">{name}</span></p>
                <div className="flex justify-end gap-x-4">
                    <Button onClick={() => setOpen(false)} className="bg-blue-500">Hủy</Button>
                    <Button onClick={handleRemove} className="bg-red-500">Có</Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ButtonDelete