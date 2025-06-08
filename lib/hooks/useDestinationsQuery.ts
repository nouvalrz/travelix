import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import {
  useDestinationsStore,
  DestinationSorts,
} from "../store/useDestinationsStore";

export const useDestinationQuery = () => {
  useEffect(() => {
    const unsub = useDestinationsStore.subscribe(
      (state) => ({
        searchKeyword: state.searchKeyword,
        categorySelected: state.categorySelected,
        sortSelected: state.sortSelected,
        minPriceSelected: state.minPriceSelected,
        maxPriceSelected: state.maxPriceSelected,
        destinations: state.destinations,
      }),
      (selected) => {
        let results = [...selected.destinations];

        if (selected.searchKeyword.trim()) {
          results = results.filter((dest) =>
            dest.title
              .toLowerCase()
              .includes(selected.searchKeyword.toLowerCase())
          );
        }

        if (selected.categorySelected) {
          results = results.filter(
            (dest) => dest.categoryId === selected.categorySelected
          );
        }

        results = results.filter(
          (dest) =>
            (dest.price_discount || dest.price) >= selected.minPriceSelected &&
            (dest.price_discount || dest.price) <= selected.maxPriceSelected
        );

        switch (selected.sortSelected) {
          case DestinationSorts.PRICE_DESC:
            results.sort(
              (a, b) =>
                (b.price_discount || b.price) - (a.price_discount || a.price)
            );
            break;
          case DestinationSorts.PRICE_ASC:
            results.sort(
              (a, b) =>
                (a.price_discount || a.price) - (b.price_discount || b.price)
            );
            break;
          case DestinationSorts.RATING_DESC:
            results.sort((a, b) => b.rating - a.rating);
            break;
          case DestinationSorts.RATING_ASC:
            results.sort((a, b) => a.rating - b.rating);
            break;
          default:
            break;
        }

        useDestinationsStore.setState({
          destinationQueryResults: results,
          paginationCurrent: 1,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      {
        equalityFn: shallow,
      }
    );

    return () => unsub();
  }, []);
};
