// Banner.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Banner, { BannerProps } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Features/Banner",
  component: Banner,
  tags: ["autodocs"],
  args: {
    id: "1",
    name: "Hero Banner",
    description: "This is a description for the hero banner.",
    color: "#ff0000",
    specialAbility: "Flying",

    onEdit: (role: BannerProps) => console.log("Edit Role:", role),
    onDelete: (roleId: string) => console.log("Delete Role:", roleId),
  },
  parameters: {
    docs: {
      description: {
        component: `
\`\`\`jsx
<Banner
  id="1"
  name="Hero Banner"
  description="This is a description for the hero banner."
  color="#ff0000"
  specialAbility="Flying"
  isEvil={false}
  onEditRole={(role) => console.log("Edit Role:", role)}
  onDeleteRole={(id) => console.log("Delete Role:", id)}
/>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

/**
 * ## 기본 Banner 예제
 *
 * 기본 Banner 컴포넌트를 렌더링합니다.
 */
export const Basic: Story = {
  args: {},
};

/**
 * ## 악역 Banner 예제
 *
 * 악역(Banner의 isEvil 값이 true)으로 렌더링되는 예제입니다.
 */
export const EvilBanner: Story = {
  args: {
    id: "2",
    name: "Villain Banner",
    description: "A description for the villain banner.",
    color: "#000000",
    specialAbility: "Invisibility",
  },
};

/**
 * ## 특수 능력 미기재 Banner 예제
 *
 * specialAbility 값이 빈 문자열인 경우를 보여줍니다.
 */
export const NoSpecialAbility: Story = {
  args: {
    id: "3",
    name: "Neutral Banner",
    description: "A description for the neutral banner.",
    color: "#00ff00",
    specialAbility: "",
  },
};
