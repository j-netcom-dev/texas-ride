'use client';

import Image from "next/image";
import IconLink from "./IconLink";
import { Button } from "./ui/button";
import LOGO from '@/assets/img/logo.jpg';
import { useMediaQuery } from "@/hooks/use-media-query";
import { Airplay, CarFront, CarTaxiFront, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const SideMenu = () => {
  const isDesktop =useMediaQuery("(min-width: 768px)");
  return isDesktop? (<header className='fixed top-0 left-0 shadow rounded-lg w-[200px] h-full grid grid-rows-[max-content_auto]'>
  <div className="border-b px-8 py-6">
    <Image alt="LOGO" src={LOGO}/>
  </div>
  <nav className="flex flex-col justify-between pb-12 pt-4">
    <div className="flex flex-col gap-2">
      <IconLink href="/portal" text="Dashboard" icon={Airplay}/>
      <IconLink href="/portal/trips" text="Trips" icon={CarTaxiFront}/>
      <IconLink href="/portal/my-car" text="Car" icon={CarFront}/>
    </div>
    <div className="px-4 flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-[1rem] uppercase">John Doe</h3>
          <p className="text-[.8rem] font-semibold leading-3 uppercase">driver</p>
        </div>
      </div>
      <Button>Logout</Button>
    </div>
  </nav>
</header>):
(<Drawer direction="left">
    <div className="flex justify-between p-5 items-center">
        <strong className="block uppercase font-bold">Logo</strong>
        <DrawerTrigger><MenuIcon /></DrawerTrigger>
    </div>
    <DrawerContent className="p-6 grid grid-rows-[max-content_auto]">
        <header className='fixed top-0 left-0 w-full rounded-lg h-full grid grid-rows-[max-content_auto]'>
            <div className="border-b px-8 py-6">
              <h2 className="text-center">Logo</h2>
            </div>
            <nav className="flex flex-col justify-between pb-12 pt-4">
              <div>
              <IconLink href="/portal" text="Dashboard" icon={Airplay}/>
              <IconLink href="/portal/trips" text="Trips" icon={CarTaxiFront}/>
              <IconLink href="/portal/my-car" text="Car" icon={CarFront}/>
              </div>
              <div className="px-4 flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-[1rem] uppercase">John Doe</h3>
                    <p className="text-[.8rem] font-semibold leading-3 uppercase">driver</p>
                  </div>
                </div>
                <Button>Logout</Button>
              </div>
            </nav>
          </header>
      </DrawerContent>
  </Drawer>)
}

export default SideMenu;
