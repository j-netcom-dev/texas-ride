import React from 'react';
import Link from 'next/link';
import CardWrapper from '../card-wrapper';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';

interface formPropTypes {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}

const UserName = ({step, setStep}: formPropTypes) => {
    const {handleSubmit, reset, register, formState: {errors}} =useForm();
    const save = () =>{
        setStep(step +1);
    }
    
    return (
        <CardWrapper title='Name'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='first_name' validations={{required: {value: true, message: 'First name required*'}}} label='First name' errors={errors} register={register} placehoder='Enter your first name'/>
                <FormInput name='last_name' validations={{required: {value: true, message: 'Last name required*'}}} label='Last name' errors={errors} register={register} placehoder='Enter your sur name'/>
                <div className="flex items-center justify-between">
                    <div className="w-full flex items-center gap-1">
                        <span>Already user? </span>
                        <Button  variant="link" className="font-normal items-center justify-start p-0" size="sm" asChild><Link href={'/auth/login'}>Login instead.</Link></Button>
                    </div>
                    <Button className='flex gap-1 items-center'>Next &rarr;</Button>
                </div>
            </form>
            
        </CardWrapper>
    )

}

export default UserName;