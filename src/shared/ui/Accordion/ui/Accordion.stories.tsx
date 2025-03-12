// Accordion.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  parameters: {
    docs: {
      description: {
        component: `
Radix UI의 Accordion 컴포넌트입니다. 아래 예시를 통해 사용 방법을 확인할 수 있습니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## 기본 아코디언
 *
 * 단일 아이템을 확장할 수 있는 기본 아코디언입니다.
 */
export const Default = {
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: () => (
    <Accordion type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>첫 번째 아이템</Accordion.Trigger>
        <Accordion.Content>첫 번째 아이템의 내용입니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>두 번째 아이템</Accordion.Trigger>
        <Accordion.Content>두 번째 아이템의 내용입니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>세 번째 아이템</Accordion.Trigger>
        <Accordion.Content>세 번째 아이템의 내용입니다.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

/**
 * ## 멀티플 아코디언
 *
 * 여러 아이템을 동시에 확장할 수 있는 아코디언입니다.
 */
export const Multiple = {
  render: (args: any) => (
    <Accordion type="multiple">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>첫 번째 아이템</Accordion.Trigger>
        <Accordion.Content>첫 번째 아이템의 내용입니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>두 번째 아이템</Accordion.Trigger>
        <Accordion.Content>두 번째 아이템의 내용입니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>세 번째 아이템</Accordion.Trigger>
        <Accordion.Content>세 번째 아이템의 내용입니다.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
