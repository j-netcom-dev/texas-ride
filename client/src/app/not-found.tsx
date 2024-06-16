'use client';

import Link from "next/link";
import Image from "next/image";
import ERROR404 from '@/assets/img/404.png';
import {Button} from "@/components/ui/button";

const PageNotFound =() =>{
    return <div className='h-screen w-full flex items-center justify-center'>
        <div>
            <Image  src={ERROR404} alt={'404'}/>
            <div className={'flex flex-col gap-4 items-center justify-center'}>
                <p className={'text-muted-foreground text-2xl font-bold uppercase '}>Page not found</p>
                <Button className={'w-max'} asChild>
                    <Link href={'/'}>Back Home</Link>
                </Button>
            </div>
        </div>
    </div>
}

export default PageNotFound