"use client";

import React, { useEffect, useState } from "react";

import { noop } from "../utils";

export type useIsClientParams = Function;

const useIsClient = (callback: Function = noop) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    callback();
  }, []);

  return isClient;
};
export default useIsClient;
