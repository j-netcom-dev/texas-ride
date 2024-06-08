'use client';

import Link from 'next/link';
import { toast } from "sonner";
import Loading from '../Loading';
import { useForm } from 'react-hook-form';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import CardWrapper from '@/components/auth/card-wrapper';
import { getSession, signIn } from 'next-auth/react';

const LoginForm = () => {
    const router =useRouter();
    const [loading, setLoading] =useState(false)
    const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
    const authenticate =async () =>{
        const session =await getSession();
        if(!session?.user){
            toast.error('Authentication failed');
        }else{
            // @ts-ignore
            const url =`/${session?.user?.role }s`.toLowerCase();
            router.replace(url);
        }
    }
    const save = async ({email, password}: {email?: string, password?: string}) =>{
        setLoading(true);
        try {
            const res =await signIn("credentials",{email, password, redirect: false});
            if (res?.status !=200) {
                toast.error((res?.error || '').toString().toLowerCase());
            }else {
                await authenticate();
                reset()
            }
        } catch (error: unknown) {
            toast.error(`${error}`);
        } finally{ setLoading(false);}
    }

    useEffect(() =>{
        authenticate().then();
    }, []);
    return (
        <CardWrapper title='Login'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='email' type='email' validations={{required: {value: true, message: 'Email required*'}}} label='Email' errors={errors} register={register} placehoder='Enter email'/>
                {!loading &&<div className="w-full flex justify-end"><Link className='block text-sm text-[#333] transition border-b border-b-transparent hover:border-b-black' href={'/auth/forgot-password'}>Forgot password?</Link></div>}
                <FormInput name='password' type='password' validations={{required: {value: true, message: 'Password required*'}}} label='Password' errors={errors} register={register} placehoder='Enter password'/>
                {loading? <div className="w-full flex justify-end items-center py-3"><Loading /></div>: <div className="flex items-center justify-between">
                    <div className="w-full flex items-center gap-1">
                        <span>New here? </span>
                        <Button  variant="link" className="font-normal items-center justify-start p-0" size="sm" asChild><Link href={'/auth/register'}>Register now</Link></Button>
                    </div>
                    <Button className='flex gap-1 items-center'>Login</Button>
                </div>}
            </form>            
        </CardWrapper>
    );
}

export default LoginForm;