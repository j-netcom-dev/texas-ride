import {groq} from "next-sanity";
import { client } from "@/lib/studio";


export  const create_ride =async (values: any) =>{
    const datetime =new Date(`${values?.date}T${values?.time}Z`).toISOString();
    const ride = await client.create({
        _type: 'ride',
        from: values?.from,
        to: values?.to,
        time: datetime,
        driver: {
            _type: 'reference',
            _ref: values?.driver,
        },
    });

    return {ride: ride._id}
}
export const get_driver_rides =async (driver: {driver: string}) =>{
    const query = groq`*[_type == "ride" && driver._ref == $driver]{ _id, from, to, time,
    driver->{ _id, firstName, lastName, photo },
    "reviews": *[_type == "review" && references(^._id)][0]{
      rating, review, customer->{ first_name, last_name, photo }
    }
  }`;

const params = { driver };
return await client.fetch(query, params);

}
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
const book_ride =async ({rideId, customerId}: {rideId: string, customerId: string}) =>{

}
export const fetch_available_rides = async () =>{
    const query = groq`*[_type == "ride" && status ==null]{_id,  from, to, time, driver->{first_name, last_name, photo}}`;
    return await client.fetch(query);
}

export const get_single_ride = async (rideId: string) =>{
    const query = groq`*[_type == "ride" && _id ==$rideId][0]{_id,  from, to, status, time, driver->{_id, first_name, last_name, photo}}`;
    return await client.fetch(query, {rideId});
}