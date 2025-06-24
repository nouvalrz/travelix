import React from "react";

import BannerForm from "@/components/admin/banners/BannerForm";

export const metadata = {
  title: "Add Banner",
};

const AddBannerPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Add New Banner</h1>
      <div className="mt-6">
        <BannerForm submitTitle="Add Banner" />
      </div>
    </div>
  );
};

export default AddBannerPage;
