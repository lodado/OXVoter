"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

const useScrollDirection = (offset = 0) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (Math.abs(currentScrollY - lastScrollY) > offset) {
        setScrollDirection(direction);
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [offset]);

  return { scrollDirection };
};

export default useScrollDirection;
