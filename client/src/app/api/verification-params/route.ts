import { client } from '@/lib/studio';
import { NextResponse } from 'next/server';


export async function GET(_: Request){
    const query =`*[_type =='otp']{token, user { _ref} }`;
    const tokens: {token:string, user: {_ref: string}}[] =await client.fetch(query);
    try { return NextResponse.json({ tokens: tokens.map(({token, user: {_ref}}) =>({token, userId: _ref})) }) } 
    catch (error) {return NextResponse.json({ message: error})}
}