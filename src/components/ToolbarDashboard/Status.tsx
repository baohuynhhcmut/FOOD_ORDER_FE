import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  valueDefaultStatus:string[];
  valueSelectedStatus :string;
  onSelectedStatus: (value:string) => void;
}

const Status = ({valueSelectedStatus,valueDefaultStatus,onSelectedStatus}:Props) => {
  return (
    <Select value={valueSelectedStatus} onValueChange={(value) => {
       onSelectedStatus(value)
    }}>
      <SelectTrigger className="w-full ring-0 focus:ring-0">
        <SelectValue placeholder="Chọn tình trạng" />
      </SelectTrigger>
      <SelectContent>
        {valueDefaultStatus.map((item,_) => (
          <SelectItem value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default Status