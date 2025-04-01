import HeaderDashboard from "@/components/HeaderDashboard"
import { AppSidebar } from "@/components/SidebarApp"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

type Props = {
    children: React.ReactNode
}
const Dashboard = ({children}:Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
        <main className="w-full">
            <HeaderDashboard />
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    </SidebarProvider>
  )
}

export default Dashboard