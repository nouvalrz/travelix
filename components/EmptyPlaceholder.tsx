import clsx from "clsx";

/* eslint-disable @next/next/no-img-element */
const EmptyPlaceholder = ({
  title = "Ups... no result found",
  description = "Please try another search",
  imageClassName,
}: {
  title?: string;
  description?: string;
  imageClassName?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <img
        alt="empty"
        className={clsx("w-60 h-auto", imageClassName)}
        src="/svg/empty.svg"
      />
      <p className="mt-6 font-bold text-xl">{title}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default EmptyPlaceholder;
