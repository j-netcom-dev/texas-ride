'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { UserData } from '@/utils/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { destroy_user_details, get_user_details } from '@/utils/storage';

const Success = () => {
  const [email, setEmail] =useState<string>('');
  useEffect(() =>{
    const data =get_user_details(2) as UserData;
    if(!data) return;
    
    if(data.data.email) {
      setEmail((data.data.email || '').toString());
      destroy_user_details();
    }
}, []);

  return (
    <div className="bg-white  px-3 md:px-8 py-4 md:py-16 relative w-[400px] max-w-full flex flex-col gap-8 items-center shadow rounded-xl">
        <div className="w-[75px] h-[75px] bg-green-400 rounded-full flex text-white items-center justify-center"><Check size={48}/></div>
        <h2 className='uppercase font-bold text-xl'>Thank you!</h2>
        <p className='text-center'>Your account was created successfully. Please check your email <b>{email}</b> within 24hrs for further instructions.</p>
        <Button className='block w-full text-center' asChild><Link href={'/auth/login'}>Okay</Link></Button>
    </div>
  )
}

export default Success;
