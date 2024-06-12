import { TopBarPropTypes } from '@/types';
import {Button} from "@/components/ui/button";
import {Bell, BellOff} from "lucide-react";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {get_user_notifications} from "@/services/notification-service";


interface NOTIFICATION {
    _id: string,
    body: string,
    viewed: boolean,
}

const TopBar = ({page}: TopBarPropTypes) => {
    const [userId, setUserId] =useState('');
    const [notifications, setNotifications] =useState<NOTIFICATION[]>([])
    const [show, setShow] = useState(false);
    const readNotification =async ({id}: {id: string}) =>{

        try {
            const unread =notifications.filter(notification=> notification._id !== id);
            setNotifications(unread);
            await readNotification({id});
        }catch(e){}
    }
    useEffect(() => {
        (async () =>{
            const session =await getSession();
            // @ts-ignore
            setUserId((session?.user?._id || userId))
        })();
    }, []);

    useEffect(() => {
        const interval =setInterval(async () =>{
            // @ts-ignore
            const unread_notifications = await get_user_notifications(userId);
            setNotifications(unread_notifications)
        }, 5000);
        return () =>{
            if (interval) clearInterval(interval);
        }
    });
  return (
    <section className='shadow px-6 py-3 rounded-md flex justify-between items-center bg-[#ffffffc0] relative'>
        <h3 className='text-xl uppercase font-semibold'>{page}</h3>
        <Button variant ='ghost'  onClick={() =>{setShow(!show)}}><Bell size={24}/><sup className='text-red-500 font-bold block'>{notifications.length}</sup></Button>
        {show &&<ul className={'absolute flex flex-col gap-2 top-[100%] h-[200px] overflow-auto z-10 right-0 w-[300px] rounded-md shadow bg-white p-4'}>
            {notifications.length? notifications.map(({body, viewed, _id}, index) => (
                !viewed &&<li key={index} className='p-2 bg-slate-50 rounded text-muted-foreground cursor-pointer' onClick={() =>readNotification({id: _id})}>{body}</li>
                )) :(<li className='w-full h-full flex items-center justify-center'>
                <div className='text-muted-foreground flex flex-col items-center justify-center gap-2'>
                    <BellOff/>
                    <p className='text-sm'>You are all caught up</p>
                </div>
            </li>)}

        </ul>}
    </section>
  )
}

export default TopBar
