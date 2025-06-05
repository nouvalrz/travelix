import { useEffect, useState } from "react";

export const useHorizontalScroll = ({
  scrollElementRef,
  scrollDistance,
}: {
  scrollElementRef: React.MutableRefObject<HTMLDivElement | null>;
  scrollDistance: number;
}) => {
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(true);

  const goLeft = () => {
    scrollElementRef.current?.scrollBy({
      left: scrollDistance * -1,
      behavior: "smooth",
    });
  };

  const goRight = () => {
    scrollElementRef.current?.scrollBy({
      left: scrollDistance,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    if (!scrollElementRef.current) {
      return;
    }

    setShowLeft(scrollElementRef.current.scrollLeft > 0);
    setShowRight(
      scrollElementRef.current.scrollLeft +
        scrollElementRef.current.clientWidth <
        scrollElementRef.current.scrollWidth
    );
  };

  useEffect(() => {
    const el = scrollElementRef.current;

    if (!el) return;

    checkScroll();

    const handleScroll = () => {
      checkScroll();
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    goLeft,
    goRight,
    showLeft,
    showRight,
  };
};
