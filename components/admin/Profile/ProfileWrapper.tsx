import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import ProfileForm from "@/components/auth/ProfileForm";
import { User } from "@/types/user.type";

const ProfileWrapper = async () => {
  const response = await fetchApiFromServer("/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const user = (await response.json()).data as User;

  return (
    <div className="mt-6">
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfileWrapper;
