import React, { useEffect } from 'react';
import Link from 'next/link';
import CardWrapper from '../card-wrapper';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';
import { UserData, UserNameType } from '@/utils/types';
import { get_user_details, save_user_data } from '@/utils/storage';

interface formPropTypes {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}



const UserName = ({step, setStep}: formPropTypes) => {
    const {handleSubmit, reset, register, formState: {errors}, setValue} =useForm();
    useEffect(() =>{
        const user_details =get_user_details(step) as UserData || undefined;
        if(!user_details) return;
        [...Object.keys(user_details.data)].forEach(key =>setValue(key, user_details.data[key]))
    }, [step]);

    const save = (data: any) =>{
        save_user_data({step, data});
        reset();
        setStep(step +1);
    }
    
    return (
        <CardWrapper title='Name'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='first_name' validations={{required: {value: true, message: 'First name required*'}}} label='First name' errors={errors} register={register} placehoder='Enter your first name'/>
                <FormInput name='last_name' validations={{required: {value: true, message: 'Last name required*'}}} label='Last name' errors={errors} register={register} placehoder='Enter your sur name'/>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <Button onClick={() =>setStep(step -1)} type='button' variant={'ghost'} className='flex gap-1 items-center'>&larr; Back</Button>
                        <Button className='flex gap-1 items-center'>Next &rarr;</Button>
                    </div>
                    <div className="w-full flex items-center gap-1 ps-4">
                        <span>Already user? </span>
                        <Button  variant="link" className="font-normal items-center justify-start p-0" size="sm" asChild><Link href={'/auth/login'}>Login instead.</Link></Button>
                    </div>
                </div>
            </form>
            
        </CardWrapper>
    )

}

export default UserName;