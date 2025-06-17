import DestinationCardPlaceholder from "../../destinations/DestinationCardPlaceholder";

const HomePopularDestinationListPlaceholder = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <DestinationCardPlaceholder key={index} />
      ))}
    </div>
  );
};

export default HomePopularDestinationListPlaceholder;
