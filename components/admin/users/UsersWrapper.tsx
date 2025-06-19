import React from "react";

import UsersClient from "./UsersClient";

import { fetchApiFromServer } from "@/lib/fetchApi";
import { User } from "@/types/user.type";

const UsersWrapper = async () => {
  const response = await fetchApiFromServer("/all-user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60 * 5,
    },
  });

  const users = (await response.json()).data as User[];

  return <UsersClient users={users} />;
};

export default UsersWrapper;
