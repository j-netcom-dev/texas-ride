import { defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export const UserType = defineType({
  name: 'user',
  title: 'Users',
  icon: UsersIcon,
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
      type: 'boolean',
      initialValue: true,
      name: 'access_allowed',
      title: 'User Access Allowed'
    },
    {
      type: 'boolean',
      name: 'active',
      title: 'User Is Active',
      initialValue: false,
    },
    {
      name: 'activation_tokens',
      type: 'array',
      title: 'Activation Tokens',
      of: [{type: 'reference', to: {type: 'otp'}}],
      hidden: true,
      readOnly: true,
    }
  ],
});
