import React, { ComponentProps, PropsWithChildren } from "react";

import SelectItem from "./components/Item";
import SelectLabel from "./components/Label";
import { Group, Icon, Root, Value } from "./components/radix";
import SelectContent from "./components/SelectContent";
import SelectSeparator from "./components/Separator";
import SelectTrigger from "./components/Trigger";

const Select = ({ children, ...rest }: PropsWithChildren & ComponentProps<typeof Root>) => {
  return <Root {...rest}>{children}</Root>;
};

Select.Icon = Icon;
Select.Value = Value;

Select.Group = Group;
Select.Item = SelectItem;
Select.Label = SelectLabel;
Select.Content = SelectContent;
Select.Separator = SelectSeparator;
Select.Trigger = SelectTrigger;

export default Select;
