import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";
import LOGO from '@/assets/img/logo.png';
import { Button } from "@/components/ui/button";

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
   <section className="w-full h-screen grid grid-rows-[max-content_auto] bg-[#f8f3f5]">
    <div className="flex justify-between items-center px-8 py-4 border-b shadow-sm">
      <Button variant={'ghost'} asChild><Link href={'/'}>&larr; Back Home</Link></Button>
      <Image src={LOGO} alt="logo" className="block w-[100px]"/>
    </div>
      <div className=" px-4 flex items-center justify-center ">
        {children}
        <Toaster richColors />
      </div> 
   </section>
  );
}
