import {groq} from "next-sanity";
import { client } from "@/lib/studio";
import {value} from "valibot";

export  const create_vehicle =async (values: any) =>{
    const vehicle = values?._id? await client.patch(
        values._id
    ).set(
        {
            plate: values?.plate,
            color: values?.color,
            model: values?.model,
            make: values?.make,
            driver: {
                _type: 'reference',
                _ref: values?.driver,
            },
        }
    ).commit() :await client.create({
        _type: 'vehicle',
        plate: values?.plate,
        color: values?.color,
        model: values?.model,
        make: values?.make,
        driver: {
            _type: 'reference',
            _ref: values?.driver,
        },
    });

    return {_id: vehicle._id}
}


export const get_driver_vehicle =async (driver: {driver: string}) =>{
    const query = `*[_type == "vehicle" && driver._ref == $driver][0]`;
    const params = { driver };
    return await client.fetch(query, params);

}