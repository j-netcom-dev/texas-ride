'use client';

import TopBar from '@/components/TopBar';
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import GridItem from '@/components/GridItem';
import DataCard from '@/components/DataCard';
import DataTable from '@/components/DataTable';
import {get_driver_rides} from "@/services/rides-service";
import BarChartComponent from "@/components/charts/BarChart";
import { Boxes, CarFront, CircleCheckBig, Star } from 'lucide-react';
import {format_time} from "@/utils/format_time";

const Dashboard = () => {
  const [clientRating, setClientRating] =useState(0.0)
  const [completed, setCompleted] =useState(0)
  const [trips, setTrips] =useState([]);
  const [dailyRides, setDailyRides] =useState([]);

  useEffect(() => {
    (async () => {
      let session = await getSession();
      // @ts-ignore
      const driver_trips = await get_driver_rides(session?.user?._id || '');
      const data = [...driver_trips].map(entry => {
        const _from = entry?.from;
        const _to = entry?.to;
        const _time = format_time(entry?.time);
        const customer_first_name =entry?.customer?.first_name;
        const customer_last_name =entry?.customer?.last_name;
        const _customer = customer_first_name || customer_last_name? `${customer_first_name || ''} ${customer_last_name || ''}`: '-';
        const _rating =entry?.reviews? entry?.reviews.rating || 0: 0;
        const _status = entry?.status;
        return {from: _from, to: _to, time: _time, customer: _customer, status: _status, rating: _rating}
      });

      // @ts-ignore
      setTrips([...data]);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dailyStats: Record<string, number> ={Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0};
      [...data.filter(item => item.status && item.status.toLowerCase() =='completed')].forEach(item =>{
        const date =new Date(item?.time);
        const day =dayNames[date.getDay()];
        // @ts-ignore
        dailyStats[day]  +=1;

      });
      // @ts-ignore
      const ratings =data.filter(item =>item.rating).map(item =>item.rating)
      // @ts-ignore
      setClientRating(ratings?.length? Number(ratings.reduce((accum, prev) =>accum +prev, 0) /ratings.length).toFixed(1): 0);
      const dailyRidesStats =[...Object.keys(dailyStats)].map(key =>{
        return {name: key, rides: dailyStats[key]}
      })
      // @ts-ignore
      setDailyRides(dailyRidesStats)
      setCompleted([...data].filter(item =>item?.status =='Completed').length);
    })();
  }, []);
  return (
    <main className='grid grid-rows-[max-content_auto] p-4 gap-8 bg-[#dcdee0bb]'>

      <TopBar page='Dashboard'/>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-8">
          <DataCard name='Completed Rides' value={completed} icon={CarFront}/>
          <DataCard name='Client Rating' value={clientRating} icon={Star}/>
          <DataCard name='Customer Satisfaction' value={`${(clientRating /5) *100}%`} icon={CircleCheckBig}/>
          <DataCard name='Driver Rank' value={'-'} icon={Boxes}/>
        </div>
        <div className="grid xl:grid-cols-2 w-full gap-10">
          <GridItem title='Rides on each week day'><BarChartComponent data={dailyRides} /></GridItem>
          <GridItem title={(trips && trips.length)? 'Recent Trips': ''} justify={`${trips.length?'justify-start': 'justify-center'}`}>{(trips && trips.length)? <DataTable trips ={trips.slice(0, 5)}/>:<div>No trips yet</div>}</GridItem>
        </div>
      </div>
    </main>
  )
}

export default Dashboard;
