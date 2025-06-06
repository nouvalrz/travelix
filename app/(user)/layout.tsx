import React from "react";

import Navbar from "@/components/user/navbar/Navbar";
import Footer from "@/components/user/footer/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
