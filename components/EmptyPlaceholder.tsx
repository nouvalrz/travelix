/* eslint-disable @next/next/no-img-element */
const EmptyPlaceholder = ({
  title = "Ups... no result found",
  description = "Please try another search",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <img alt="empty" className="w-60 h-auto" src="/svg/empty.svg" />
      <p className="mt-6 font-bold text-xl">{title}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default EmptyPlaceholder;
