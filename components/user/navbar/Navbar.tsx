import NavbarClient from "./NavbarClient";

import { AuthUserType } from "@/types/authUser.type";

const Navbar = async ({ authUser }: { authUser: AuthUserType | null }) => {
  return <NavbarClient authUser={authUser} />;
};

export default Navbar;
