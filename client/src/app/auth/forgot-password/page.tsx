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
        <CardWrapper title='Password reset'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='email' type='email' validations={{required: {value: true, message: 'Email required*'}}} label='Email' errors={errors} register={register} placehoder='Enter email'/>
                <Button className='flex gap-1 items-center'>Request reset</Button>
            </form>            
        </CardWrapper>
    );
}

export default LoginForm;