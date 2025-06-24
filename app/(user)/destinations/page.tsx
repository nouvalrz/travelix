import DestinationsPageClient from "@/components/user/destinations/DestinationsPageClient";
import { BASE_URL } from "@/config/credentials";
import { Destination } from "@/types/destination.type";

export const metadata = {
  title: "Destinations",
};

const DestinationsPage = async () => {
  const response = await fetch(BASE_URL + "/api/proxy/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const destinations = (await response.json()).data as Destination[];

  return <DestinationsPageClient destinations={destinations} />;
};

export default DestinationsPage;
