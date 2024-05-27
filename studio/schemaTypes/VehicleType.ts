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
            type: 'reference',
            title: 'Model',
            to: [
                {type: 'model'}
            ]
        },
        
        {
            name: 'make',
            type: 'reference',
            title: 'Make',
            to: [
                {type: 'make'}
            ]
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