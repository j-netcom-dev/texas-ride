'use client';

import Link from 'next/link';
import { toast } from "sonner";
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import CardWrapper from '@/components/auth/card-wrapper';
import { auth_user } from '@/services/user-service';



const LoginForm = () => {
    const [loading, setLoading] =useState(false)
    const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
    const save = async ({email, password}: {email?: string, password?: string}) =>{
        setLoading(true);
        try {
            await auth_user({email: email || '', password: password|| ''});
            
        } catch (error: unknown) {
            toast.error(`${error}`);
        }finally{ setLoading(false);}
    }
    
    useEffect(() =>{
        (async () =>{
            
        })();
    },[])
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