import { defineType } from 'sanity';

export const ReviewsType =defineType({
    name: 'review',
    title: 'Reviews',
    type: 'document',
    fields: [
        {
            name: 'review',
            type: 'string',
            title: 'Review'
        },

        {
            name: 'rating',
            type: 'number',
            title: 'Rating'
        },

        {
            name: 'ride',
            type: 'reference',
            title: 'Ride',
            to: [
                {type: 'ride'}
            ]
        },

        {
            name: 'customer',
            type: 'reference',
            title: 'Customer',
            to: [
                {type: 'user'}
            ]
        },
    ],
});