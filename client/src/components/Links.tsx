'use client';

import Link from "next/link";
import { signOut } from 'next-auth/react';
import {Button} from "@/components/ui/button";
import {CarFront, MessageCircle} from "lucide-react";


const Links =() =>{
    return <ul className={'flex items-center gap-4'}>
        <li title={'Trips'}><Link href={'/riders/my-trips'} className={'h-[30px] w-[30px] hover:bg-[#f1f1f1] flex items-center justify-center rounded-full '}><CarFront size={22}/></Link></li>
        <li title={'Chat'}><Link href={'/riders/chat'} className={'h-[30px] w-[30px] hover:bg-[#f1f1f1] flex items-center justify-center rounded-full'}><MessageCircle size={18}/></Link></li>
        <li title={'Logout'}><Button variant={'ghost'} onClick={signOut}>Logout</Button></li>
    </ul>
}

export default Links;