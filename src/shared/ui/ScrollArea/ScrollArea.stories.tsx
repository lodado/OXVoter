// ScrollArea.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "shared/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  args: {
    style: { width: "300px", height: "200px" },
  },
  parameters: {
    docs: {
      description: {
        component: `
\`\`\`jsx
<ScrollArea style={{ width: "300px", height: "200px" }}>
  <div style={{ height: "400px", background: "linear-gradient(180deg, #fff, #ccc)" }}>
    Scrollable content goes here...
  </div>
</ScrollArea>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

/**
 * ## 기본 스크롤 영역 예제
 *
 * 간단한 스크롤 가능 영역을 구현합니다.
 */
export const Basic: Story = {
  args: {
    children: (
      <div style={{ height: "400px", background: "linear-gradient(180deg, #fff, #ccc)" }}>
        Scrollable content goes here...
      </div>
    ),
  },
};

/**
 * ## 긴 컨텐츠 스크롤 예제
 *
 * 긴 컨텐츠가 있을 때 스크롤이 어떻게 작동하는지 보여줍니다.
 */
export const LongContent: Story = {
  args: {
    children: (
      <div style={{ height: "800px", background: "linear-gradient(180deg, #fff, #aaa)" }}>
        Very long scrollable content goes here...
      </div>
    ),
  },
};
