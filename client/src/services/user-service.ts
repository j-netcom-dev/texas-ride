import bcrypt from 'bcryptjs';
import { groq } from "next-sanity";
import { client } from "@/lib/studio";
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

  const checkPhoneExists = async (phone: string): Promise<boolean> => {
    const query = groq`*[_type == "user" && phone == $phone][0]{_id}`;
    const result = await client.fetch(query, { phone });
    return !!result;
  };


export const create_user =async ({first_name, last_name, email, phone, role, password}: UserDetailsType) =>{
    const userEmailExists =await checkEmailExists(email || '');
    const userPhoneExists =await checkPhoneExists(phone || '');
    if(userEmailExists) throw Error("User with email already exist");
    if(userPhoneExists) throw Error("User with phone number already exist");
    const hashed_password =await encrypt_plain_text({plain_text: password || '', salt: 16});
    
    const user = await client.create({
        _type: 'user',
        first_name,
        last_name,
        password: hashed_password,
        access_allowed: true,
        phone,
        email,
        role: {
            _type: 'reference',
            _ref: role,
        },
    });

   return {_id: user._id}
}

export const auth_user =async ({email, password}: {email:string, password: string}) =>{
    const query = groq`*[_type == "user" && email == $email][0]{password, role->{ role }, _id, access_allowed, active}`;
    const userFound = await client.fetch(query, { email });
    if(!userFound) throw Error("Invalid  email or password");
    const passwordMatch =await bcrypt.compare(password, userFound.password);
    if(!passwordMatch) throw Error("Invalid  email or password");
    if(!userFound.active) throw Error("Please activate your account and try again. Check your email for instructions.");
    if(!userFound.access_allowed) throw Error("Access denied. Your account was temporarily suspended please contact us for further directions.");
    return userFound;
}

export const get_user_by_id = async (id: string) =>{
    const query = groq`*[_type == "user" && _id == $id][0]`;
    const userFound = await client.fetch(query, { id });
    if(!userFound) throw Error("User not found");
    return userFound;
}

export const get_user_by_email = async ({email}: { email: string }) => {
    const query = groq`*[_type == "user" && email == $email][0]{_id, active, access_allowed}`;
    return await client.fetch(query, { email });
};

export const change_password = async ({userId, password}: { userId: string, password: string }) => {
    const hashed_password =await encrypt_plain_text({plain_text: password || '', salt: 16});
    await client.patch(userId).set( { password: hashed_password }).commit();
};
