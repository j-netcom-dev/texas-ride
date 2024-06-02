'use client';

import { useEffect } from 'react';
import GMap from '@/components/GMap';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getGeoPositionName } from '@/services/geo-service';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const rides = [
    {
        from: 'Austin',
        to: 'Houston',
        time: '2024-06-01T01:00:00',
        vehicle: 'Ford Fiesta',
        driver: 'John Doe',
        contact: '555-1234'
    },
    {
        from: 'Dallas',
        to: 'San Antonio',
        time: '2024-06-02T02:00:00',
        vehicle: 'Toyota Camry',
        driver: 'Jane Smith',
        contact: '555-5678'
    },
    {
        from: 'El Paso',
        to: 'Fort Worth',
        time: '2024-06-03T03:00:00',
        vehicle: 'Honda Accord',
        driver: 'Mike Johnson',
        contact: '555-8765'
    },
    {
        from: 'Arlington',
        to: 'Corpus Christi',
        time: '2024-06-04T04:00:00',
        vehicle: 'Chevrolet Malibu',
        driver: 'Emily Davis',
        contact: '555-4321'
    },
    {
        from: 'Plano',
        to: 'Laredo',
        time: '2024-06-05T05:00:00',
        vehicle: 'Nissan Altima',
        driver: 'Chris Wilson',
        contact: '555-8761'
    },
    {
        from: 'Lubbock',
        to: 'Garland',
        time: '2024-06-06T06:00:00',
        vehicle: 'Hyundai Sonata',
        driver: 'Sarah Brown',
        contact: '555-6543'
    },
    {
        from: 'Irving',
        to: 'Amarillo',
        time: '2024-06-07T07:00:00',
        vehicle: 'Kia Optima',
        driver: 'David Martinez',
        contact: '555-7890'
    },
    {
        from: 'Grand Prairie',
        to: 'McKinney',
        time: '2024-06-08T08:00:00',
        vehicle: 'Volkswagen Jetta',
        driver: 'Linda Rodriguez',
        contact: '555-4329'
    },
    {
        from: 'Frisco',
        to: 'Brownsville',
        time: '2024-06-09T09:00:00',
        vehicle: 'Subaru Impreza',
        driver: 'James Lee',
        contact: '555-1239'
    },
    {
        from: 'Pasadena',
        to: 'Killeen',
        time: '2024-06-10T10:00:00',
        vehicle: 'Mazda 6',
        driver: 'Patricia White',
        contact: '555-8763'
    },
    {
        from: 'McAllen',
        to: 'Waco',
        time: '2024-06-11T14:00:00',
        vehicle: 'Ford Fusion',
        driver: 'Robert Harris',
        contact: '555-4328'
    },
    {
        from: 'Mesquite',
        to: 'Carrollton',
        time: '2024-06-12T12:00:00',
        vehicle: 'Chrysler 300',
        driver: 'Elizabeth Clark',
        contact: '555-5673'
    }
];


const Riders = () => {
    const convertTime = (datetime: string) => {
        const date = new Date(datetime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours <10? '0'+hours: hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        return formattedTime;
    };
    useEffect(() =>{
        const geo_pos =JSON.parse(localStorage.getItem('pos')!);
        if(!geo_pos) return;
        const get_name =async () =>{
            const loc =await getGeoPositionName(geo_pos);
            console.log(loc);
            
        }
        get_name();
        
    }, [])
  return (
    <div className='grid lg:grid-rows-[500px_auto] min-h-screen gap-8'>
      <div className="grid lg:grid-cols-[30%_auto] gap-8">
            <div className="">
            <div className="flex flex-col gap-4 bg-white p-4 lg:p-8 rounded-xl shadow-sm">
                <h3 className='uppercase font-semibold'>Find ride</h3>
                <div className="flex flex-col gap-8 pe-8 h-max">
                    <Input placeholder='Pickup point'/>
                    <Input placeholder='Destination'/>
                    <Button>Search</Button>
                </div>
            </div>
        </div>
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-sm"><GMap /></div>
      </div>
      <div className="flex w-full flex-col gap-4 md:p-4 lg:p-8 rounded-xl shadow-sm md:bg-white">
        <h2 className='uppercase font-bold text-lg md:text-2xl text-[#333]'>Pre-Scheduled rides</h2>
        <ul className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8'>
            {rides.map(({driver, from, to, time}, index) =><li key={index} className='bg-[#ffffff8f] border p-4 rounded-xl flex flex-col gap-3'>
                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{`${driver.charAt(0)}${driver.split(' ').at(-1)?.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <div className="uppercase font-semibold">{driver}</div>
                </div>
                <div className="">{from} - {to}</div>
                <div className="text-muted-foreground text-sm">At {convertTime(time)}</div>
                <Button>Book</Button>
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default Riders;
