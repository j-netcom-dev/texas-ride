import { defineType } from 'sanity';

export const RideType =defineType({
    name: 'ride',
    title: 'Rides',
    type: 'document',
    fields: [
        {
            name: 'from',
            type: 'string',
            title: 'From'
        },

        {
            name: 'to',
            type: 'string',
            title: 'To'
        },

        {
            name: 'customer',
            type: 'reference',
            title: 'Customer',
            to: [
                {type: 'user'}
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
            name: 'vehicle',
            type: 'reference',
            title: 'Vehicle',
            to: [
                {type: 'vehicle'}
            ]
        },

        {
            name: 'price',
            type: 'number',
            title: 'Price'
        },

        {
            name: 'time',
            type: 'datetime',
            title: 'Time'
        },

        {
            name: 'status',
            type: 'string',
            title: 'Status'
        },
    ],
});