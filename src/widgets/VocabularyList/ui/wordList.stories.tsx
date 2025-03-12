// VocabularyList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Word } from "../../../entities/Words/stores/type";
import VocabularyContainer from "./VocabularyContainer";

// 샘플 데이터 생성
const sampleWords: Word[] = [
  {
    id: "1",
    word: "example",
    phonetic: "/ɪɡˈzæmpəl/",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [],
      },
    ],
    createdAt: new Date().toISOString(),
    audioUrl: null,
  },
  {
    id: "2",
    word: "test",
    phonetic: "/tɛst/",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [],
      },
    ],
    createdAt: new Date().toISOString(),
    audioUrl: null,
  },
];

// 스토리북 메타데이터 정의
const meta: Meta<typeof VocabularyContainer> = {
  title: "Widgets/VocabularyContainer",
  component: VocabularyContainer,
  tags: ["autodocs"],
  args: {
    words: sampleWords,
    onRemoveWord: (id: string) => {
      console.log(`Word with id ${id} removed.`);
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
\`VocabularyList\` 컴포넌트는 사용자가 단어를 추가하고, 검색하며, 삭제할 수 있는 기능을 제공합니다. 각 단어는 발음 재생 기능과 함께 의미를 아코디언 형태로 표시합니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VocabularyContainer>;

/**
 * ## 기본 사용법
 *
 * 기본적인 단어 목록을 표시하는 예시입니다.
 */
export const 기본: Story = {
  args: {
    words: sampleWords,
  },
};

/**
 * ## 빈 단어장
 *
 * 단어 목록이 비어 있는 경우를 나타냅니다.
 */
export const 빈단어장: Story = {
  args: {
    words: [],
  },
};
