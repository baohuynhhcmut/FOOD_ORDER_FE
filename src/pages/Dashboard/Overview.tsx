import ChartOverview from "./ChartOverview"
import Revenue from "./Revenue"
import TableOverview from "./TableOverview"
import UserMenuView from "./UserMenuView"

const Overview = () => {
  return (
    <div className="p-4 flex flex-col gap-4 w-full">
        <ChartOverview />
        <TableOverview />
        <UserMenuView />
        <Revenue />
    </div>
  )
}

export default Overview