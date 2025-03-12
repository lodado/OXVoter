import { cloneElement } from "react";

import { useDebouncedQueryInvalidate } from "../hooks";

export default function RefetchContainer({ children, queryKey }: { children: JSX.Element; queryKey?: string }) {
  const { debouncedQueryInvalidate } = useDebouncedQueryInvalidate({ queryKey: queryKey! });

  return cloneElement(children, { onClick: () => debouncedQueryInvalidate() });
}
