'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { PartyPopper, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verify_token } from '@/services/verify-token';

const VerifyEmail = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] =useState('');
  const [isValidating, setIsValidating] =useState(true);
  useEffect(() => {
    try {
        const userId =router.query['user-id'];
        const token =router.query['verification-token'];
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
    
  }, [router]);


  return isValidating? <Loading text='Verifying token...' />: (
    <div className="bg-white px-8 py-16 relative w-[400px] max-w-full flex flex-col gap-8 items-center shadow rounded-xl">
        <div className={`w-[75px] h-[75px] ${errorMessage? 'bg-red-400': 'bg-green-400'} rounded-full flex text-white items-center justify-center`}>{errorMessage? <X size={48}/> :<PartyPopper size={48}/>}</div>
        <h2 className='uppercase font-bold text-xl'>{errorMessage? 'Error': 'Welcome!'}</h2>
        <p className='text-center'>{errorMessage? errorMessage:'Your email was successfully verified you can now login into your account to enjoy using our services.'}</p>
        {!errorMessage &&<Button className='block w-full text-center' asChild><Link href={'/auth/login'}>Login</Link></Button>}
    </div>
  )
}

export default VerifyEmail;

// for static export
// export async function generateStaticParams() {
//   const response = await fetch(`/api/verification-params`);
//   const data = await response.json();

//   return data.map(({ token, userId }:{ token: string, userId: string}) => ({
//     params: { 'verification-token': token, 'user-id': userId },
//   }));
// }