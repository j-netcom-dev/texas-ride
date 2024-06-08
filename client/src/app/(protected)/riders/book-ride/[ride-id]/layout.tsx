import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Ride",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}