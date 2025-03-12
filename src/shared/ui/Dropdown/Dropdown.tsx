import React, { ComponentProps, PropsWithChildren } from 'react'

import { Content, Item, Root, Sub } from "./components";
import DropdownLabel from "./components/Label";
import { DropdownRootProps } from "./components/Root";
import DropdownSeparator from "./components/Separator";
import DropdownTrigger, { DropdownSubTrigger } from "./components/Trigger";

export interface DropdownProps extends PropsWithChildren, DropdownRootProps {}

const Dropdown = ({ children, isVisible, setVisible }: DropdownProps) => {
  return (
    <Root isVisible={isVisible} setVisible={setVisible}>
      {children}
    </Root>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = Content;
Dropdown.Item = Item;
Dropdown.Separator = DropdownSeparator;
Dropdown.Label = DropdownLabel;
Dropdown.SubTrigger = DropdownSubTrigger;
Dropdown.Sub = Sub;

export default Dropdown
