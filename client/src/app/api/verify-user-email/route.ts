import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { email_verification_template } from '@/assets/templates/email_verification_template';


export async function POST(req: Request){
    const {to, name, _id} =await req.json();
    
    const token =`${randomUUID()}${randomUUID()}${randomUUID()}`.replace(/-/g, '');
    const link =`http://localhost:3000/auth/verify-email/${token}/${_id}`;
    const email_template =email_verification_template({name, link});
    const mail_transporter =nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_CLIENT_ID,
        port: 465,
        secure: true,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_CLIENT_USER_ID,
            pass: process.env.NEXT_PUBLIC_EMAIL_CLIENT_USER_KEY
        }
    });

    try {
        const info = await mail_transporter.sendMail({
            from: `No Reply <${process.env.NEXT_PUBLIC_EMAIL_CLIENT_USER_ID}>`, 
            to,
            subject: 'Email Verification',
            html: email_template
        });
        console.log(info.messageId, info.accepted);
        
        return NextResponse.json({
            token,
            userId: _id
        })
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: 'Endpoint hit'
        })
        
    }
}
