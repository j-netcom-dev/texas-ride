import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "My trips",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return <>{children}</>;
}