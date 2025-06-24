import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { Banner } from "@/types/banner.type";
import BannerForm from "@/components/admin/banners/BannerForm";

export const metadata = {
  title: "Edit Banner",
};

const EditBannerPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetchApiFromServer("/banner/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const banner = (await response.json()).data as Banner;

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Edit Banner : <span className="text-primary">{banner.name}</span>
      </h1>
      <div className="mt-6">
        <BannerForm banner={banner} submitTitle="Update Banner" />
      </div>
    </div>
  );
};

export default EditBannerPage;
