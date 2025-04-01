import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from "./ui/button"
import { IoNotifications } from "react-icons/io5"
import { useEffect, useState } from "react"
import { createNotiRequest, getNotiRequest, typeNoti } from "@/api/Notification"
import { useLocation } from "react-router-dom"

type message = {
    seen: boolean;
    title:string;
    body:string;
    createdAt:string;
    _id:string;
}

type Props = {
    user:any
}

const checkExistNotiNotSeen = (messageList:message[])=>{
    return messageList.some((item) => item.seen == false)
}

const Notification = ({user}:Props) => {

    const [noti,setNoti] = useState<message[]>([])

    const location = useLocation()

    // useEffect(() => {
    //     const fetchAPI = async() => {
    //         const data:typeNoti = {
    //             email:user.email
    //         }
    //         await createNotiRequest(data)
    //     }
    //     fetchAPI()
    // },[])
    
    useEffect(() => {
        const fetchAPI = async() => {
            const checkExit = await createNotiRequest(user.email)
            if(checkExit.code == 200){
                if(user.email){
                    const result = await getNotiRequest(user.email)
                    setNoti(result.data.content)
                }
            }
        }
        fetchAPI()
    },[location.pathname])

    // console.log(noti)
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                   <div className="relative">
                        <IoNotifications className="text-orange-500" />
                        {checkExistNotiNotSeen(noti) && (
                            <>
                                 <span className="w-2 h-2 bg-red-500 rounded-full absolute top-[-2px] right-[-4px]"></span>
                            </>
                        )}
                   </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-y-4 max-h-[400px]">
                    {noti.map((item) => (
                        <>
                            <div className="flex flex-col rounded-md bg-gray-100 p-3 rounde--md cursor-pointer gap-y-3">
                                <span className="font-bold text-xs flex justify-between items-center">
                                    {item.title}
                                    {!item.seen && (
                                        <>
                                            <span className="text-xs">Chưa đọc</span>
                                        </>
                                    )}
                                </span>
                                <span className="text-sm">{item.body}</span>
                            </div>
                        </>
                    ))}
                    <Button className="w-full">Xem tất cả</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}


export default Notification