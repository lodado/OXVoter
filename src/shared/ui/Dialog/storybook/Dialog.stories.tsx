// AlertDialog.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { AlertDialog } from "../AlertDialog";

const meta: Meta<typeof AlertDialog> = {
  title: "Example/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## 설치

프로젝트에 \`@custompackages/designsystem\`이 설치되어 있는지 확인하세요.

다음과 같이 AlertDialog 컴포넌트를 임포트할 수 있습니다:

\`\`\`jsx
import { AlertDialog } from '@custompackages/designsystem';
\`\`\`

참고로 두 가지 방식을 동시에 적용해도 작동합니다.

## Props

(Controls 패널에서 확인할 수 있습니다)
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

// BasicDialog 스토리
export const BasicDialog: Story = {
  args: {},
};

// 첫 번째 예시 컴포넌트 정의
const AlertDialogExample = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setVisible(true);
        }}
      >
        click button !
      </button>
      <AlertDialog isVisible={isVisible} onChangeVisible={setVisible}>
        <AlertDialog.Header>Test</AlertDialog.Header>
        <AlertDialog.Body className="h-[250px]">Test Body</AlertDialog.Body>
        <AlertDialog.SubmitForm submitText="확인" cancelText="취소" onSubmit={async (e) => {}} />
      </AlertDialog>
    </>
  );
};

// 첫 번째 예시 스토리
export const Example1: StoryObj = {
  render: () => <AlertDialogExample />,
  name: "AlertDialogExample",
  parameters: {
    docs: {
      description: {
        story: `
첫번째 예시로는 \`isVisible\`과 \`onChangeVisible\` 상태관리로 다이얼로그를 열고 닫습니다.

<details>
  <summary>코드 예시</summary>

\`\`\`jsx
const AlertDialogExample = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setVisible(true);
        }}
      >
        click button !
      </button>
      <AlertDialog isVisible={isVisible} onChangeVisible={setVisible}>
        <AlertDialog.Header>Test</AlertDialog.Header>
        <AlertDialog.Body>Test Body</AlertDialog.Body>
        <AlertDialog.SubmitForm
          submitText="확인"
          cancelText="취소"
          onSubmit={async (e) => {}}
        />
      </AlertDialog>
    </>
  );
};
\`\`\`
</details>
        `,
      },
    },
  },
};

// 두 번째 예시 컴포넌트 정의
const TriggerButton = () => {
  return <button type="button">click button !</button>;
};

const AlertDialogExample2 = () => {
  return (
    <>
      <AlertDialog Trigger={TriggerButton}>
        <AlertDialog.Header>Test</AlertDialog.Header>
        <AlertDialog.Body className="h-[500px]">Test Body</AlertDialog.Body>
        <AlertDialog.SubmitForm submitText="확인" cancelText="취소" onSubmit={async (e) => {}} />
      </AlertDialog>
    </>
  );
};

// 두 번째 예시 스토리
export const Example2: StoryObj = {
  render: () => <AlertDialogExample2 />,
  name: "AlertDialogExample2",
  parameters: {
    docs: {
      description: {
        story: `
두번째 예시로는 \`Trigger\`란 컴포넌트를 누르면 다이얼로그가 열리고 닫힙니다. (Radix의 Trigger 컴포넌트 사용)

<details>
  <summary>코드 예시</summary>

\`\`\`jsx
import { AlertDialog } from '@custompackages/designsystem';
import React, { useState } from 'react';

const TriggerButton = () => {
  return <button type="button">click button !</button>;
};

const AlertDialogExample2 = () => {
  return (
    <>
      <AlertDialog Trigger={TriggerButton}>
        <AlertDialog.Header>Test</AlertDialog.Header>
        <AlertDialog.Body>Test Body</AlertDialog.Body>
        <AlertDialog.SubmitForm
          submitText="확인"
          cancelText="취소"
          onSubmit={async (e) => {}}
        />
      </AlertDialog>
    </>
  );
};

export default AlertDialogExample2;
\`\`\`
</details>
        `,
      },
    },
  },
};
