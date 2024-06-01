import { defineType } from 'sanity';

export const OTP = defineType({
  name: 'otp',
  title: 'One Time Password',
  type: 'document',
  fields: [
    {
      type: 'string',
      name: 'token',
      title: 'Token',
      readOnly: true,
    },
    {
      type: 'datetime',
      name: 'activated_at',
      title: 'Activated At',
      readOnly: true,
    },
    {
      type: 'datetime',
      name: 'created_at',
      title: 'Created At',
      readOnly: true,
    },
    {
      name: 'user',
      type: 'reference',
      title: 'User',
      readOnly: true,
      to: [
        {type: 'user'}
      ]
    },
    {
      name: 'reason',
      type: 'string',
      title: 'Reason',
      readOnly: true,
    }
  ],
});
