import { useEffect, useState } from "react";

export const useScrollObserver = (
  elementRef: React.RefObject<HTMLElement>,
  offset: number = -100
) => {
  const [isOutView, setIsOutView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsOutView(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: `${offset}px 0px 0px 0px` }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, offset]);

  return isOutView;
};
