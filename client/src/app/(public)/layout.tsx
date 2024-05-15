import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Texas Ride - Ride like never before",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-screen grid grid-rows-[max-content_auto]">
      <Navbar />
      {children}
    </div>
  );
}