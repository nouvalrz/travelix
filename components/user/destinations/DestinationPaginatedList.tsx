import { Pagination } from "@heroui/pagination";

import DestinationCard from "./DestinationCard";

import { useDestinationsStore } from "@/lib/store/useDestinationsStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";

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
  };

  return (
    <>
      {paginatedResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4 mt-4">
          {paginatedResults.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[600px]">
          <EmptyPlaceholder />
        </div>
      )}
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
