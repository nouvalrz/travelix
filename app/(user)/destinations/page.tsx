import DestinationsPageClient from "@/components/user/destinations/DestinationsPageClient";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Destination } from "@/types/destination.type";

export const metadata = {
  title: "Destinations",
};

const DestinationsPage = async () => {
  const response = await fetchApiFromServer("/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 5,
    },
  });

  const destinations = (await response.json()).data as Destination[];

  return <DestinationsPageClient destinations={destinations} />;
};

export default DestinationsPage;
