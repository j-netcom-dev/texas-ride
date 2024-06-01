'use client';

import Link from 'next/link';
import { PartyPopper, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { destroy_user_details, get_user_details } from '@/utils/storage';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';
import { verify_token } from '@/services/verify-token';

const Success = () => {
  const params = useParams();
  const [email, setEmail] =useState<string>('');
  const [errorMessage, setErrorMessage] =useState('');
  const [isValidating, setIsValidating] =useState(true);
  useEffect(() => {
    try {
        const userId =params['user-id'];
        const token =params['verification-token'];
        (async () =>{
          if(token) {
            const result =await verify_token({token: `${token}`, userId: `${userId}`});
            if(result?.error) setErrorMessage(result?.error);
          }
        })();
        setIsValidating(false)
    } catch (error) {
      setErrorMessage(`${error}`)
    }
   setIsValidating(false)
    
  }, [params]);


  return isValidating? <Loading text='Verifying token...' />: (
    <div className="bg-white px-8 py-16 relative w-[400px] max-w-full flex flex-col gap-8 items-center shadow rounded-xl">
        <div className={`w-[75px] h-[75px] ${errorMessage? 'bg-red-400': 'bg-green-400'} rounded-full flex text-white items-center justify-center`}>{errorMessage? <X size={48}/> :<PartyPopper size={48}/>}</div>
        <h2 className='uppercase font-bold text-xl'>{errorMessage? 'Error': 'Welcome!'}</h2>
        <p className='text-center'>{errorMessage? errorMessage:'Your email was successfully verified you can now login into your account to enjoy using our services.'}</p>
        {!errorMessage &&<Button className='block w-full text-center' asChild><Link href={'/auth/login'}>Login</Link></Button>}
    </div>
  )
}

export default Success;
