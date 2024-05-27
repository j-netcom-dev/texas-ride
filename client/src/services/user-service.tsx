import { client } from "../lib/studio";
import { UserDetailsType } from "@/utils/types";
import { ClientError } from "next-sanity";

export const get_users = async() =>{
    const query =`*[_type =='user'] {
        first_name, last_name, email, phone,
    }`;

    const data =await client.fetch(query);
    
}

export const create_user =async ({first_name, last_name, email, phone, role, password}: UserDetailsType) =>{
    const user = await client.create({
        _type: 'user',
        first_name,
        last_name,
        password,
        phone,
        email,
        role: {
            _type: 'reference',
            _ref: role,
        },
    });
    
}