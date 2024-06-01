import { client } from '@/lib/studio';
import axios from 'axios';

export const verifyEmail = async ({to, name, _id}: {to: string, name: string, _id: string}) =>{
    const {data: {token}} =await axios.post('/api/verify-user-email', {to, name, _id});
        
    const doc = {
        _type: 'otp',
        token,
        activated_at: null, 
        created_at: new Date().toISOString(),
        user: {
          _type: 'reference',
          _ref: _id,
        },
        reason: 'Account activation',
    };
    await client.create(doc);
}