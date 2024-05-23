'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { get_user_details, save_user_data } from "@/utils/storage";
import { UserData } from "@/utils/types";

interface formPropTypes {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}

const UserRole = ({step, setStep}: formPropTypes) => {
    const [role, setRole] =useState('');
    const userRoles =[{value: 'driver', label: 'Create a driver account'}, {value: 'rider', label: 'Create a rider account'}]
    
    useEffect(() =>{
        const data =get_user_details(step) as UserData;
        setRole(`${data?.data? (data.data.role || ''): ''}`);
    }, [step]);

    const save = () =>{
        if(!role) return;
        const data ={role};
        save_user_data({step, data})
        setRole('');
        setStep(step +1);
    }
  return (
    <div className="flex flex-col gap-8">
        <div className="flex gap-8">
        {userRoles.map(({value, label}) =>(<div key={value} className="shadow bg-[#fff]  rounded-xl flex flex-col gap-4 relative">
            <div className="flex justify-end absolute top-4 left-0 right-4"><input checked ={role ==value} onChange={e =>setRole(e.target.value)} name='role' value={value} type="radio" className="cursor-pointer"/></div>
            <p className="pt-16 pb-4 ps-4 pe-12 text-xl font-semibold">{label}</p>
        </div>))}
        </div>
        <Button className="w-max block ms-auto" onClick={save}>Next &rarr;</Button>
    </div>
  )
}

export default UserRole;
