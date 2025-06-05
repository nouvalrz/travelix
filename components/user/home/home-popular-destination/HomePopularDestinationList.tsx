import HomePopularDestinationListClient from "./HomePopularDestinationListClient";

import { BASE_URL } from "@/config/credentials";
import { Destination } from "@/types/destination.type";

const HomePopularDestinationList = async () => {
  const response = await fetch(BASE_URL + "/api/proxy/activities", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const destinations = (await response.json()).data as Destination[];

  return <HomePopularDestinationListClient destinations={destinations} />;
};

export default HomePopularDestinationList;
