import React from "react";

import PromoCardPlaceholder from "./PromoCardPlaceholder";

const PromoListPlaceholder = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <PromoCardPlaceholder key={index} />
      ))}
    </div>
  );
};

export default PromoListPlaceholder;
