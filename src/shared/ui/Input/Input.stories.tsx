import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Input, { InputProps } from "./Input";
import SpinInput from "./SpinControl";

const meta: Meta<InputProps> = {
  title: "Shared/Input",
  component: Input,
  argTypes: {
    wrapperClassName: {
      control: "text",
      description: "추가로 적용할 래퍼(wrapper)의 className",
    },
    className: {
      control: "text",
      description: "추가로 적용할 input의 className",
    },
    readOnly: {
      control: "boolean",
      description: "읽기 전용 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder",
    },
    "data-invalid": {
      control: "boolean",
      description: "Input이 유효하지 않은 상태인지 여부",
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

/**
 * 기본 Input
 */
export const Default: Story = {
  args: {
    placeholder: "Type something...",
    disabled: false,
    readOnly: false,
    "data-invalid": false,
  },
};

/**
 * Invalid 상태
 */
export const Invalid: Story = {
  args: {
    placeholder: "This is an invalid input field",
    "data-invalid": true,
  },
};

/**
 * Disabled 상태
 */
export const Disabled: Story = {
  args: {
    placeholder: "This input is disabled",
    disabled: true,
  },
};

/**
 * Readonly 상태
 */
export const Readonly: Story = {
  args: {
    placeholder: "This input is readOnly",
    readOnly: true,
  },
};

/**
 * 래퍼에 className이 적용된 사례
 */
export const WrapperStyled: Story = {
  args: {
    placeholder: "Type something in styled wrapper...",
    wrapperClassName: "bg-gray-50 p-2 border border-gray-300",
  },
};

export const SpinControl: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(10);

    return (
      <SpinInput value={value} increment={() => setValue((v) => v + 1)} decrement={() => setValue((v) => v - 1)} />
    );
  },
};
