import React from "react";

import DestinationCardPlaceholder from "../destinations/DestinationCardPlaceholder";

const FeaturedCategoryPlaceholder = () => {
  return (
    <div className="px-4 py-6">
      <div className="mx-auto container">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <DestinationCardPlaceholder key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategoryPlaceholder;
