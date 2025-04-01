import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import UserMenuDashboard from "./UserMenuDashboard";


const HeaderDashboard = () => {

    const {open,toggleSidebar} = useSidebar()


    return (
        <div className="w-full py-3 border-b flex items-center justify-between pr-10">
            <Button variant={"ghost"} className="h-full text-3xl!" onClick={toggleSidebar}>
                {open ? <TbLayoutSidebarLeftCollapseFilled  />
                    : <TbLayoutSidebarRightCollapse />}
            </Button>
            <UserMenuDashboard />
        </div>
    )
}

export default HeaderDashboard