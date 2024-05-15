import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   {children}
   </>
  );
}