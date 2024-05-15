"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";

const Navbar = () => {
    const links = [{href: '/', label: 'Home'}, {href: '/auth/register', label: 'Register'}]
    const isDesktop =useMediaQuery("(min-width: 480px)");
    return (
        <header>
            {isDesktop? (<nav className="flex px-6 py-4 justify-between items-center">
            <div className="cursor-default"><strong className="uppercase font-bold">Texas Ride</strong></div>
            <div className="flex items-center gap-6">
                <ul className="flex items-center gap-6">
                    {links.map(({href, label}) =>(<li  key={label}><Link href={href} className="py-3 transition-all rounded-md hover:bg-gray-50 px-4 hover:text-gray-600">{label}</Link></li>))}
                </ul>
                <Button asChild className="w-full block text-center px-8"><Link href={'/auth/login'}>Login</Link></Button>
            </div>
            </nav>): (<Drawer direction="left">
                    <div className="flex justify-between p-5 items-center">
                        <strong className="block uppercase font-bold">Texas Ride</strong>
                        <DrawerTrigger><MenuIcon /></DrawerTrigger>
                    </div>
                    <DrawerContent className="p-6 grid grid-rows-[max-content_auto]">
                        <div className="uppercase font-bold">Texas Ride</div>
                        <nav className="flex flex-col gap-1 pt-8 relative h-ful">
                            {links.map(({href, label}) =>(<Link href={href} key={label} className="py-2 transition-all rounded-md hover:bg-gray-50 hover:px-4 hover:text-gray-600">{label}</Link>))}
                            <div className="absolute bottom-0 w-full py-2">
                                <Button asChild className="w-full block text-center"><Link href={'/auth/login'}>Login</Link></Button>
                            </div>
                        </nav>
                    </DrawerContent>
                </Drawer>)}
        </header>
    )
}

export default Navbar;