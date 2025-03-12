import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { useToastStore } from "../stores/toastStore";
import ToastProvider from "./ToastProvider";
import ToastViewPort from "./ToastViewPort";

const meta: Meta = {
  title: "Example/ToastMultiple",
  component: ToastProvider,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

let count = 0;

const Template = () => {
  const { addToast } = useToastStore();

  const handleClick = () => {
    addToast({
      type: count % 2 === 0 ? "success" : "error",
      title: `스토리북 알림!`,
      description: `이것은 스토리북에서 다중 Toast 테스트 중입니다. ${count++}`,
    });
  };

  return (
    <ToastProvider>
      <div className="p-4">
        <button onClick={handleClick} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          여러 Toast 띄우기
        </button>
        <ToastViewPort />
      </div>
    </ToastProvider>
  );
};

export const MultipleToasts: Story = {
  render: () => <Template />,
};
