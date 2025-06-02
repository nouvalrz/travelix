import { Destination } from "./destination.type";

export type Cart = {
  id: string;
  userId: string;
  activityId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  activity: Destination;
};
