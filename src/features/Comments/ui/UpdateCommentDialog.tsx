"use client";

import React, { useEffect, useState } from "react";

import { AddTemplateDialog } from "@/shared/ui/Dialog";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { updateCommentById } from "../api/fetchComments";

interface UpdateCommentDialogProps {
  id: string;
  isVisible: boolean;
  previousInput: string;
  onChangeVisible: (newVisibleStatus: boolean) => void;
  onAfterSubmit: () => void;
}
const title = "댓글 변경";
const successToastTitle = "변경에 성공했습니다";
const successToastDescription = "이름 변경에 성공했습니다";
const placeholder = "입력해주세요";
const maxNameLength = 50;

function UpdateCommentDialog({
  id,
  previousInput,
  isVisible,
  onChangeVisible,
  onAfterSubmit,
}: UpdateCommentDialogProps) {
  const [inputValue, setInputValue] = useState(previousInput);
  const { addToast } = useToastStore();

  // 다이얼로그가 열릴 때마다 입력값 초기화
  useEffect(() => {
    if (isVisible) {
      setInputValue(previousInput);
    }
  }, [isVisible]);

  const isTooLongName = inputValue.length >= maxNameLength;
  const isInvalid = isTooLongName;

  // 에러 메시지 노드 (Container 내부에서 직접 구성)
  const errorNode = <>{isTooLongName && `${maxNameLength}자 이하로 입력해주세요.`}</>;

  // onSubmit 로직
  const handleSubmit = async () => {
    await updateCommentById({ id, content: inputValue });

    addToast({
      title: successToastTitle,
      type: "success",
      description: successToastDescription,
    });
    setInputValue("");

    onAfterSubmit?.();
  };

  // Presenter에 필요한 값/함수들을 props로 전달
  return (
    <AddTemplateDialog
      isVisible={isVisible}
      onChangeVisible={onChangeVisible}
      title={title}
      inputValue={inputValue}
      onChangeInputValue={setInputValue}
      placeholder={placeholder}
      isInvalid={isInvalid}
      onSubmit={handleSubmit}
      // errorComponent를 prop으로 받지 않고, 내부에서 만든 노드를 직접 주입
      errorComponent={errorNode}
    />
  );
}

export default UpdateCommentDialog;
