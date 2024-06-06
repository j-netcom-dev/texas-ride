import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import {auth_user} from "../../../../services/user-service";

async function login(credentials){
    const { email, password } =credentials;
    return await auth_user({email, password});
}

export const authOptions ={
    pages: {
        signIn: '/auth/login',
      },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: { },
            authorize: async (credentials) =>{
                try {
                    return await login(credentials);
                } catch ({message}) {
                    throw new Error(message);
                }
            }
        })
    ],
    callback: {
        async jwt({token, user}){
            if(user){
                token.email = user.email;
                token.id = user._id;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.email = token.email;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler =NextAuth(authOptions);

export {handler as GET, handler as POST}