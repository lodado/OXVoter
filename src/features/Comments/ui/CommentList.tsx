"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Virtuoso } from "react-virtuoso";

import Delete from "/public/delete.svg";
import { Dropdown, Image } from "@/shared/ui";

import { fetchComments } from "../api/fetchComments";
import { CommentWithUserInformation } from "../stores/type";
import { getParsedBoardKey } from "../utils/constant";
import RemoveCommentDialog from "./RemoveCommentDialog";
import UpdateCommentDialog from "./UpdateCommentDialog";

const CommentItem = (comment: CommentWithUserInformation & { ownerId: string; refetch: () => void }) => {
  // 각 댓글마다 별도의 다이얼로그 open 상태를 관리
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = React.useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);

  const auth = {
    canUpdateComment: comment.ownerId === comment.userId,
  };

  return (
    <div className="relative w-full flex flex-row items-center justify-between">
      <div className="w-full p-3 gap-4 flex flex-row items-center">
        <div>
          <Image
            className="rounded-full"
            isPreload={false}
            width={40}
            height={40}
            src={comment.image ?? ""}
            alt="comment"
          />
        </div>

        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex flex-row gap-1">
            <p className="text-text-01 caption-2">{comment.name}</p>
            <p className="text-text-03 caption-2">{new Date(comment.createdAt!).toLocaleString()}</p>
          </div>
          <span className="text-text-01 body-2">{comment.content}</span>
        </div>
      </div>

      {auth.canUpdateComment && (
        <Dropdown>
          <Dropdown.Trigger
            variant="outline"
            className="z-10 flex justify-center items-center p-0 w-[28px] h-[28px] fill-text-03 text-text-03"
            doesArrowNeed={false}
          >
            <Ellipsis className="fill-text-03" strokeWidth={2} size={12} />
          </Dropdown.Trigger>
          <Dropdown.Content className="w-full">
            <Dropdown.Item key="update-comment" onClick={() => setIsUpdateDialogOpen(true)}>
              댓글 수정하기
            </Dropdown.Item>
            <Dropdown.Item key="remove-comment" onClick={() => setIsRemoveDialogOpen(true)}>
              <Delete /> 삭제하기
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      )}

      {/* 댓글마다 별도로 다이얼로그 렌더링 */}
      <RemoveCommentDialog
        id={String(comment.id)}
        isVisible={isRemoveDialogOpen}
        onChangeVisible={setIsRemoveDialogOpen}
        onAfterSubmit={() => {
          comment.refetch?.();
        }}
      />
      <UpdateCommentDialog
        isVisible={isUpdateDialogOpen}
        id={String(comment.id)}
        previousInput={comment.content}
        onChangeVisible={setIsUpdateDialogOpen}
        onAfterSubmit={() => {
          comment.refetch?.();
        }}
      />
    </div>
  );
};

const CommentList = ({ boardId, userId }: { boardId: string; userId: string }) => {
  const queryKey = getParsedBoardKey({ boardId, userId });

  const { data, refetch, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => fetchComments({ boardId, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
  });

  // 여러 페이지의 댓글을 단일 배열로 평탄화
  const comments = React.useMemo(() => {
    return data ? data.pages.flatMap((page) => page.comments) : [];
  }, [data]);

  return (
    <Virtuoso
      className="scrollbar-hide"
      style={{ width: "100%", height: "60vh" }}
      data={comments}
      itemContent={(index, comment: CommentWithUserInformation) => (
        <CommentItem
          key={comment.id}
          ownerId={userId}
          refetch={() => {
            refetch();
          }}
          {...comment}
        />
      )}
      // 스크롤이 끝에 도달했을 때 다음 페이지 불러오기
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      components={{
        Footer: () => (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            {/**
             * {isFetchingNextPage
              ? "불러오는 중..."
              : hasNextPage
              ? "스크롤 다운하여 더 불러오기"
              : "더 이상 댓글이 없습니다."}
             * 
             */}
          </div>
        ),
      }}
    />
  );
};

export default CommentList;
