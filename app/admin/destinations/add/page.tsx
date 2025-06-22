import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Category } from "@/types/category.type";
import DestinationForm from "@/components/admin/destinations/DestinationForm";

const AddDestinationPage = async () => {
  const response = await fetchApiFromServer("/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const categories = (await response.json()).data as Category[];

  return (
    <div>
      <h1 className="font-semibold text-xl">Add New Destination</h1>
      <div className="mt-6">
        <DestinationForm
          categories={categories}
          submitTitle="Add Destination"
        />
      </div>
    </div>
  );
};

export default AddDestinationPage;
