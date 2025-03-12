import type { Meta, StoryObj } from "@storybook/react";

import Skeleton from "./Skeleton";

const meta: Meta = {
  title: "Example/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Example = () => {
  return <Skeleton className="w-[200px] h-[50px]" />;
};
