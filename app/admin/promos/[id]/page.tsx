import React from "react";

import PromoForm from "@/components/admin/promos/PromoForm";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Promo } from "@/types/promo.type";

export const metadata = {
  title: "Edit Promo",
};

const EditPromoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetchApiFromServer("/promo/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const promo = (await response.json()).data as Promo;

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Edit Promo : <span className="text-primary">{promo.title}</span>
      </h1>
      <div className="mt-6">
        <PromoForm promo={promo} submitTitle="Update Promo" />
      </div>
    </div>
  );
};

export default EditPromoPage;
