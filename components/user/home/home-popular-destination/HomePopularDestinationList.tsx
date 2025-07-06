import HomePopularDestinationListClient from "./HomePopularDestinationListClient";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Destination } from "@/types/destination.type";

const HomePopularDestinationList = async () => {
  const response = await fetchApiFromServer("/activities", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 60 * 5,
    },
  });

  const destinations = (await response.json()).data as Destination[];

  return <HomePopularDestinationListClient destinations={destinations} />;
};

export default HomePopularDestinationList;
