import { create } from "zustand";

type CategoriesStore = {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set, get) => {
  return {
    searchKeyword: "",
    setSearchKeyword: (value) => set({ searchKeyword: value }),
  };
});
