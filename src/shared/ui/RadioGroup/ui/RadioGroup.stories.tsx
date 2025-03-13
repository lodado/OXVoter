// RadioGroup.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import RadioGroup from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "shared/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    defaultValue: "option1",
  },
  parameters: {
    docs: {
      description: {
        component: `
\`\`\`jsx
<RadioGroup defaultValue="option1">
  <RadioGroup.Label>
    <RadioGroup.Item value="option1" />
    <span>Option 1</span>
  </RadioGroup.Label>
  <RadioGroup.Label>
    <RadioGroup.Item value="option2" />
    <span>Option 2</span>
  </RadioGroup.Label>
</RadioGroup>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * ## 기본 사용법
 */
export const 기본: Story = {
  args: {
    children: (
      <>
        <RadioGroup.Label>
          <RadioGroup.Item value="option1" />
          <span>Option 1</span>
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="option2" />
          <span>Option 2</span>
        </RadioGroup.Label>
      </>
    ),
  },
};

/**
 * ## 3개의 옵션
 */
export const 세개의옵션: Story = {
  args: {
    children: (
      <>
        <RadioGroup.Label>
          <RadioGroup.Item value="option1" />
          <span>Option 1</span>
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="option2" />
          <span>Option 2</span>
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="option3" />
          <span>Option 3</span>
        </RadioGroup.Label>
      </>
    ),
  },
};

/**
 * ## 기본값 없는 경우
 */
export const 기본값없는경우: Story = {
  args: {
    defaultValue: undefined,
    children: (
      <>
        <RadioGroup.Label>
          <RadioGroup.Item value="option1" />
          <span>Option 1</span>
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="option2" />
          <span>Option 2</span>
        </RadioGroup.Label>
      </>
    ),
  },
};
