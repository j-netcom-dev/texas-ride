import { defineField, defineType } from 'sanity';

export const NotificationType =defineType({
    name: 'notification',
    title: 'Notifications',
    type: 'document',
    fields: [
        {
            name: 'body',
            type: 'string',
            title: 'Body',
            readOnly: true
        },
        {
            name: 'viewed',
            type: 'boolean',
            title: 'Notification Viewed',
            readOnly: true,
        },

        {
            name: 'audience',
            title: 'Audience',
            type: 'string',
            hidden: true,
        }

    ],
});