import { Pagination } from "@heroui/pagination";

import DestinationCard from "./DestinationCard";

import { useDestinationsStore } from "@/lib/store/useDestinationsStore";

const DestinationPaginatedList = () => {
  const {
    destinationQueryResults,
    paginationLimit,
    paginationCurrent,
    getPageTotal,
    setPaginationCurrent,
  } = useDestinationsStore();

  const start = (paginationCurrent - 1) * paginationLimit;
  const paginatedResults = destinationQueryResults.slice(
    start,
    start + paginationLimit
  );

  const handlePageChange = (page: number) => {
    setPaginationCurrent(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {paginatedResults.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
      {paginatedResults.length > 0 && (
        <div className="flex justify-end mt-4">
          <Pagination
            showControls
            page={paginationCurrent}
            total={getPageTotal()}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default DestinationPaginatedList;
