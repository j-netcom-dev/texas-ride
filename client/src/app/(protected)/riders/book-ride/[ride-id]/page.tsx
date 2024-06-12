// pages/book-ride.tsx
"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {useParams}   from "next/navigation";
import STARS from "@/assets/img/reviews.png";
import { Button } from "@/components/ui/button";
import ChatSidebar from "@/components/ChatSidebar";
import { Star, MessageCircle } from "lucide-react";
import {get_driver_rides, get_single_ride} from "@/services/rides-service";
import {format_time} from "@/utils/format_time";


interface REVIEW {
  name: string;
  rating: number;
  review: string;
}

const BookRide = () => {
  const params =useParams();
  const [driver, setDriver] = useState<{
    first_name?: string;
    last_name?: string;
    photo?: string;
  }>({});
  const [trip, setTrip] = useState<{
    from?: string;
    to?: string;
    time?: string;
    status?: string;
  }>({});
  const [avgRating, setAvgRating] =useState(0.0);
  const [reviews, setReviews] = useState<REVIEW[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    (async () =>{
      // @ts-ignore
      const ride =await get_single_ride(params['ride-id']);
      setTrip({...ride, time: format_time(ride?.time)});
      const trips =await get_driver_rides(ride?.driver?._id);
      const data = [...trips].map(entry => {
        const _rating =entry?.reviews? entry?.reviews.rating || 0: 0;
        const _review =entry?.reviews? entry?.reviews.review: '';
        const _customer =entry?.reviews? `${entry?.reviews?.customer.first_name} ${entry?.reviews?.customer.last_name}`: '';
        return { rating: _rating, name: _customer, review: _review}
      });
      const ratings = data.filter(item => item.rating);
      setReviews(ratings);
      console.log(ratings)
      // @ts-ignore
      const totalRating = ratings.reduce((sum, item) => sum + item.rating, 0);
      const clientAvgRatings = ratings.length > 0 ? (totalRating / ratings.length).toFixed(1) : 0;
      // @ts-ignore
      setAvgRating(clientAvgRatings)
      setDriver({...ride.driver});
    })();
  }, [params]);
  const book =async () =>{

  }
  return (
    <div className={"h-full flex flex-col gap-8"}>
      <div className={"bg-white p-4 rounded shadow flex flex-col"}>
        <p className={"text-xs text-muted-foreground"}>Dep: {trip?.time}</p>
        <h3 className={"font-semibold text-lg"}>
          {trip.from} - {trip.to}
        </h3>
        <div className={"flex flex-col gap-4 w-max pt-8"}>
          <div className={"flex items-end gap-4"}>
            <div className={"w-[100px] h-[100px] rounded bg-slate-100"}>
              <Image src={driver.photo || ''} alt={''} className={'w-full h-full'}/>
            </div>
            <div className={"flex flex-col gap-1"}>
              <div className="flex gap-1">
              {avgRating >0 ? (
                  [ ...Array(Math.round(avgRating)), ].map((_, index) => (
                      <Star size={14} className={"text-yellow-500"} key={index}/>
                  ))) : (<span>No ratings</span> )}
              </div>
              <h3 className={"font-semibold text-lg"}>
                {driver?.first_name} {driver?.last_name}
              </h3>
            </div>

          </div>
          {!trip.status &&<Button>Book</Button>}
        </div>
      </div>
      <div className={"bg-white shadow rounded-lg flex flex-col p-8 gap-8"}>
        <h2 className={"uppercase text-xl font-semibold"}>Reviews</h2>
        {reviews.length ? (
          <ul className={"flex flex-col gap-8"}>
            {reviews.map((review, index) => (
                <li key={index} className={"flex flex-col"}>
                  <h3 className='uppercase font-semibold'>{review.name}</h3>
                  <div className="flex gap-1">
                    {review.rating ? (
                        [...Array(Math.round(review.rating)),].map((_, index) => (
                            <Star size={14} className={"text-yellow-500"} key={index}/>
                        ))) : (<span>No ratings</span>)}
                  </div>
                  <p>{review.review}</p>
                </li>
            ))}
          </ul>
        ) : (
            <div className={"flex justify-center items-center flex-col gap-8"}>
              <Image
                  src={STARS}
                  alt={"ratings"}
                  className={"h-[250px] w-auto block"}
              />
              <span className={"text-muted-foreground"}>No reviews yet</span>
          </div>
        )}
      </div>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8">
        <MessageCircle size={24} />
      </Button>
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default BookRide;
