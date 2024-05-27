import Link from "next/link";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
   <section className="w-full h-screen grid grid-rows-[max-content_auto] bg-[#f8f3f5]">
    <div className="flex justify-between items-center px-8 py-4 border-b shadow-sm">
      <Button variant={'ghost'} asChild><Link href={'/'}>&larr; Back Home</Link></Button>
      <h2 className="text-xl uppercase font-bold">Texas Ride</h2>
    </div>
      <div className=" px-4 flex items-center justify-center ">
        {children}
        <Toaster richColors />
      </div>
   </section>
  );
}
