import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Verification",
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