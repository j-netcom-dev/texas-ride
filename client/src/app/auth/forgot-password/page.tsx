'use client';

import {toast} from "sonner";
import {useState} from "react";
import { useForm } from 'react-hook-form';
import Loading from "@/components/Loading";
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import CardWrapper from '@/components/auth/card-wrapper';
import {get_user_by_email} from "@/services/user-service";
import {useRouter} from "next/navigation";

const ForgotPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {handleSubmit, reset, register, formState: {errors}, } =useForm({});
    const send_password_reset_request = async ({email}: {email?:string}) =>{
        setIsLoading(true);
        try{
            const result =await get_user_by_email({email: email || ''});
            console.log(result)
            if(!result || !result.active || !result.access_allowed) toast.error('email not associated with any account');
            else{
                reset();
                toast.success("Account verification successful.");
                router.replace(`/auth/change-password/${result?._id}?authuser=0`);
            }

        }
        catch(error){
            // @ts-ignore
            toast.error(error || 'An exception occurred');
        }
        setIsLoading(false);
    }
    
    return (
        <CardWrapper title='Password reset'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(send_password_reset_request)}>
                <FormInput name='email' type='email' validations={{required: {value: true, message: 'Email required*'}}} label='Email' errors={errors} register={register} placehoder='Enter email'/>
                {isLoading? <Loading text={'verifying...'} /> :<Button className='flex gap-1 items-center'>Request reset</Button>}
            </form>            
        </CardWrapper>
    );
}

export default ForgotPassword;