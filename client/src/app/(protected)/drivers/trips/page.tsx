'use client';

import TopBar from '@/components/TopBar';
import DataCard from '@/components/DataCard';
import GridItem from '@/components/GridItem';
import DataTable from '@/components/DataTable';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {create_ride, fetch_requested_rides, get_driver_rides} from "@/services/rides-service";
import {getSession} from "next-auth/react";
import { CalendarClock, CarFront, CircleCheckBig, Plus, X } from 'lucide-react';
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";

const Trips = () => {
  const [requested, setRequested] =useState([]);
  const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
  const [isLoading, setIsLoading] =useState(false);
  const [newTrip, setNewTrip] =useState<Record<string, any>>({});
  const [trips, setTrips] =useState([]);
  const [total, setTotal] =useState(0);
  const [_new, setNew] =useState(0);
  const [scheduled, setScheduled] =useState(0);
  const [completed, setCompleted] =useState(0);
  const [cancelled, setCancelled] =useState(0);

  const create =async (values: any) =>{
    setIsLoading(true)
    try {
      const session =await getSession();
      // @ts-ignore
      const result =await create_ride({...values, driver: session?.user?._id}) as Record<string, any>;
      setNewTrip(result);
      reset();
    }catch(error){

    }
    setIsLoading(false);
  }
  useEffect(() => {
    (async () =>{
      const session =await getSession();
      // @ts-ignore
      const entries =await get_driver_rides(session?.user?._id || '');
      const ride_requests =await fetch_requested_rides();
      const data =[...entries].map(entry =>{
        const _from =entry?.from;
        const _to =entry?.to;
        const _time =entry?.time;
        const customer_first_name =entry?.customer?.first_name;
        const customer_last_name =entry?.customer?.last_name;
        const _customer = customer_first_name || customer_last_name? `${customer_first_name || ''} ${customer_last_name || ''}`: '-';
        const _status =entry?.status;
        return {from: _from, to: _to, time: _time, customer: _customer, status: _status}
      });
      const requested_customer_rides =[...ride_requests].map(entry =>{
        const _from =entry?.from;
        const _to =entry?.to;
        const _time =entry?.time;
        const customer_first_name =entry?.customer?.first_name;
        const customer_last_name =entry?.customer?.last_name;
        const _customer = customer_first_name || customer_last_name? `${customer_first_name || ''} ${customer_last_name || ''}`: '-';
        const _status =entry?.status;
        return {from: _from, to: _to, time: _time, customer: _customer, status: _status}
      });
      // @ts-ignore
      setRequested(requested_customer_rides)
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

  return (
    <main className='grid grid-rows-[max-content_auto] p-4 gap-8 bg-[#dcdee0bb]'>
      <TopBar page='Trips'/>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-8">
          <DataCard name='Total' value={total} icon={CarFront}/>
          <DataCard name='New' value={_new} icon={Plus}/>
          <DataCard name='Scheduled' value={scheduled} icon={CalendarClock}/>
          <DataCard name='Completed' value={completed} icon={CircleCheckBig}/>
          <DataCard name='Cancelled' value={cancelled} icon={X}/>
        </div>
        <GridItem title='Schedule a trip' title_alignment='left'>
          <form className="flex flex-col gap-4 w-full overflow-y-auto px-4" onSubmit={handleSubmit(create)}>
            <FormInput name='from' validations={{required: {value: true, message: 'Licence plate number required'}}} label='From' errors={errors} register={register} placehoder='Enter pick up address'/>
            <FormInput name='to' validations={{required: {value: true, message: 'Car model required*'}}} label='To' errors={errors} register={register} placehoder='Enter drop off address'/>
            <div className="flex flex-col md:flex-row gap-8">
              <FormInput name='date' type='date' validations={{required: {value: true, message: 'Date required*'}}} label='Date' errors={errors} register={register}/>
              <FormInput name='time' type='time' validations={{required: {value: true, message: 'Time required*'}}} label='Time' errors={errors} register={register}/>
            </div>

            <div className="">
              {isLoading? <Loading />: <Button>Create</Button>}
            </div>
          </form>
        </GridItem>
        <GridItem title={(requested && requested.length)? 'Ride Requests': ''} title_alignment='left' justify={`${requested.length?'justify-start': 'justify-center'}`}>
          {(requested && requested.length)? <DataTable trips ={requested}/>:<div>No ride requests yet</div>}
        </GridItem>
        <GridItem title={(trips && trips.length)? 'My Trips': ''} title_alignment='left' justify={`${trips.length?'justify-start': 'justify-center'}`}>{(trips && trips.length)? <DataTable trips ={trips}/>:<div>No trips yet</div>}</GridItem>
      </div>
    </main>
  )
}

export default Trips;
