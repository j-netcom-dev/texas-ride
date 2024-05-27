import { defineType } from 'sanity';

export const UserType =defineType({
    name: 'user',
    title: 'Users',
    type: 'document',
    fields: [
        {
            type: 'string',
            name: 'first_name',
            title: 'First Name',
        },
        {
            type: 'string',
            name: 'last_name',
            title: 'Last Name',
        },

        {
            name: 'email',
            type: 'string',
            title: 'Email',
            options: { isUnique: true }
        },

        {
            name: 'phone',
            type: 'string',
            title: 'Phone Number',
            options: { isUnique: true }
        },
        {
            name: 'role',
            type: 'reference',
            title: 'Role',
            to: [
                {type: 'role'}
            ]
        },
        {
            name: 'photo',
            type: 'image',
            title: 'Passport Photo',
        },
        {
            type: 'string',
            name: 'password',
            title: 'Password',
            hidden: true,
        },

        {
            type: 'datetime',
            name: 'emailVerifiedAt',
            title: 'Time email was verified',
            readOnly: true
        }
    ],
});