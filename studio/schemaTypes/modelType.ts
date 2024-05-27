import { defineField, defineType } from 'sanity';

export const ModelType =defineType({
    name: 'model',
    title: 'Vehicle Models',
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