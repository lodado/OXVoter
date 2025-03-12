"use client";

import { useEffect } from "react";

interface ScrollLockProps {
  children: React.ReactNode;
}

const ScrollLock: React.FC<ScrollLockProps> = ({ children }) => {
  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    const scrollPosition = window?.pageYOffset || document.documentElement.scrollTop;

    body.style.overflow = "hidden";

    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.removeProperty("overflow");
      body.style.removeProperty("pointer-events");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      window.scrollTo(0, scrollPosition);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollLock;
