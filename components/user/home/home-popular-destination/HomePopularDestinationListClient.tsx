"use client";

import DestinationCard from "../../destinations/DestinationCard";

import { Destination } from "@/types/destination.type";

const HomePopularDestinationListClient = ({
  destinations,
}: {
  destinations: Destination[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
        {destinations.slice(0, 10).map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default HomePopularDestinationListClient;
