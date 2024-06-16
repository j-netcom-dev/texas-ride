import {client} from "@/lib/studio";

export  const create_ride_review =async ({rating, review, ride, customer}: {ride: string, customer: string, review?: string, rating: number}) =>{

    const client_review = await client.create({
        _type: 'review',
        rating, review,
        ride: {
            _type: 'reference',
            _ref: ride,
        },
        customer: {
            _type: 'reference',
            _ref: customer,
        },
    });

    return {review: client_review._id}
}