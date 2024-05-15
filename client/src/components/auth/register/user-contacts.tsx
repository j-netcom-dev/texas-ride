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

const UserContact = ({step, setStep}: formPropTypes) => {
    const {handleSubmit, reset, register, formState: {errors}} =useForm();
    const save = () =>{
        setStep(step +1);
    }
    
    return (
        <CardWrapper title='Contact details'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='email' validations={{required: {value: true, message: 'Email required*'}}} label='Email address' errors={errors} register={register} placehoder='Enter your email'/>
                <FormInput name='phone' validations={{required: {value: true, message: 'Phone number required*'}}} label='Phone number' errors={errors} register={register} placehoder='Enter your phone number'/>
                <div className="flex items-center justify-between">
                    <Button className='flex gap-1 items-center text-sm' type='button' variant={'ghost'} onClick={() =>setStep(step -1)}>&larr; Back</Button>
                    <Button className='flex gap-1 items-center'>Next &rarr;</Button>
                </div>
            </form>            
        </CardWrapper>
    )

}

export default UserContact;