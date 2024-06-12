'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react'
import TopBar from '@/components/TopBar';
import { useForm } from 'react-hook-form';
import DataCard from '@/components/DataCard';
import GridItem from '@/components/GridItem';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import { Axe, Barcode, Component, Palette } from 'lucide-react';
import {getSession} from "next-auth/react";
import {create_vehicle, get_driver_vehicle} from "@/services/car-service";
import Loading from "@/components/Loading";
import {toast} from "sonner";

const MyCar = () => {
  const [userSession, setUserSession] =useState<any>({})
  const [isLoading, setIsLoading] =useState(false);
  const [carDetails, setCarDetails] =useState<Record<string, any>>()
  useEffect(() => {
    (async () =>{
      const session =await getSession();
      setUserSession(session);
      // @ts-ignore
      const myCar =await get_driver_vehicle(session.user?._id) as Record<string, any>;
      setCarDetails(myCar);
    })();
  }, [carDetails]);
  const save =async (values: Record<string, any>) =>{
    setIsLoading(true);
    try {
        // @ts-ignore
      const {_id } =await create_vehicle({...values, driver: userSession.user?._id, _id: carDetails?._id});
        setCarDetails({...carDetails, ...values, _id})
        reset();
        toast.success(`Vehicle details saved successfully`);
      }
      catch (error){
        // @ts-ignore
        toast.error(error);
      }
    setIsLoading(false);
  }
  const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
  return (
    <main className='grid grid-rows-[max-content_auto] p-4 gap-8 bg-[#dcdee0bb]'>
      <TopBar page='My Car'/>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-8">
          <DataCard name='Licence plate' value={carDetails?.plate || '-'} icon={Barcode}/>
          <DataCard name='Model' value={carDetails?.model || '-'} icon={Component}/>
          <DataCard name='Make' value={carDetails?.make || '-'} icon={Axe}/>
          <DataCard name='Color' value={carDetails?.color || '-'} icon={Palette}/>
        </div>
        <div className="grid xl:grid-cols-2 w-full gap-10">
          <GridItem title='Car Images'><Image src={carDetails?.image || ''} alt='car'/></GridItem>
          <GridItem title={carDetails?._id?'Update vehicle details': 'Vehicle Registration'}>
          <form className="flex flex-col gap-4 w-full overflow-y-auto px-4" onSubmit={handleSubmit(save)}>
            <FormInput name='plate' validations={{required: {value: true, message: 'Licence plate number required'}}} label='Licence plate' errors={errors} register={register} placehoder={carDetails?.plate || 'Enter vehicle plate number'}/>
            <FormInput name='model' validations={{required: {value: true, message: 'Car model required*'}}} label='Model' errors={errors} register={register} placehoder={carDetails?.model || 'Enter vehicle model'}/>
            <FormInput name='make' validations={{required: {value: true, message: 'Car make required*'}}} label='Make' errors={errors} register={register} placehoder={carDetails?.make ||'Enter vehicle make'}/>
            <FormInput name='color' validations={{required: {value: true, message: 'Car color required*'}}} label='Color' errors={errors} register={register} placehoder={carDetails?.color || 'Enter vehicle color'}/>
            <div className="">
              {isLoading? <Loading />: <Button>{carDetails?._id?'Update': 'Register'}</Button>}
            </div>
          </form>    
          </GridItem>
        </div>
      </div>
    </main>
  )
}

export default MyCar;
