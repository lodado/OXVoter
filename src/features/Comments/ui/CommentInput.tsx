"use client";

import { useMutation } from "@tanstack/react-query";
import { SquarePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { getQueryClient } from "@/shared";
import { IconButton, Input } from "@/shared/ui";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { updateComments } from "../api/fetchComments";
import { getParsedBoardKey } from "../utils/constant";

const COOLDOWN_TIME = 2000; // 2초 동안 제출 제한

const CommentInput = ({ userId, boardId }: { userId: string; boardId: string }) => {
  const t = useTranslations("CommentInput");
  const { addToast } = useToastStore();
  const [content, setContent] = useState("");
  const [lastSubmittedTime, setLastSubmittedTime] = useState(0);

  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: updateComments,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: getParsedBoardKey({ boardId, userId }),
      });
    },
    onError: (error) => {
      addToast({
        title: t("error"),
        description: `${error.message}`,
        type: "error",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const now = Date.now();
    if (now - lastSubmittedTime < COOLDOWN_TIME) {
      addToast({
        title: t("cooldown_error_title"),
        description: t("cooldown_error_description"),
        type: "error",
      });
      return;
    }

    setLastSubmittedTime(now);
    mutation.mutate({ content, userId, boardId });
    setContent(""); // 입력 후 초기화
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row  justify-center items-center h-full w-full px-4 gap-3">
      <Input
        wrapperClassName="w-full"
        value={content}
        setValue={(newValue) => {
          setContent(newValue);
        }}
        placeholder={t("input_placeholder")}
      />

      <div>
        <IconButton variant="primarySolid" type="submit" className="w-7 h-7 rounded-full flex-shrink-0">
          <SquarePlus />
        </IconButton>
      </div>
    </form>
  );
};

export default CommentInput;
