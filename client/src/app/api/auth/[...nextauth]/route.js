import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import {auth_user} from "../../../../services/user-service";

async function login(credentials){
    const { email, password } =credentials;
    const { _id, role: { role } } =await auth_user({email, password});
    return {_id, role}
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
                finally {
                    console.log('authorizing')
                }

            }
        })
    ],
    session: {
      strategy: 'jwt',
    },
    callbacks: {
        async jwt({token, user}){

            if(user){
                token.role =user.role;
                token.id =user._id;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user._id =token.id;
                session.user.role =token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler =NextAuth(authOptions);

export {handler as GET, handler as POST}