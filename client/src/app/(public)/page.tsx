"use client";
import Link from "next/link";
import Image from "next/image";
import CAR from '@/assets/img/car.png';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import StreetSection from "@/components/StreetSection";

const parentVariants ={
  hidden: {  opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 1}}
}


export default function Home() {
  const isLarge =useMediaQuery("(min-width: 1024px)");
  const isMobile =useMediaQuery("(max-width: 768px)");
  return (
    <main className="h-screen">
      <motion.section variants={parentVariants} initial ="hidden" animate ="show" className={`bg-[#f8f3f35b] overflow-hidden ${isMobile? 'h-[400px]': 'h-full'} py-8 px-4 md:p-8 md:gap-8 relative flex flex-col items-center justify-center md:flex-row-reverse`}>
        <motion.div variants={{
                        hidden: { x: '100%', opacity: 0 },
                        show: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: .2 } }
                      }} className="pb-5 md:pb-0 lg:px-6 flex-1 flex items-end"><Image src={CAR} alt="hero" className="w-full opacity-70"/>
        </motion.div>
        <motion.div  variants={{
              hidden: { opacity: 0, y: 100 },
              show: { opacity: 1, y: 0, transition: { delay: .6, duration: .5, type: 'spring', damping: 15 } }
            }} className="flex-1">
          <h1 className="font-bold uppercase leading-[4.5rem] hidden md:block md:text-4xl lg:text-6xl">Ride Like {isLarge &&<br/>}Never Before</h1>
          <p className="pb-4 lg:py-6 lg:max-w-[80%] mx-auto text-center md:text-left md:mx-0">Catch a royal ride and travel in style from any point to a destination you desire within Texas in time.</p>
          <Button asChild className="mx-auto block text-center w-max md:mx-0"><Link href={''}>Start today</Link></Button>
        </motion.div>
      </motion.section>
    <StreetSection />
    <motion.section variants={parentVariants} initial ="hidden" animate ="show" className={`bg-[#f8f3f35b] overflow-hidden ${isMobile? 'h-[400px]': 'h-full'} py-8 px-4 md:p-8 md:gap-8 relative flex flex-col items-center justify-center md:flex-row-reverse`}>
        <motion.div variants={{
                        hidden: { x: '100%', opacity: 0 },
                        show: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: .2 } }
                      }} className="pb-5 md:pb-0 lg:px-6 flex-1 flex items-end"><Image src={CAR} alt="hero" className="w-full opacity-70"/>
        </motion.div>
        <motion.div  variants={{
              hidden: { opacity: 0, y: 100 },
              show: { opacity: 1, y: 0, transition: { delay: .6, duration: .5, type: 'spring', damping: 15 } }
            }} className="flex-1">
          <h1 className="font-bold uppercase leading-[6rem] hidden md:block md:text-4xl lg:text-6xl">Ride in texas{isLarge &&<br/>}how you want</h1>
          <p className="pb-4 lg:py-6 lg:max-w-[80%] mx-auto text-center md:text-left md:mx-0">Handpick your driver and schedule time for your. Alternatively book to ride later or even more conveniently call for an instant ride.</p>
        </motion.div>
      </motion.section>
      </main>
  );
}
