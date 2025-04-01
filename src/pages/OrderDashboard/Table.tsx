import OrderTableDashboard from "@/components/TableDashboard/OrderTableDashboard"
import { OrderMenu } from "@/store/slice/OrderSlice"

type Props = {
    orders:OrderMenu[]
}

const Table = ({orders}:Props) => {
  return (
    <OrderTableDashboard order={orders} />
  )
}

export default Table