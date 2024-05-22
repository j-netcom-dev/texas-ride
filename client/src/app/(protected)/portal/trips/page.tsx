'use client';

import TopBar from '@/components/TopBar';
import DataCard from '@/components/DataCard';
import GridItem from '@/components/GridItem';
import DataTable from '@/components/DataTable';
import { CalendarClock, CarFront, CircleCheckBig, Plus, X } from 'lucide-react';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

const page = () => {
  const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
  const create =() =>{

  }
  return (
    <main className='grid grid-rows-[max-content_auto] p-4 gap-8 bg-[#dcdee0bb]'>
      <TopBar page='Trips'/>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full gap-8">
          <DataCard name='Total' value={20} icon={CarFront}/>
          <DataCard name='New' value={2} icon={Plus}/>
          <DataCard name='Scheduled' value={2} icon={CalendarClock}/>
          <DataCard name='Completed' value={20} icon={CircleCheckBig}/>
          <DataCard name='Cancelled' value={20} icon={X}/>
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
              <Button>Create</Button>
            </div>
          </form>
        </GridItem>
        <GridItem title='My Trips' title_alignment='left'><DataTable /></GridItem>
      </div>
    </main>
  )
}

export default page;
