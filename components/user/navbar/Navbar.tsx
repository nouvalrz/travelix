import NavbarClient from "./NavbarClient";

import { getAuthUser } from "@/lib/data/server/authUser";

const Navbar = async () => {
  const authUser = await getAuthUser();

  return <NavbarClient authUser={authUser} />;
};

export default Navbar;
