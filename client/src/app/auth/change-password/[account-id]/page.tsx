'use client'


import { toast } from "sonner";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import CardWrapper from "@/components/auth/card-wrapper";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import { change_password } from "@/services/user-service";


const ChangePassword = () => {
    const params = useParams();
    const q =useSearchParams();
    const router =useRouter();
    const [loading, setLoading] =useState(false)
    const {handleSubmit, reset, register, watch, formState: {errors}} =useForm();
    let password =watch('password');
    const authuser =q.get('authuser')
    const save = async (values: any) =>{
        setLoading(true);
        try {
            console.log(q)
            const userId =params['account-id'];
            await change_password({userId: `${userId}`, password: values.password});
            reset();
            toast.success('Password changed successfully.');
            router.replace('/auth/login');
        }
        catch (error: unknown) {
            toast.error(`${error}`);
        }
        finally{ setLoading(false); }
    }

    return (
        <CardWrapper title='Change password'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                {authuser !=='0' &&<FormInput name='current' type='password'
                            validations={{required: {value: true, message: 'Password required*'}}}
                            label='Current password' errors={errors} register={register}
                            placehoder='Enter current password'/>}
                <FormInput name='password' type='password' validations={{required: {value: true, message: 'Password required*'}, pattern: {value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])[a-zA-Z0-9\W]{8,}$/, message: 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character'}}} label='Password' errors={errors} register={register} placehoder='New password'/>
                <FormInput name='confirm' type='password' validations={{validate: (value:string) => value ==password || 'Passwords do not match'}} label='Confirm' errors={errors} register={register} placehoder='Confirm password'/>
                <div className="flex items-center justify-between">
                    {loading?<div className="w-full flex justify-end items-center py-3"><Loading /></div>: <>
                        <Button className='flex gap-1 items-center'>Save</Button>
                    </>}
                </div>
            </form>
        </CardWrapper>
    )

}

export default ChangePassword;