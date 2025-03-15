import React, { ComponentProps, PropsWithChildren, ReactNode, SyntheticEvent, use, useEffect, useState } from "react";

import { cn } from "@/shared";

import { Button } from "../Button";
import { Dialog, SubmitFormProps, useDialogContext } from "./components/compound";
import { Description, Title } from "./components/radix";
import { ResizerHandle } from "./components/Resize";
import { DialogTemplate, DialogTemplateProps } from "./templates/DialogTemplate";

interface DialogSubmitFormProps extends Omit<SubmitFormProps, "children"> {
  children?: ReactNode;
  submitText: string;
  cancelText: string;

  submitButtonProps?: ComponentProps<typeof Button>;

  cancelButtonProps?: ComponentProps<typeof Button>;
}

const SubmitForm = ({
  children,
  className,
  submitText,
  cancelText,

  submitButtonProps = {},
  cancelButtonProps = {},

  onSubmit,
  onClose,
  onError,
}: DialogSubmitFormProps) => {
  const { onChangeVisibleStatus } = useDialogContext();

  const handleDialogSubmit = async (event: SyntheticEvent) => {
    try {
      await onSubmit(event);
    } catch (error) {
      onError?.(error);
    } finally {
      onChangeVisibleStatus(false);
    }
  };

  return (
    <Dialog.SubmitForm
      className={cn("flex flex-row w-full  justify-center px-6 py-4 gap-2", className)}
      onClose={onClose}
      onSubmit={onSubmit}
      onError={onError}
    >
      {children}
      <Button
        className="grow h-full"
        type="button"
        variant="line"
        {...cancelButtonProps}
        onClick={() => onChangeVisibleStatus(false)}
      >
        {cancelText}
      </Button>
      <Button
        className="grow h-full"
        type="button"
        variant="primarySolid"
        {...submitButtonProps}
        onClick={handleDialogSubmit}
      >
        {submitText}
      </Button>
    </Dialog.SubmitForm>
  );
};

const DialogHeader = ({ children, className }: { children?: ReactNode; className?: string }) => {
   

  return (
    <Title tabIndex={0} className={cn("outline-0 headline flex flex-col w-full  items-center gap-2")}>
      <ResizerHandle />

      <div
        className={cn(
          "w-full py-[0.625rem] px-[1rem] text-text-01 flex flex-row justify-center items-center",
          className
        )}
      >
        {children}
      </div>
    </Title>
  );
};

const DialogBody = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={cn("flex flex-col w-full pt-4 grow body-01 px-6 text-black", className)}>{children}</div>;
};

/**
 * Properties for the AlertDialog component.
 *
 * This interface extends `DialogTemplateProps` and `SubmitFormProps` by inheriting all their properties
 * except for `children`, which is explicitly redefined here. It's designed to create alert dialogs
 * that can optionally submit data, displaying a consistent interface while allowing for customization
 * and functionality extension.
 */
export interface AlertDialogProps extends Omit<DialogTemplateProps, "children"> {
  /**
   * The children nodes to be rendered within the body of the alert dialog. This can include messages,
   * forms, or any other React nodes appropriate for the dialog's content.
   */
  children: ReactNode;
}

export const AlertDescription = ({ className, children }: PropsWithChildren & { className?: string }) => {
  return <Description className={`${className}`}>{children}</Description>;
};

export const AlertDialog = ({
  swipePercent,
  Trigger,
  isVisible,
  onChangeVisible,
  children,
  className,
}: AlertDialogProps) => {
  return (
    <DialogTemplate
      swipePercent={swipePercent}
      className={className}
      isVisible={isVisible}
      onChangeVisible={onChangeVisible}
      Trigger={Trigger}
    >
      {children}
    </DialogTemplate>
  );
};

AlertDialog.Header = DialogHeader;
AlertDialog.Body = DialogBody;
AlertDialog.SubmitForm = SubmitForm;
AlertDialog.Close = Dialog.Close;
AlertDialog.Description = AlertDescription;

AlertDialog.displayName = "dialog";
