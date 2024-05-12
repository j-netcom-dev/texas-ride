"use client";
import GMap from './GMap';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input"


const StreetSection = () => {
  return (
    <motion.section className='grid lg:grid-cols-[30%_auto] py-12 px-4 md:p-12 gap-12'>
        <div className="flex flex-col gap-8">
            <h2 className='uppercase font-bold text-xl md:text-2xl lg:text-4xl'>Find Ride</h2>
            <div className="flex flex-col gap-6">
                <Input placeholder='Your location'/>
                <Button className='w-1/2'>Find</Button>
            </div>
        </div>
        <GMap />
    </motion.section>
  )
}

export default StreetSection