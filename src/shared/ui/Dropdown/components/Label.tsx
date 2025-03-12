import React, { PropsWithChildren } from "react";

import { Label } from "./radix";

const DropdownLabel = ({ children }: PropsWithChildren) => (
  <Label className="mx-2 text-xs leading-6 text-color-text-default heading-03">{children}</Label>
);

export default DropdownLabel;
