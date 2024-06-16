'use client';

import TopBar from '@/components/TopBar';
import DataCard from '@/components/DataCard';
import GridItem from '@/components/GridItem';
import DataTable from '@/components/DataTable';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
    create_ride,
    fetch_requested_rides,
    get_client_rides,
    get_driver_rides,
    update_ride_status
} from "@/services/rides-service";
import {getSession} from "next-auth/react";
import { CalendarClock, CarFront, CircleCheckBig, Plus, X } from 'lucide-react';
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";
import {format_time} from "@/utils/format_time";
import {toast} from "sonner";

const Trips = () => {

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
            const entries =await get_client_rides(session?.user?._id || '')
            console.log(session)
            const data =[...entries].map(entry =>{
                const _id =entry?._id
                const _to =entry?.to;
                const _from =entry?.from;
                const _status =entry?.status;
                const _time =format_time(entry?.time);
                const driver_last_name =entry?.driver?.last_name;
                const driver_first_name =entry?.driver?.first_name;
                const _driver = driver_first_name || driver_last_name? `${driver_first_name || ''} ${driver_last_name || ''}`: '-';
                return {_id, from: _from, to: _to, time: _time, driver: _driver, status: _status}
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
        {label: 'Review',  action: () =>{}, condition: ['completed'], theme: 'bg-green-500'},
        {label: 'Cancel', action: (rideId: string) =>updateRideStatus({rideId, status: 'Cancelled'}), condition: ['', 'scheduled', 'in progress'], theme: 'bg-red-500'},
    ];


    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-8">
                <DataCard name='Total' value={total} icon={CarFront}/>
                <DataCard name='Requested' value={_new} icon={Plus}/>
                <DataCard name='Scheduled' value={scheduled} icon={CalendarClock}/>
                <DataCard name='Completed' value={completed} icon={CircleCheckBig}/>
                <DataCard name='Cancelled' value={cancelled} icon={X}/>
            </div>
            <GridItem title={(trips && trips.length) ? 'My Trips' : ''} title_alignment='left'
                      justify={`${trips.length ? 'justify-start' : 'justify-center'}`}>{(trips && trips.length) ?
                <DataTable user_role={'CLIENT'} actions={my_rides_actions} trips={trips}/> : <div>No trips yet</div>}</GridItem>
        </div>
    )
}

export default Trips;
