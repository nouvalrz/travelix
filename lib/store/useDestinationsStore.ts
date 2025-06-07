import { create } from "zustand";

import { fetchCategories } from "../data/client/categories";

import { Destination } from "@/types/destination.type";
import { Category } from "@/types/category.type";

export enum DestinationSorts {
  DEFAULT = "Most Relevant",
  PRICE_ASC = "Lowest Price",
  PRICE_DESC = "Highest Price",
  RATING_DESC = "Highest Rate",
  RATING_ASC = "Lowest Rate",
}

type DestinationsStore = {
  // Destinations
  destinations: Destination[];
  destinationQueryResults: Destination[];
  destinationsLoading: boolean;
  setDestinations: (destinations: Destination[]) => void;

  // Categories
  categories: Category[];
  fetchCategory: () => Promise<void>;
  categoriesLoading: boolean;

  // Query : search
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;

  // Query : pagination
  paginationLimit: number;
  setPaginationLimit: (value: number) => void;
  paginationCurrent: number;
  setPaginationCurrent: (value: number) => void;

  // Query : filter by category
  categorySelected: string;
  setCategorySelected: (value: string) => void;

  // Query : filter by price range
  minPriceSelected: number;
  maxPriceSelected: number;
  setMinPriceSelected: (value: number) => void;
  setMaxPriceSelected: (value: number) => void;
  resetPriceSelected: () => void;

  // Sort
  sortSelected: DestinationSorts;
  setSortSelected: (value: DestinationSorts) => void;
};

export const useDestinationsStore = create<DestinationsStore>((set) => {
  return {
    // Destinations
    destinations: [],
    destinationQueryResults: [],
    destinationsLoading: true,
    setDestinations: (destinations) => {
      set({ destinationsLoading: true });

      set({ destinations: destinations });
      set({ destinationQueryResults: destinations });

      set({ destinationsLoading: false });
    },

    // Categories
    categories: [],
    categoriesLoading: true,
    fetchCategory: async () => {
      set({ categoriesLoading: true });

      const response = await fetchCategories();
      const categories = response.data as Category[];

      set({ categories: categories });

      set({ categoriesLoading: false });
    },

    // Query : search
    searchKeyword: "",
    setSearchKeyword: (value) => set({ searchKeyword: value }),

    // Query : pagination
    paginationLimit: 9,
    setPaginationLimit: (value) => set({ paginationLimit: value }),
    paginationCurrent: 1,
    setPaginationCurrent: (value) => set({ paginationCurrent: value }),

    // Query : filter by category
    categorySelected: "",
    setCategorySelected: (value) => set({ categorySelected: value }),

    // Query : filter by price range
    minPriceSelected: 0,
    maxPriceSelected: 5_000_000,
    setMinPriceSelected: (value) => set({ minPriceSelected: value }),
    setMaxPriceSelected: (value) => set({ maxPriceSelected: value }),
    resetPriceSelected: () => {
      set({ minPriceSelected: 0 });
      set({ maxPriceSelected: 5_000_000 });
    },

    // Sort
    sortSelected: DestinationSorts.DEFAULT,
    setSortSelected: (value) => set({ sortSelected: value }),
  };
});
