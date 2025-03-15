"use client";

import { useEffect, useLayoutEffect } from "react";

function vhCode() {
  // Safe area insets

  if (typeof window === "undefined") return;


  const safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-top")) || 0;
  const safeAreaBottom =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-bottom")) || 0;

  // Calculate vh minus safe areas
  const adjustedVh = (window.innerHeight - safeAreaTop - safeAreaBottom) * 0.01;

  document.documentElement.style.setProperty("--vh", adjustedVh + "px");
}

function viewportCode() {
  let prevVisualViewport = 0;

  function handleVisualViewportResize() {
    const currentVisualViewport = window!.visualViewport!.height;

    if (prevVisualViewport - 30 > currentVisualViewport && prevVisualViewport - 100 < currentVisualViewport) {
      const scrollHeight = window!.document!.scrollingElement!.scrollHeight;
      const scrollTop = scrollHeight - window.visualViewport!.height;

      window.scrollTo(0, scrollTop); // 입력창이 키보드에 가려지지 않도록 조절
    }

    prevVisualViewport = window.visualViewport!.height;
  }

  window.visualViewport!.onresize = handleVisualViewportResize;
}

const ScreenVhScript = ({ nonce }: { nonce: string }) => {
  useLayoutEffect(() => {
    vhCode();
    window.addEventListener("resize", vhCode);
    return () => {
      window.removeEventListener("resize", vhCode);
    };
  }, [typeof window !== undefined || window.location.pathname]);

  return (
    <>
      <script type="text/javascript" nonce={nonce} dangerouslySetInnerHTML={{ __html: `(${vhCode})();` }} />
      <script type="text/javascript" nonce={nonce} dangerouslySetInnerHTML={{ __html: `(${viewportCode})();` }} />
    </>
  );
};

export default ScreenVhScript;
