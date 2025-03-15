"use client";

import React, { useLayoutEffect } from "react";

import { vhCode } from "./utils";

const LayoutEffectVhContainer = () => {
  useLayoutEffect(() => {
    vhCode();
  }, [typeof window !== undefined || window.location.pathname]);

  return <></>;
};

export default LayoutEffectVhContainer;
