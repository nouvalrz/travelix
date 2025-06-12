import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useRouter, useSearchParams } from "next/navigation";

import {
  DestinationSorts,
  useDestinationsStore,
} from "../store/useDestinationsStore";

// state to url
export const useDestinationQueryUrlBindingFromStore = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    setTimeout(() => {
      const unsub = useDestinationsStore.subscribe(
        (state) => ({
          searchKeyword: state.searchKeyword,
          categorySelected: state.categorySelected,
          sortSelected: state.sortSelected,
          minPriceSelected: state.minPriceSelected,
          maxPriceSelected: state.maxPriceSelected,
          paginationCurrent: state.paginationCurrent,
        }),
        (selected) => {
          // search
          if (selected.searchKeyword.trim()) {
            currentSearchParams.set("keyword", selected.searchKeyword);
          } else {
            currentSearchParams.delete("keyword");
          }

          // category
          if (selected.categorySelected) {
            currentSearchParams.set("category", selected.categorySelected);
          } else {
            currentSearchParams.delete("category");
          }

          // sort
          currentSearchParams.set("sort", selected.sortSelected);

          // price range
          if (selected.minPriceSelected > 0) {
            currentSearchParams.set(
              "minPrice",
              selected.minPriceSelected.toString()
            );
          } else {
            currentSearchParams.delete("minPrice");
          }

          if (selected.maxPriceSelected < 5_000_000) {
            currentSearchParams.set(
              "maxPrice",
              selected.maxPriceSelected.toString()
            );
          } else {
            currentSearchParams.delete("maxPrice");
          }

          currentSearchParams.set(
            "page",
            selected.paginationCurrent.toString()
          );

          const newCurrentSearchParams = `?${currentSearchParams.toString()}`;

          if (newCurrentSearchParams !== window.location.search) {
            router.push(`?${currentSearchParams.toString()}`, {
              scroll: false,
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        },
        { equalityFn: shallow }
      );

      return () => unsub();
    }, 10);
  }, []);
};

// url to state
export const useDestinationQueryUrlBindingToStore = () => {
  const {
    setSearchKeyword,
    setCategorySelected,
    setSortSelected,
    setMinPriceSelected,
    setMaxPriceSelected,
    setPaginationCurrent,
  } = useDestinationsStore();

  const searchParams = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      const keyword = searchParams.get("keyword");
      const category = searchParams.get("category");
      const sort = searchParams.get("sort");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const page = searchParams.get("page");

      if (keyword) setSearchKeyword(keyword);
      if (category) setCategorySelected(category);
      if (sort) setSortSelected(sort as DestinationSorts);
      if (minPrice) setMinPriceSelected(Number(minPrice));
      if (maxPrice) setMaxPriceSelected(Number(maxPrice));
      if (page) setPaginationCurrent(Number(page));
    }, 5);
  }, []);
};
