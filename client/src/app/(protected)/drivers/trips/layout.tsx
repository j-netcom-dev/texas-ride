import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trips",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
     <div className="">
          {children}
     </div>
    );
  }
  