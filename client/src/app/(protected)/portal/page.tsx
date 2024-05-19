'use client';

import TopBar from '@/components/TopBar';
import DataCard from '@/components/DataCard';
import { Boxes, CarFront, CircleCheckBig, Star } from 'lucide-react';
import AreaChart from '@/components/charts/BarChart';
import GridItem from '@/components/GridItem';
import DataTable from '@/components/DataTable';

const page = () => {
  return (
    <main className='grid grid-rows-[max-content_auto] p-4 gap-8 bg-[#dcdee0bb]'>
      <TopBar page='Dashboard'/>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-8">
          <DataCard name='Rides' value={20} icon={CarFront}/>
          <DataCard name='Reviews' value={4.6} icon={Star}/>
          <DataCard name='Complete' value={20} icon={CircleCheckBig}/>
          <DataCard name='Rank' value={2} icon={Boxes}/>
        </div>
        <div className="grid xl:grid-cols-2 w-full gap-10 max-w-[1400px]">
          <GridItem title='Rides on each week day'><AreaChart /></GridItem>
          <GridItem title='Recent Trips'><DataTable /></GridItem>
        </div>
      </div>
    </main>
  )
}

export default page;
