'use client';

import {useState} from "react";
import { Star } from 'lucide-react';
import STARS from '@/assets/img/reviews.png';
import Image from "next/image";
import {Button} from "@/components/ui/button";


interface REVIEW {name:string, rating:number, review: string};

const BookRide =() =>{
    const [driver, setDriver] =useState<{first_name?:string, last_name?:string, photo?:string}>({});
    const [trip, setTrip] =useState<{from?:string, to?:string, time?:string}>({})
    const [reviews, setReviews]=useState<REVIEW[]>([]);

    return <div className={'h-full flex flex-col gap-8'}>

        <div className={'bg-white p-4 rounded shadow flex flex-col'}>
            <p className={'text-xs text-muted-foreground'}>Dep: {trip.time}</p>
            <h3 className={'font-semibold text-lg'}>{trip.from} - {trip.to}</h3>

        <div className={'flex flex-col gap-4 w-max pt-8'}>
            <div className={'flex items-end gap-4'}>
                <div className={'w-[100px] h-[100px] rounded bg-slate-100'}></div>
                <p className={'flex gap-1'}>{reviews.length? [...Array(Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length))].map((rt) => (
                    <Star size={18} className={'text-yellow-500'} key={rt}/>)) : <span>No rating</span>}</p>
                <h3 className={'font-semibold text-lg'}>{driver?.first_name} {driver?.last_name}</h3>
            </div>
            <Button>Book</Button>

        </div>
        </div>
        <div className={'bg-white shadow rounded-lg flex flex-col p-8 gap-8'}>
            <h2 className={'uppercase text-xl font-semibold'}>Reviews</h2>
            {reviews.length ? (<ul className={'flex flex-col gap-8'}>
            </ul>) : (<div className={'flex justify-center items-center flex-col gap-8'}>
                <Image src={STARS} alt={'ratings'} className={'h-[250px] w-auto block'}/>
                <span className={'text-muted-foreground'}>No reviews yet</span>
            </div>)}
        </div>
    </div>;
}


export default BookRide;