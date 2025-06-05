import { Category } from "./category.type";

export type Destination = {
  imageUrls: string[];
  id: string;
  categoryId: string;
  category?: Category;
  title: string;
  description: string;
  price: number;
  price_discount: number;
  rating: number;
  total_reviews: number;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
  createdAt: string;
  updatedAt: string;
};
