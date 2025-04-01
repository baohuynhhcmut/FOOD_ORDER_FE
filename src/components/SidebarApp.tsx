import { Utensils, Home, ListOrdered, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CiGift } from "react-icons/ci";

// Menu items.
const items = [
  {
    title: "Tổng quản",
    url: "/overview",
    icon: Home,
    active:false
  },
  {
    title: "Menu",
    url: "/menu",
    icon: Utensils,
    active:false
  },
  {
    title: "Đơn hàng",
    url: "/order",
    icon: ListOrdered,
    active:false
  },
  {
    title: "Voucher",
    url: "/voucher",
    icon: CiGift,
    active:false
  },
  {
    title: "Chỉnh sửa",
    url: "/setting",
    icon: Settings,
    active:false
  },
]

export function AppSidebar() {
  
  const [itemMenu,setItem] = useState(items)

  const location = useLocation()

  useEffect(() => {
    const activeSide = () => {
      const updated = itemMenu.map((item) => location.pathname.includes(item.url) ? {...item,active:true} : {...item,active:false})
      setItem(updated)
    }
    activeSide()
  },[location])

  const {restaurantId} = useParams()
  const handleActive = (title:string) => {
    const updated = itemMenu.map((item) => {
      if(item.title != title){
        item.active = false;
        return item
      }
      else{
        item.active = true;
        return item
      }
    })
    setItem(updated)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nhà hàng của bạn</SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu >
              {itemMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.active && item.active}>
                    <Link to={`/dashboard${item.url}/${restaurantId}`} onClick={() => handleActive(item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
