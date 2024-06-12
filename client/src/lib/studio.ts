import {createClient} from 'next-sanity';

export const client =createClient({
    useCdn: false,
    dataset: 'production',
    projectId: 'dwfflu2e',
    apiVersion: '2024-03-07',
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
});
