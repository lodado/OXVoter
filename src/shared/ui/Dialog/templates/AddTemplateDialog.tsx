"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { Input } from "@/shared/ui";
import { AlertDialog } from "@/shared/ui/Dialog";

interface AddNewPlayerDialogPresenterProps {
  isVisible: boolean;
  onChangeVisible: (newVisibleStatus: boolean) => void;
  inputValue: string;
  onChangeInputValue: (val: string) => void;
  isInvalid?: boolean;
  onSubmit: () => Promise<void>;
  errorComponent?: React.ReactNode;
  title?: string;
  placeholder?: string;
}

const AddTemplateDialog = ({
  isVisible,
  onChangeVisible,
  inputValue,
  onChangeInputValue,
  isInvalid = false,
  onSubmit,
  errorComponent,
  title,
  placeholder,
}: AddNewPlayerDialogPresenterProps) => {
  const t = useTranslations("AddTemplateDialog");

  return (
    <AlertDialog swipePercent={0.2} className="min-h-[15rem]" isVisible={isVisible} onChangeVisible={onChangeVisible}>
      <AlertDialog.Header className="flex flex-col gap-[1.1rem]">
        <h1>{title || t("title")}</h1>
        <div className="w-screen h-[1.9px] bg-border-borderOpaque"></div>
      </AlertDialog.Header>

      <AlertDialog.Body className="flex flex-col flex-start">
        <Input
          data-invalid={isInvalid}
          value={inputValue}
          setValue={onChangeInputValue}
          placeholder={placeholder || t("placeholder")}
        />
        <div className="mt-1 w-full h-4 text-text-error subhead">{isVisible && errorComponent}</div>
      </AlertDialog.Body>

      <AlertDialog.SubmitForm
        submitButtonProps={{
          disabled: isInvalid || inputValue.length === 0,
        }}
        submitText={t("confirm")}
        cancelText={t("cancel")}
        onSubmit={onSubmit}
      />
    </AlertDialog>
  );
};

export default AddTemplateDialog;
