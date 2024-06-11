// pages/book-ride.tsx
"use client";

import { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import STARS from "@/assets/img/reviews.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChatSidebar from "@/components/ChatSidebar";

interface REVIEW {
  name: string;
  rating: number;
  review: string;
}

const BookRide = () => {
  const [driver, setDriver] = useState<{
    first_name?: string;
    last_name?: string;
    photo?: string;
  }>({});
  const [trip, setTrip] = useState<{
    from?: string;
    to?: string;
    time?: string;
  }>({});
  const [reviews, setReviews] = useState<REVIEW[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className={"h-full flex flex-col gap-8"}>
      <div className={"bg-white p-4 rounded shadow flex flex-col"}>
        <p className={"text-xs text-muted-foreground"}>Dep: {trip.time}</p>
        <h3 className={"font-semibold text-lg"}>
          {trip.from} - {trip.to}
        </h3>
        <div className={"flex flex-col gap-4 w-max pt-8"}>
          <div className={"flex items-end gap-4"}>
            <div className={"w-[100px] h-[100px] rounded bg-slate-100"}></div>
            <p className={"flex gap-1"}>
              {reviews.length ? (
                [
                  ...Array(
                    Math.round(
                      reviews.reduce((sum, review) => sum + review.rating, 0) /
                        reviews.length
                    )
                  ),
                ].map((_, index) => (
                  <Star size={18} className={"text-yellow-500"} key={index} />
                ))
              ) : (
                <span>No rating</span>
              )}
            </p>
            <h3 className={"font-semibold text-lg"}>
              {driver?.first_name} {driver?.last_name}
            </h3>
          </div>
          <Button>Book</Button>
        </div>
      </div>
      <div className={"bg-white shadow rounded-lg flex flex-col p-8 gap-8"}>
        <h2 className={"uppercase text-xl font-semibold"}>Reviews</h2>
        {reviews.length ? (
          <ul className={"flex flex-col gap-8"}>
            {reviews.map((review, index) => (
              <li key={index} className={"flex flex-col"}>
                <p>{review.name}</p>
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
