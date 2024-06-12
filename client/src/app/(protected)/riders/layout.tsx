import Image from "next/image";
import { Metadata } from "next";
import LOGO from '@/assets/img/logo.png';
import {TopBar} from "@/components/riders/TopBar";
import {Toaster} from "sonner";

export const metadata: Metadata = {
  title: "Let's plan your ride",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
     <div className="bg-[#dcdee0bb] p-3 md:p-8 md:pt-4 grid grid-rows-[max-content_auto] gap-8">
      <div className="bg-white py-4 px-5 shadow flex justify-between items-center rounded">
          <Image alt="LOGO" src={LOGO} className="w-[84px] block"/>
          <TopBar/>

      </div>
      {children}
         <Toaster richColors/>
     </div>
    );
  }