import MenuColumnChart from "@/components/Chart/MenuColumnChart"
import UserTable from "@/components/Chart/UserTable"

const UserMenuView = () => {
  return (
    <div className="max-w-7xl">
        <div className="grid md:grid-cols-2 gap-2 w-full">
            <MenuColumnChart />
            <UserTable />
        </div>
    </div>
  )
}

export default UserMenuView