'use client';

import DataCard from '@/components/DataCard';
import GridItem from '@/components/GridItem';
import DataTable from '@/components/DataTable';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

import { get_client_rides, update_ride_status } from "@/services/rides-service";
import {getSession} from "next-auth/react";
import {CalendarClock, CarFront, CircleCheckBig, Plus, Star, X} from 'lucide-react';
import {FormEvent, useEffect, useState} from "react";
import Loading from "@/components/Loading";
import {format_time} from "@/utils/format_time";
import {toast} from "sonner";
import Modal from "@/components/Modal";
import {create_ride_review} from "@/services/reviews-service";

const Trips = () => {
    const [rideId, setRideId] = useState<string>();
    const [userid, setUserId] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] =useState<number>(0);
    const [review, setReview] =useState<string>('');
    const [modalOpen, setModalOpen] =useState(false);
    const [newTrip, setNewTrip] =useState<Record<string, any>>({});
    const [trips, setTrips] =useState([]);
    const [total, setTotal] =useState(0);
    const [_new, setNew] =useState(0);
    const [scheduled, setScheduled] =useState(0);
    const [completed, setCompleted] =useState(0);
    const [cancelled, setCancelled] =useState(0);


    useEffect(() => {
        (async () =>{
            const session =await getSession();
            // @ts-ignore
            setUserId(session?.user?._id || '');
            // @ts-ignore
            const entries =await get_client_rides(session?.user?._id || '');
            console.log(entries)
            const data =[...entries].map(entry =>{
                const _id =entry?._id
                const _to =entry?.to;
                const _from =entry?.from;
                const _status =entry?.status;
                const _reviewed =!!entry?.review;
                const _time =format_time(entry?.time);
                const driver_last_name =entry?.driver?.last_name;
                const driver_first_name =entry?.driver?.first_name;
                const _driver = driver_first_name || driver_last_name? `${driver_first_name || ''} ${driver_last_name || ''}`: '-';
                return {_id, from: _from, to: _to, time: _time, driver: _driver, status: _status, reviewed: _reviewed}
            });
            setTotal(data.length)
            // @ts-ignore
            setNew([...data].filter(item =>!item?.status).length);
            setScheduled([...data].filter(item =>item.status && item.status.toLowerCase() =='scheduled').length);
            setCompleted([...data].filter(item =>item.status && item.status.toLowerCase() =='completed').length);
            setCancelled([...data].filter(item =>item.status && item.status.toLowerCase() =='cancelled').length);
            // @ts-ignore
            setTrips(data);
        })();
    }, [newTrip]);
    const updateRideStatus =async (values: {rideId: string, status:string}) =>{
        try {
            const trip =await update_ride_status(values);
            setNewTrip(trip);
            toast.success(`Trip updated successfully`);
        }
        catch(error){
            toast.error(`${error}`);
        }
    }
    const my_rides_actions =[
        {label: 'Review',  action: (id:string) => {
                setRideId(id);
                setModalOpen(true);
            }, condition: ['completed', 'cancelled'], theme: 'bg-green-500'},
        {label: 'Cancel', action: (rideId: string) =>updateRideStatus({rideId, status: 'Cancelled'}), condition: ['', 'scheduled', 'in progress'], theme: 'bg-red-500'},
    ];

    const review_ride =async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(rating <1) return;
        setIsLoading(true);
        try {
            // @ts-ignore
            const newReview =await create_ride_review({rating, review, ride: rideId, customer: userid || ''})
            setNewTrip(newReview);
            toast.success('Thank you for your feedback');
            // @ts-ignore
            e.target.reset(0);
            setRating(0);
            setReview('');
            setModalOpen(false);
        }catch(error){
            toast.error(`${error}`);
        }
        setIsLoading(false)
    }
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-8">
                    <DataCard name='Total' value={total} icon={CarFront}/>
                    <DataCard name='Requested' value={_new} icon={Plus}/>
                    <DataCard name='Scheduled' value={scheduled} icon={CalendarClock}/>
                    <DataCard name='Completed' value={completed} icon={CircleCheckBig}/>
                    <DataCard name='Cancelled' value={cancelled} icon={X}/>
                </div>
                <GridItem title={(trips && trips.length) ? 'My Trips' : ''} title_alignment='left' justify={`${trips.length ? 'justify-start' : 'justify-center'}`}>{(trips && trips.length) ?
                    <DataTable user_role={'CLIENT'} actions={my_rides_actions} trips={trips}/> :
                    <div>No trips yet</div>}</GridItem>
            </div>
            <Modal title={'Ride Review'} open={modalOpen} onClose={() =>setModalOpen(false)}>
                <form className={'flex flex-col gap-8 pt-6'} onSubmit={(e) =>review_ride(e)}>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <label className={'uppercase font-semibold text-[#333]'}>Rating</label>
                        <div className={'flex gap-2 items-center'}>
                            {[...Array(5)].map((_, index) => (
                                <Button key={index} type={'button'} variant={'ghost'}
                                        className={`p-0 m-0 w-max h-max block hover:text-yellow-500 ${index + 1 <= rating ? 'text-yellow-600' : ''}`}
                                        onClick={e => setRating(index + 1)}><Star size={18} key={index}/></Button>
                            ))}
                        </div>
                    </div>
                    <div className={'flex flex-col gap-2 w-full'}>
                        <label className={'uppercase font-semibold text-[#333]'}>Review</label>
                        <textarea className='resize-none border px-6 py-4 rounded-lg' placeholder={'please leave a review'} rows={5} onChange={e =>setReview(e.target.value)}></textarea>
                    </div>
                    {isLoading? <Loading />:<Button>Review</Button>}
                </form>
            </Modal>
        </>
    )
}

export default Trips;
