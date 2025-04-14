import { Meta, StoryObj } from "@storybook/react";

import LanguageSelector from "./LanguageSelector";

const meta: Meta<typeof LanguageSelector> = {
  title: "features/LanguageSelector",
  component: LanguageSelector,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
\`\`\`jsx
import LanguageSelector from "@/components/LanguageSelector";
// 컴포넌트 사용 예시
<LanguageSelector />
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSelector>;

/**
 * ## 기본 사용법
 *
 * LanguageSelector 컴포넌트의 기본 렌더링 예시입니다.
 */
export const Default: Story = {};
