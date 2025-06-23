import DestinationDetailPageClient from "@/components/user/destinations/destination-detail/DestinationDetailPageClient";
import { BASE_URL } from "@/config/credentials";
import { Destination } from "@/types/destination.type";

type DestinationDetailProps = {
  params: Promise<{ id: string }>;
};

const DestinationDetailPage = async ({ params }: DestinationDetailProps) => {
  const { id } = await params;

  const response = await fetch(BASE_URL + "/api/proxy/activity/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const destination = (await response.json()).data as Destination;

  return <DestinationDetailPageClient destination={destination} />;
};

export default DestinationDetailPage;
