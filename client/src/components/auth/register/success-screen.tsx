import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const Success = () => {
  return (
    <div className="bg-white px-8 py-16 relative w-[400px] max-w-full flex flex-col gap-8 items-center shadow rounded-xl">
        <div className="w-[75px] h-[75px] bg-green-400 rounded-full flex text-white items-center justify-center"><Check size={48}/></div>
        <h2 className='uppercase font-bold text-xl'>Thank you!</h2>
        <p className='text-center'>Your account was created successfully. Please check your email <b>me***@gmail.com</b> for further instructions.</p>
        <Button className='block w-full text-center' asChild><Link href={'/auth/login'}>Okay</Link></Button>
    </div>
  )
}

export default Success;
