import { Label } from "@radix-ui/react-dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown } from "lucide-react";
import React from "react";

import Dropdown from "./Dropdown";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Dropdown> = {
  title: "example/Dropdown",
  component: Dropdown,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const DropdownExample: Story = {
  args: {
    children: (
      <>
        <Dropdown>
          <Dropdown.Trigger className="w-[15rem]">trigger dropdown !</Dropdown.Trigger>
          <Dropdown.Content className="w-[15rem]">
            <Dropdown.Item>Item 11</Dropdown.Item>
            <Dropdown.Item>Item 21</Dropdown.Item>
            <Dropdown.Item>Item 31</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Item 41</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </>
    ),
  },
};

export const Template2 = () => (
  <Dropdown>
    <Dropdown.Trigger asChild>
      <button type="button"> select! </button>
    </Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Label>과일 선택</Dropdown.Label>
      <Dropdown.Item>사과</Dropdown.Item>
      <Dropdown.Item>바나나</Dropdown.Item>
      <Dropdown.Item>체리</Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Label>채소 선택</Dropdown.Label>
      <Dropdown.Item>당근</Dropdown.Item>
      <Dropdown.Item>오이</Dropdown.Item>
    </Dropdown.Content>
  </Dropdown>
);
