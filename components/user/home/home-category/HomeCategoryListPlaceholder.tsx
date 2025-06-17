import CategoryCardPlaceholder from "../../categories/CategoryCardPlaceholder";

const HomeCategoryListPlaceholder = () => {
  return (
    <div className="flex flex-row gap-4 overflow-x-auto justify-start py-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <CategoryCardPlaceholder
          key={index}
          className="w-[200px] flex-shrink-0"
        />
      ))}
    </div>
  );
};

export default HomeCategoryListPlaceholder;
