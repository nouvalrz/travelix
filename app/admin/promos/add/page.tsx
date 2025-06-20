import React from "react";

import PromoForm from "@/components/admin/promos/PromoForm";

const AddPromoPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl">Add New Promo</h1>
      <div className="mt-6">
        <PromoForm />
      </div>
    </div>
  );
};

export default AddPromoPage;
