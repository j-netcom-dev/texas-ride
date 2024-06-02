'use client'

import { toast } from "sonner";
import CardWrapper from '../card-wrapper';
import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import { create_user } from '@/services/user-service';
import { UserData, UserDetailsType } from '@/utils/types';
import { get_user_details, save_user_data } from '@/utils/storage';
import { verifyEmail } from "@/services/email-verification-service";

interface formPropTypes {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}

const UserPasswordForm = ({step, setStep}: formPropTypes) => {
    const [loading, setLoading] =useState(false)
    const {handleSubmit, reset, register, watch, formState: {errors}, setValue} =useForm();
    let password =watch('password');
    useEffect(() =>{
        const user_details =get_user_details(step) as UserData || undefined;
        if(!user_details) return;
        [...Object.keys(user_details.data)].forEach(key =>setValue(key, user_details.data[key]))
    }, [step, setValue]);

    const save = async (values: any) =>{
        setLoading(true);
        save_user_data({step, data: {password: values.password}});
        let details:UserDetailsType ={};
        (get_user_details() as UserData[]).forEach(({data}) =>details ={...details, ...data});
        try { 
            const { _id } =await create_user(details); 
            await verifyEmail({to: details.email || '', name: `${details.first_name} ${details.last_name}`, _id});
            reset();
            setStep(step +1);
        } 
        catch (error: unknown) {
            toast.error(`${error}`);
            
        } 
        finally{ setLoading(false); }
    }
    
    return (
        <CardWrapper title='Create password'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='password' type='password' validations={{required: {value: true, message: 'Password required*'}, pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])[a-zA-Z0-9\W]{8,}$/, message: 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character'}}} label='Password' errors={errors} register={register} placehoder='New password'/>
                <FormInput name='confirm' type='password' validations={{validate: (value:string) => value ==password || 'Passwords do not match'}} label='Confirm' errors={errors} register={register} placehoder='Confirm password'/>
                <div className="flex items-center justify-between">
                    {loading?<div className="w-full flex justify-end items-center py-3"><Loading /></div>: <>
                        <Button className='flex gap-1 items-center text-sm' type='button' variant={'ghost'} onClick={() =>setStep(step -1)}>&larr; Back</Button>
                        <Button className='flex gap-1 items-center'>Submit</Button>
                    </>}
                </div>
                    
            </form>            
        </CardWrapper>
    )

}

export default UserPasswordForm;