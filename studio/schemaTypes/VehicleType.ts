import { defineType } from 'sanity';

export const VehicleType =defineType({
    name: 'vehicle',
    title: 'Vehicles',
    type: 'document',
    fields: [
        {
            name: 'plate',
            type: 'string',
            title: 'Licence Plate'
        },

        {
            name: 'color',
            type: 'string',
            title: 'Color'
        },

        {
            name: 'model',
            type: 'string',
            title: 'Model',
        },
        
        {
            name: 'make',
            type: 'string',
            title: 'Make',
        },
        {
            name: 'driver',
            type: 'reference',
            title: 'Driver',
            to: [
                {type: 'user'}
            ]
        },
        {
            name: 'image',
            type: 'array',
            title: 'Images',
            of: [{type: 'image'}]
        },

        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {source: 'plate'}
        }
    ],
});