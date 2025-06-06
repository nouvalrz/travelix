import { Card, CardBody, CardFooter } from "@heroui/card";
import React from "react";
import { Avatar } from "@heroui/avatar";
import { Quote } from "lucide-react";

import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";

const reviews = [
  {
    name: "Mya Rahimia",
    profileImage: "https://xsgames.co/randomusers/avatar.php?g=female",
    review:
      "Travelix made our Bali trip absolutely perfect. From booking to confirmation, everything was smooth and incredibly fast. I especially loved how they provided detailed recommendations for local attractions and hidden gems.",
  },
  {
    name: "Arif Setiawan",
    profileImage: "https://xsgames.co/randomusers/avatar.php?g=male",
    review:
      "Using Travelix to plan our trip to Mount Bromo was the best decision we made. The platform is easy to use, and the prices were much better than other sites. Their customer support was also very responsive when we had questions.",
  },
  {
    name: "Putri Lestari",
    profileImage: "https://xsgames.co/randomusers/avatar.php?g=female",
    review:
      "I had never used an online ticketing service before, but Travelix made everything so simple. I managed to book a trip to Komodo Island for my family in just minutes. The itinerary suggestions and user-friendly interface were top-notch.",
  },
  {
    name: "Rizky Pratama",
    profileImage: "https://xsgames.co/randomusers/avatar.php?g=male",
    review:
      "Travelix really exceeded my expectations. Not only was it easy to book tickets, but the reviews and tips on the site helped us plan a better itinerary. I’ll definitely be using Travelix again for my next adventure.",
  },
  {
    name: "Sari Ayuningtyas",
    profileImage: "https://xsgames.co/randomusers/avatar.php?g=female",
    review:
      "Our trip to Yogyakarta was unforgettable, thanks to Travelix. The process was seamless, and I loved how everything was laid out clearly. It felt like having a personal travel assistant at my fingertips.",
  },
];

const HomeReviewWrapper = () => {
  return (
    <div className="px-4 pb-12">
      <div className="container mx-auto ">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold">What Our Customers Say?</h2>
          <p className="mt-2">
            Real stories from travelers who explored with us.
          </p>
        </div>
        <InfiniteMovingCards className="py-8" speed="normal">
          {reviews.map((review, index) => (
            <Card key={index} className="w-[420px]" shadow="sm">
              <CardBody>
                <Quote className="size-4" color="#0ea5e9" fill="#0ea5e9" />
                <p className="text-sm mt-1">{review.review}</p>
              </CardBody>
              <CardFooter>
                <div className="flex gap-3 items-center">
                  <Avatar src={review.profileImage} />
                  <p className="text-sm font-medium">{review.name}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </InfiniteMovingCards>
      </div>
    </div>
  );
};

export default HomeReviewWrapper;
