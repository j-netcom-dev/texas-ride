'use client';

import Image from 'next/image';
import TopBar from '@/components/TopBar';
import { useForm } from 'react-hook-form';
import DataCard from '@/components/DataCard';
import GridItem from '@/components/GridItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Axe, Barcode, Component, Palette } from 'lucide-react';
import FormInput from '@/components/form-input';

const page = () => {
  const save =(values: Record<string, any>) =>{

  }
  const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
  return (
    <main className='grid grid-rows-[max-content_auto] p-4 gap-8 bg-[#dcdee0bb]'>
      <TopBar page='My Car'/>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-8">
          <DataCard name='Licence plate' value={'KBJ 645G'} icon={Barcode}/>
          <DataCard name='Model' value={'SUV'} icon={Component}/>
          <DataCard name='Make' value={'Honda'} icon={Axe}/>
          <DataCard name='Color' value={'White'} icon={Palette}/>
        </div>
        <div className="grid xl:grid-cols-2 w-full gap-10">
          <GridItem title='Car Images'><Image src={''} alt='car'/></GridItem>
          <GridItem title='Update car details'>
          <form className="flex flex-col gap-4 w-full overflow-y-auto px-4" onSubmit={handleSubmit(save)}>
            <FormInput name='licenseplate' validations={{required: {value: true, message: 'Licence plate number required'}}} label='Licence plate' errors={errors} register={register} placehoder='Enter car plate number'/>
            <FormInput name='model' validations={{required: {value: true, message: 'Car model required*'}}} label='Model' errors={errors} register={register} placehoder='Enter car model'/>
            <FormInput name='make' validations={{required: {value: true, message: 'Car make required*'}}} label='Make' errors={errors} register={register} placehoder='Enter car make'/>
            <FormInput name='color' validations={{required: {value: true, message: 'Car color required*'}}} label='Color' errors={errors} register={register} placehoder='Enter car make'/>
            <div className="">
              <Button>Update</Button>
            </div>
          </form>    
          </GridItem>
        </div>
      </div>
    </main>
  )
}

export default page;
