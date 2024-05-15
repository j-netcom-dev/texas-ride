import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Login",
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