// Progress.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Progress from "./ProgressBar";

const meta: Meta<typeof Progress> = {
  title: "Shared/ProgressBar",
  component: Progress,
  tags: ["autodocs"],
  args: {
    value: 50,
  },
  parameters: {
    docs: {
      description: {
        component: `
\`\`\`jsx
import { Progress } from "./Progress";

<Progress value={50} />
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * ## 기본 사용법
 */
export const 기본: Story = {
  args: {
    value: 50,
  },
};

/**
 * ## 75% 진행률
 */
export const 진행률75퍼센트: Story = {
  args: {
    value: 75,
  },
};

/**
 * ## 100% 진행률
 */
export const 완료: Story = {
  args: {
    value: 100,
  },
};
