import React from "react";

import PromoCardPlaceholder from "../../promos/PromoCardPlaceholder";

const HomePromoListPlaceholder = () => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto py-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <PromoCardPlaceholder key={index} className="flex-shrink-0 w-[320px]" />
      ))}
    </div>
  );
};

export default HomePromoListPlaceholder;
