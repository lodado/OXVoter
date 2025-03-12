/* eslint-disable react-hooks/rules-of-hooks */
// Switch.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
\`Switch\` 컴포넌트는 사용자가 체크된 상태와 체크되지 않은 상태 사이를 전환할 수 있는 컨트롤입니다. Radix UI의 \`Switch\` 컴포넌트를 기반으로 Tailwind CSS를 활용하여 스타일링되었습니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * ## 기본 사용법
 *
 * 기본적인 스위치 컴포넌트의 예시입니다.
 */
export const 기본: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center space-x-2">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <span>{checked ? "On" : "Off"}</span>
      </div>
    );
  },
  args: {
    defaultChecked: false,
    disabled: false,
  },
};

/**
 * ## 비활성화된 스위치
 *
 * 스위치가 비활성화된 상태의 예시입니다.
 */
export const 비활성화됨: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <span>{args.checked ? "On" : "Off"}</span>
    </div>
  ),
  args: {
    checked: true,
    disabled: true,
  },
};
