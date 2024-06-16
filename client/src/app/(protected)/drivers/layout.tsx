import { Metadata } from "next";
import SideMenu from "@/components/SideMenu";
import {Toaster} from "sonner";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
     <div className="h-screen w-full grid grid-cols-1 md:grid-cols-[200px_auto]">
        <SideMenu />
        <div></div>
          {children}
         <Toaster richColors/>
     </div>
    );
  }
  