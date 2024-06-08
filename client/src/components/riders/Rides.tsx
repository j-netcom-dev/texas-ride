'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import NO_RIDES from '@/assets/img/no_rides.png';
import {fetch_available_rides, search_rides} from "@/services/rides-service";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";


interface RIDE_TYPE {_id?: string, from?:string, to?:string, time?:string, driver?: Record<string, any>}

const Rides =({title, query}: {title: string, query: {from?:string, to?:string, date?:string, time?:string}}) => {
    const [rides, setRides] =useState<RIDE_TYPE[]>([]);

    useEffect(() => {
        (async () => {
            const available_rides:RIDE_TYPE[] =await fetch_available_rides() as RIDE_TYPE[];
            setRides(available_rides);
        })();
    }, []);

    useEffect(() => {
        (async () =>{
            if(Object.keys(query).length){
                const rides_matched =await search_rides(query) as RIDE_TYPE[];
                setRides(rides_matched);
            }
        })();
    }, [title, query]);

    const convertTime = (datetime: string) => {
        const date = new Date(datetime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    };

    return <div className="flex w-full flex-col gap-4 md:p-4 lg:p-8 rounded-xl shadow-sm md:bg-white">
        <h2 className='uppercase font-bold text-lg md:text-2xl text-[#333]'>{title}</h2>
        {rides.length? (<ul className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8'>
                {rides.map((ride: RIDE_TYPE, index: number) => <li key={index}
                                                                   className='bg-[#ffffff8f] border p-4 rounded-xl flex flex-col gap-3'>
                    <div className="flex gap-3 items-center">
                        <Avatar>
                            <AvatarImage src={ride?.driver?.photo}/>
                            <AvatarFallback>{`${ride?.driver?.first_name.at(0)}${ride?.driver?.last_name.at(0)}`}</AvatarFallback>
                        </Avatar>
                        <div
                            className="uppercase font-semibold">{ride?.driver?.first_name} {ride?.driver?.last_name}</div>
                    </div>
                    <div className="">{ride?.from} - {ride?.to}</div>
                    <div className="text-muted-foreground text-sm">At {convertTime(`${ride?.time}`)}</div>
                    <Button asChild><Link href={`/riders/book-ride/${ride?._id}`}>Book</Link></Button>
                </li>)}
        </ul>): (<div className={'flex flex-col gap-4 justify-center items-center'}>
            <Image src={NO_RIDES} alt={'No Rides'} className="block h-[200px] w-auto" />
            <p className={'text-muted-foreground text-base'}>No rides found</p>
        </div>)
        }

    </div>
}

export default Rides;