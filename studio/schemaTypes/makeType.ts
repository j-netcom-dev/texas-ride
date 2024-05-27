import { defineType } from 'sanity';

export const MakeType =defineType({
    name: 'make',
    title: 'Vehicle Makes',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {source: 'name'}
        }
    ],
});