"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to check if the component is on its initial mount.
 * @returns boolean - `true` if this is the mount, `false` otherwise.
 */
const useIsMount = (): boolean => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount;
};

export default useIsMount;
