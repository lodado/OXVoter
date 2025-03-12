// Card.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta: Meta<typeof Card> = {
  title: "shared/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card 컴포넌트는 다양한 콘텐츠를 담을 수 있는 컨테이너로, Header, Title, Description, Content, Footer로 구성되어 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * 기본적인 Card 컴포넌트 사용 예시입니다.
 */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>기본 카드 제목</CardTitle>
        <CardDescription>기본 카드 설명</CardDescription>
      </CardHeader>
      <CardContent>
        <p>여기에 카드의 주요 콘텐츠가 들어갑니다.</p>
      </CardContent>
      <CardFooter>
        <button>액션 버튼</button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Header와 Footer가 없는 Card 컴포넌트 예시입니다.
 */
export const WithoutHeaderAndFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p>헤더와 푸터가 없는 카드 콘텐츠입니다.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 긴 제목과 설명을 가진 Card 컴포넌트 예시입니다.
 */
export const WithLongTitleAndDescription: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>
          이것은 매우 긴 제목을 가진 카드 컴포넌트의 예시입니다. 제목이 길어지면 어떻게 표시되는지 확인할 수 있습니다.
        </CardTitle>
        <CardDescription>
          이 설명 또한 매우 깁니다. 설명이 길어질 경우 카드 컴포넌트 내에서 텍스트가 어떻게 처리되고 표시되는지 확인하기
          위한 예시 텍스트입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>긴 제목과 설명을 가진 카드의 콘텐츠입니다.</p>
      </CardContent>
      <CardFooter>
        <button>액션 버튼</button>
      </CardFooter>
    </Card>
  ),
};
