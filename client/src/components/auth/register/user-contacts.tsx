'use client';
import React, { useEffect } from 'react';
import CardWrapper from '../card-wrapper';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import { get_user_details, save_user_data } from '@/utils/storage';
import { UserData } from '@/utils/types';

interface formPropTypes {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}

const UserContact = ({step, setStep}: formPropTypes) => {
    const {handleSubmit, reset, register, formState: {errors}, setValue} =useForm();
    useEffect(() =>{
        const user_details =get_user_details(step) as UserData || undefined;
        if(!user_details) return;
        [...Object.keys(user_details.data)].forEach(key =>setValue(key, user_details.data[key]))
    }, [step, setValue]);

    const save = (data: any) =>{
        save_user_data({step, data});
        reset();
        setStep(step +1);
    }
    
    return (
        <CardWrapper title='Contact details'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='email' validations={{required: {value: true, message: 'Email required*'}, pattern: { value: /^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' }}} label='Email address' errors={errors} register={register} placehoder='Enter your email'/>
                <FormInput name='phone' validations={{required: {value: true, message: 'Phone number required*'}, pattern: { value:  /^\+[0-9]{1,3}\-[0-9]{9}$/, message: 'Invalid phone number. Example: +1-123456789' }}} label='Phone number' errors={errors} register={register} placehoder='Enter your phone number'/>
                <div className="flex items-center justify-between">
                    <Button className='flex gap-1 items-center text-sm' type='button' variant={'ghost'} onClick={() =>setStep(step -1)}>&larr; Back</Button>
                    <Button className='flex gap-1 items-center'>Next &rarr;</Button>
                </div>
            </form>            
        </CardWrapper>
    )

}

export default UserContact;