import {createClient} from 'next-sanity';

export const client =createClient({
    useCdn: false,
    dataset: 'production',
    projectId: 'y20qg5is',
    apiVersion: '2022-03-07',
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
});
