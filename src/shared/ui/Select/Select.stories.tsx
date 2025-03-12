import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown } from "lucide-react";
import React from "react";

import Select from "./Select";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Select> = {
  title: "example/Select",
  component: Select,
  argTypes: {},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const SelectExample: Story = {
  args: {
    children: (
      <>
        <Select defaultValue="apple">
          <Select.Trigger className="min-w-[10rem]">
            <Select.Value placeholder={""} />
            <Select.Icon className="SelectIcon">
              <ChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="min-w-[10rem]">
            <Select.Group>
              <Select.Label>Fruits</Select.Label>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="grapes">Grapes</Select.Item>
              <Select.Item value="pineapple">Pineapple</Select.Item>
            </Select.Group>

            <Select.Separator />

            <Select.Group>
              <Select.Label>Vegetables</Select.Label>
              <Select.Item value="aubergine">Aubergine</Select.Item>
              <Select.Item value="broccoli">Broccoli</Select.Item>
              <Select.Item value="carrot" disabled>
                Carrot
              </Select.Item>
              <Select.Item value="courgette">Courgette</Select.Item>
              <Select.Item value="leek">Leek</Select.Item>
            </Select.Group>

            <Select.Separator />

            <Select.Group>
              <Select.Label>Meat</Select.Label>
              <Select.Item value="beef">Beef</Select.Item>
              <Select.Item value="chicken">Chicken</Select.Item>
              <Select.Item value="lamb">Lamb</Select.Item>
              <Select.Item value="pork">Pork</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select>
      </>
    ),
  },
};
