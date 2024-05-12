"use client";
import Link from "next/link";
import Image from "next/image";
import CAR from '@/assets/img/car.png';
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Home() {
  const isLarge =useMediaQuery("(min-width: 1024px)");
  return (
    <main className="h-full">
      <section className="bg-[#f8f3f35b] h-full py-8 px-4 md:p-8 md:gap-8 relative flex flex-col-reverse items-center justify-center md:flex-row">
          <div className="flex-1">
            <h1 className="font-bold uppercase leading-[4.5rem] hidden md:block md:text-4xl lg:text-6xl">Ride Like {isLarge &&<br/>}Never Before</h1>
            <p className="pb-4 lg:py-6 lg:max-w-[80%] mx-auto text-center md:text-left md:mx-0">Catch a royal ride and travel in style from any point to a destination you desire within Texas in time.</p>
            <Button asChild className="mx-auto block text-center w-max md:mx-0"><Link href={''}>Start today</Link></Button>
          </div>
          <div className="pb-5 md:pb-0 lg:px-6 flex-1 flex items-end"><Image src={CAR} alt="hero" className="w-full opacity-70"/></div>
      </section>
    </main>
  );
}
