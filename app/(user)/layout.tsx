import React from "react";

import Navbar from "@/components/user/navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
