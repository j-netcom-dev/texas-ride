import { defineType } from 'sanity';

export const RoleType =defineType({
    name: 'role',
    title: 'User Roles',
    type: 'document',
    fields: [
        {
            name: 'role',
            type: 'string',
            title: 'Role'
        },
    ],
});