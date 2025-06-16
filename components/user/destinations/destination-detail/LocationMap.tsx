import React from "react";

function LocationMap({ maps }: { maps: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: maps,
      }}
      className="mt-4 maps-wrapper"
    />
  );
}

export default React.memo(LocationMap);
