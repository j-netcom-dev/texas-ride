'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import CardWrapper from '@/components/auth/card-wrapper';



const LoginForm = () => {
    const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
    const save = () =>{
      reset();
    }
    
    return (
        <CardWrapper title='Login'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='email' type='email' validations={{required: {value: true, message: 'Email required*'}}} label='Email' errors={errors} register={register} placehoder='Enter email'/>
                <div className="w-full flex justify-end"><Link className='block text-sm text-[#333] transition border-b border-b-transparent hover:border-b-black' href={'/auth/forgot-password'}>Forgot password?</Link></div>
                <FormInput name='password' type='password' validations={{required: {value: true, message: 'Password required*'}}} label='Password' errors={errors} register={register} placehoder='Enter password'/>
                <div className="flex items-center justify-between">
                    <div className="w-full flex items-center gap-1">
                        <span>New here? </span>
                        <Button  variant="link" className="font-normal items-center justify-start p-0" size="sm" asChild><Link href={'/auth/register'}>Register now</Link></Button>
                    </div>
                    <Button className='flex gap-1 items-center'>Login</Button>
                </div>
            </form>            
        </CardWrapper>
    );
}

export default LoginForm;