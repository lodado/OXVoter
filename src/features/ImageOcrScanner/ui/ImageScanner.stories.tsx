// ImageScanner.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ImageOcrScanner from "./ImageOcrScanner";

const meta: Meta<typeof ImageOcrScanner> = {
  title: "Components/ImageScanner",
  component: ImageOcrScanner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ImageScanner 컴포넌트는 이미지를 업로드하고, 해당 이미지에서 텍스트를 추출하여 단어를 선택하고 추가할 수 있는 기능을 제공합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageOcrScanner>;

/**
 * 기본적인 ImageScanner 컴포넌트 사용 예시입니다.
 */
export const Default: Story = {
  render: (args) => <ImageOcrScanner {...args} />,
};
