// TooltipExample.stories.tsx

import { Meta } from "@storybook/react";
import React from "react";

import { TooltipContent } from "./components/compound";
import Tooltip from "./Tooltip";

interface TooltipExampleProps {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  [key: string]: any;
}

const TooltipExample: React.FC<TooltipExampleProps> = ({ side = "left", align = "center", ...rest }) => {
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger>
        <button type="button">hover me!</button>
      </Tooltip.Trigger>

      <Tooltip.Content side={side} align={align}>
        Max width of tooltips is 240px - wrap text if necessary.
      </Tooltip.Content>
    </Tooltip>
  );
};

export default {
  title: "Example/Tooltip",
  component: TooltipContent,

  tags: ["autodocs"],

  argTypes: {
    side: {
      control: {
        type: "select",
        options: ["top", "right", "bottom", "left"],
      },
    },
    align: {
      control: {
        type: "select",
        options: ["start", "center", "end"],
      },
    },
  },
} as Meta;

export const BasicTooltipExample = ({ side = "left", align = "center", variant = "primary", ...rest }: any) => {
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger>
        <button className="" type="button">
          hover me!
        </button>
      </Tooltip.Trigger>

      <Tooltip.Content side={side} align={align} variant={variant}>
        Max width of tooltips is 240px - wrap text if necessary.
      </Tooltip.Content>
    </Tooltip>
  );
};

const Template = (args: any) => <TooltipExample {...args} />;

export const primary = Template.bind({});
