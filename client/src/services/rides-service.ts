import {groq} from "next-sanity";
import { client } from "@/lib/studio";

export const search_rides = async (searchQ: {from?: string, to?: string, date?: string, time?:string}) => {
    const query =[];
    if(searchQ.to) query.push(`to match '${searchQ.to}'`);
    if(searchQ.from) query.push(`from match '${searchQ.from}'`);
    if(searchQ.date && searchQ.time){
        query.push(`time == '${new Date(`${searchQ.date}T${searchQ.time}Z`).toISOString()}'`);
    }
    const q =groq`*[_type == 'ride' && (status match 'scheduled' && ${query.join(' && ')})]{_id,  from, to, time, driver->{first_name, last_name, photo}}`;
    return await client.fetch(q);

}

export const fetch_available_rides = async () =>{
    const query = groq`*[_type == "ride" && (status match 'scheduled')]{_id,  from, to, time, driver->{first_name, last_name, photo}}`;
    return await client.fetch(query);
}