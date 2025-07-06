import DestinationDetailPageClient from "@/components/user/destinations/destination-detail/DestinationDetailPageClient";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Destination } from "@/types/destination.type";

type DestinationDetailProps = {
  params: Promise<{ id: string }>;
};

const fetchDestination = async (id: string): Promise<Destination> => {
  const response = await fetchApiFromServer("/activity/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return (await response.json()).data;
};

export const generateMetadata = async ({ params }: DestinationDetailProps) => {
  const { id } = await params;
  const destination = await fetchDestination(id);

  return {
    title: `${destination.title}`,
    description: `${destination.description}`,
  };
};

const DestinationDetailPage = async ({ params }: DestinationDetailProps) => {
  const { id } = await params;

  const destination = await fetchDestination(id);

  return <DestinationDetailPageClient destination={destination} />;
};

export default DestinationDetailPage;
