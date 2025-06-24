import React from "react";

import { fetchApiFromServer } from "@/lib/fetchApi";
import ProfileForm from "@/components/auth/ProfileForm";
import { User } from "@/types/user.type";

export const metadata = {
  title: "Edit User",
};

const EditUserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetchApiFromServer("/all-user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const users = (await response.json()).data as User[];
  const user = users.find((user) => user.id === id);

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Edit User : <span className="text-primary">{user!.name}</span>
      </h1>
      <div className="mt-6">
        <ProfileForm isAdmin user={user!} />
      </div>
    </div>
  );
};

export default EditUserPage;
