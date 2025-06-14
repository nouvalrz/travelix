import React from "react";

import MeSidebarClient from "./MeSidebarClient";

import { getAuthUser } from "@/lib/data/server/authUser";

const MeSidebar = async () => {
  const authUser = await getAuthUser();

  return <MeSidebarClient authUser={authUser!} />;
};

export default MeSidebar;
