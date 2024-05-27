import { UserRoleType } from "@/utils/types";
import { client } from "../lib/studio";

export const get_user_roles = async() =>{

    const query =`*[_type =='role' && (role match 'driver' || role match 'rider')] {
        _id, role
    }`;

    const data =await client.fetch(query) as UserRoleType[];
    return data;
}