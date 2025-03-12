import React, { PropsWithChildren } from "react";

import { Label } from "./radix";

const SelectLabel = ({ children }: PropsWithChildren) => (
  <Label className="px-2 text-xs leading-6 text-color-text-default heading-03">{children}</Label>
);

export default SelectLabel;
