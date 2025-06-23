import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Destination } from "@/types/destination.type";
import DestinationForm from "@/components/admin/destinations/DestinationForm";
import { Category } from "@/types/category.type";

const EditDestinationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const destinationResponse = await fetchApiFromServer("/activity/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const destination = (await destinationResponse.json()).data as Destination;

  const categoriesResponse = await fetchApiFromServer("/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const categories = (await categoriesResponse.json()).data as Category[];

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Edit destination :{" "}
        <span className="text-primary">{destination.title}</span>
      </h1>
      <div className="mt-6">
        <DestinationForm
          categories={categories}
          destination={destination}
          submitTitle="Update destination"
        />
      </div>
    </div>
  );
};

export default EditDestinationPage;
