import React from "react";

import ProfileForm from "@/components/auth/ProfileForm";
import { getAuthUser } from "@/lib/data/server/authUser";

export const metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const authUser = await getAuthUser();

  return (
    <div className="mt-2">
      <h1 className="font-bold text-xl">Your Profile</h1>
      <div className="mt-4">
        <ProfileForm user={authUser!} />
      </div>
    </div>
  );
};

export default ProfilePage;
