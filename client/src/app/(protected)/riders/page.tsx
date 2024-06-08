'use client';

import GMap from '@/components/GMap';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import Rides from '@/components/riders/Rides';
import {getGeoPositionName} from '@/services/geo-service';


const Riders = () => {
    const [q, setQ] =useState<{from?:string, to?:string, date?:string, time?:string}>({});
    const [query, setQuery] =useState({});
    const [title, setTitle] = useState('Pre-Scheduled rides');

    useEffect(() =>{
        const geo_pos =JSON.parse(localStorage.getItem('pos')!);
        if(!geo_pos) return;
        const get_name =async () =>{
            const loc =await getGeoPositionName(geo_pos);
        }
        get_name().then(r => {});

    }, [])
    return (
        <div className='grid lg:grid-rows-[500px_auto] min-h-screen gap-8'>
            <div className="grid lg:grid-cols-[30%_auto] gap-8">
                <div className="">
                    <div className="flex flex-col gap-4 bg-white p-4 lg:p-8 rounded-xl shadow-sm">
                        <h3 className='uppercase font-semibold'>Find ride</h3>
                        <div className="flex flex-col gap-8 pe-4 h-max">
                            <Input placeholder='Pickup point' onChange={e => setQ({...q, from: e.target.value})}/>
                            <Input placeholder='Destination' onChange={e => setQ({...q, to: e.target.value})}/>
                            <div className="flex gap-4">
                                <div className='w-full'>
                                    <label>Date</label>
                                    <Input type='date' onChange={e => setQ({...q, date: e.target.value})}/>
                                </div>
                                <div className='w-full'>
                                    <label>Time</label>
                                    <Input type='time' onChange={e => setQ({...q, time: e.target.value})}/>
                                </div>

                            </div>

                            <Button onClick={() =>{setQuery(q); setTitle(`Rides ${q?.to? 'to '+q?.to: q?.from? 'from '+q?.from: 'found'}`)}}>Search</Button>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 lg:p-8 rounded-xl shadow-sm"><GMap /></div>
            </div>
            <Rides title={title} query={query}/>
        </div>
    )
}

export default Riders;
