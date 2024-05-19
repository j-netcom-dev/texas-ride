import { FC } from 'react';
import Link from 'next/link';
import { LinkPropsType } from '@/types';


const IconLink:FC<LinkPropsType> = ({text, href, icon: Icon}) => {
  return (
    <Link href={href} className='flex px-4 text-xl py-3 items-center  gap-2'><Icon /><span>{text}</span></Link>
  )
}

export default IconLink;
