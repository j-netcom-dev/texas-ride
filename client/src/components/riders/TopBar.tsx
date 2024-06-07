'use client';

import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getSession} from "next-auth/react";
import {get_user_by_id} from "@/services/user-service";

export const TopBar =() =>{
    const [image, setImage] =useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        (async () =>{
            const session =await getSession();
            // @ts-ignore
            const user =await get_user_by_id(session?.user._id);
            setName(user.first_name.at(0) +user.last_name.at(0));
            setImage(user?.user?.image);
        })();
    }, []);
    return <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
}