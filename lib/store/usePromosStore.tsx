import { create } from "zustand";

type PromosStore = {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
};

export const usePromosStore = create<PromosStore>((set, get) => {
  return {
    searchKeyword: "",
    setSearchKeyword: (value) => set({ searchKeyword: value }),
  };
});
