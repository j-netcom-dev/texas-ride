import React, { useRef } from 'react';
import CardWrapper from '../card-wrapper';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form-input';

interface formPropTypes {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}

const UserPasswordForm = ({step, setStep}: formPropTypes) => {
    const {handleSubmit, reset, register, formState: {errors}, watch} =useForm({defaultValues: {}});

    const save = () =>{
        setStep(step +1);
        reset()
    }
    
    return (
        <CardWrapper title='Create password'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(save)}>
                <FormInput name='password' type='password' validations={{required: {value: true, message: 'Password required*'}}} label='Password' errors={errors} register={register} placehoder='New password'/>
                <FormInput name='confirm' type='password' validations={{}} label='Confirm' errors={errors} register={register} placehoder='Confirm password'/>
                <div className="flex items-center justify-between">
                    <Button className='flex gap-1 items-center text-sm' type='button' variant={'ghost'} onClick={() =>setStep(step -1)}>&larr; Back</Button>
                    <Button className='flex gap-1 items-center'>Submit</Button>
                </div>
            </form>            
        </CardWrapper>
    )

}

export default UserPasswordForm;