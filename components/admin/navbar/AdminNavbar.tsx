import AdminNavbarClient from "./AdminNavbarClient";

import { getAuthUser } from "@/lib/data/server/authUser";

const AdminNavbar = async () => {
  const authUser = await getAuthUser();

  return <AdminNavbarClient authUser={authUser!} />;
};

export default AdminNavbar;
