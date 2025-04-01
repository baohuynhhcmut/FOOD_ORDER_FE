import { PieChatOrder } from "@/components/Chart/PieChatOrder"
import TableOverView from "@/components/TableOverView"

const TableOverview = () => {
  return (
    <div className="max-w-7xl">
        <div className="grid  md:grid-cols-2 gap-2 ">
            <TableOverView />
            <PieChatOrder />
        </div>
    </div>
  )
}
export default TableOverview