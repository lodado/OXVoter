import { useTranslations } from "next-intl";
import React from "react";

import { RemoveTemplateDialog } from "@/shared/ui/Dialog";
import { useToastStore } from "@/shared/ui/Toast/stores";

import { removeCommentById } from "../api/fetchComments";

const RemoveCommentDialog = ({
  isVisible,
  onChangeVisible,
  onAfterSubmit,
  id,
}: {
  id: string;
  isVisible: boolean;
  onChangeVisible: (newVisibleStatus: boolean) => void;
  onAfterSubmit?: () => void;
}) => {
  const { addToast } = useToastStore();
  const t = useTranslations("RemoveCommentDialog");

  return (
    <RemoveTemplateDialog
      isVisible={isVisible}
      title={t("title")}
      description={t("description")}
      onChangeVisible={onChangeVisible}
      onSubmit={async () => {
        await removeCommentById({ id });

        addToast({
          title: t("success_title"),
          type: "success",
          description: t("success_description"),
        });
        onChangeVisible(false);
        onAfterSubmit?.();
      }}
    />
  );
};

export default RemoveCommentDialog;
