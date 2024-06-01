import bcrypt from 'bcryptjs';
import { groq } from "next-sanity";
import { client } from "../lib/studio";
import { UserDetailsType } from "@/utils/types";

export const get_users = async() =>{
    const query =`*[_type =='user'] {
        first_name, last_name, email, phone,
    }`;

    const data =await client.fetch(query);
    
}

export const encrypt_plain_text =async ({plain_text, salt}:{plain_text: string, salt: number}) =>{
    return await bcrypt.hash(plain_text, salt);
}

const checkEmailExists = async (email: string): Promise<boolean> => {
    const query = groq`*[_type == "user" && email == $email][0]{_id}`;
    const result = await client.fetch(query, { email });
    return !!result;
  };

  const checkPhonelExists = async (phone: string): Promise<boolean> => {
    const query = groq`*[_type == "user" && phone == $phone][0]{_id}`;
    const result = await client.fetch(query, { phone });
    return !!result;
  };


export const create_user =async ({first_name, last_name, email, phone, role, password}: UserDetailsType) =>{
    const userEmailExists =await checkEmailExists(email || '');
    const userPhoneExists =await checkPhonelExists(phone || '');
    if(userEmailExists) throw Error("User with email already exist");
    if(userPhoneExists) throw Error("User with phone number already exist");
    const hashed_password =await encrypt_plain_text({plain_text: password || '', salt: 16});
    
    const user = await client.create({
        _type: 'user',
        first_name,
        last_name,
        password: hashed_password,
        phone,
        email,
        role: {
            _type: 'reference',
            _ref: role,
        },
    });

   return {_id: user._id}
}