import { client } from "@/lib/studio";
import { UserRoleType } from "@/utils/types";

export const get_user_roles = async() =>{

    const query =`*[_type =='role' && (role match 'driver' || role match 'rider')] {
        _id, role
    }`;

    return await client.fetch(query) as UserRoleType[];
}