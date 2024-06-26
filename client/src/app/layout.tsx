import "@/assets/styles/globals.css";
import { Inter } from "next/font/google";
import {AuthProvider} from "@/app/Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider> {children} </AuthProvider>
      </body>
    </html>
  );
}