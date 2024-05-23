// access the local storage

import { UserData } from "./types";


const user_bucket ='user_details';

export const get_user_details =(step?:number):UserData | UserData[] | undefined=>{
    const user_details:UserData[] =JSON.parse(localStorage.getItem(user_bucket) || JSON.stringify([]));
    if(step ==undefined) return user_details;
    return user_details.find(item => item.step ==step)
}

export const save_user_data =({step, data}: UserData) =>{
    const user_details =get_user_details() as UserData[] || [];
    const index = user_details.findIndex(item => item.step === step);
    if(index !== -1) user_details[index] = { step, data };
    else user_details.push({ step, data });
    localStorage.setItem(user_bucket, JSON.stringify(user_details));
}

export const destroy_user_details =() =>localStorage.removeItem(user_bucket);