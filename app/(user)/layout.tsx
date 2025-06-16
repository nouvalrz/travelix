import React from "react";

import Navbar from "@/components/user/navbar/Navbar";
import Footer from "@/components/user/footer/Footer";
import { getAuthUser } from "@/lib/data/server/authUser";
import LoggedUserHydrator from "@/components/LoggedUserHydrator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const authUser = await getAuthUser();

  return (
    <div className="flex flex-col min-h-screen">
      <LoggedUserHydrator user={authUser} />
      <Navbar authUser={authUser} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
