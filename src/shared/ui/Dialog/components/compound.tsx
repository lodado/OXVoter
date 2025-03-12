"use client";

import "../index.scss";

import { X } from "lucide-react";
import React, {
  Component,
  ComponentProps,
  CSSProperties,
  FormEvent,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useDrop } from "react-dnd";

import { cn, contextBuildHelper, noop } from "@/shared";

import { Motion } from "../../animation/animation";
import { useDialogResizer } from "../hooks/useDialogResizer";
import { Close, Content, Overlay, Portal, Root, Trigger } from "./radix";
import { RESIZE_DRAG_TYPE } from "./Resize";

const [DialogProvider, useDialogContext] = contextBuildHelper<{
  isDialogVisible: boolean;
  height: number;
  setHeight: (heightPercent: number) => void;

  onChangeVisibleStatus: (newVisibleStatus: boolean) => void;
  swipePercent?: number;
}>({ id: "dialog" });

const DialogClose = ({ className }: { className: string }) => {
  return (
    <Close asChild>
      <button className={`IconButton ${className}`} type="button" aria-label="Close">
        <X />
      </button>
    </Close>
  );
};

const DialogRoot = ({ children }: { children: ReactNode }) => {
  const { isDialogVisible, onChangeVisibleStatus } = useDialogContext();

  return (
    <Root open={isDialogVisible} onOpenChange={onChangeVisibleStatus}>
      {children}
    </Root>
  );
};

const DialogTrigger = React.forwardRef<HTMLButtonElement, ComponentProps<typeof Trigger>>(
  ({ children, ...rest }, ref) => {
    return (
      <Trigger {...rest} ref={ref}>
        {children}
      </Trigger>
    );
  }
);

const DialogContent = ({
  children,
  className,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const { height: heightPercent } = useDialogContext();
  const { dropRef } = useDialogResizer();

  return (
    <Portal>
      <Overlay ref={dropRef as any} className="fixed top-0 left-0 right-0 bottom-0 bg-blank z-dialog" />

      <Motion
        className="fixed bottom-0 left-0 w-screen flex flex-col items-center right-0 z-dialog"
        componentType="div"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: `${heightPercent}px`, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        style={{ ...style }}
      >
        <Content
          style={{
            ...style,

            overflow: "hidden",
          }}
          className={cn(
            "flex flex-col relative", // 위치 참조
            "w-screen md:w-[768px]",
            "will-change-transform", // 배경색
            "rounded-t-2xl rounded-b-none", // 모서리 둥글게
            "bg-background-01", // 내부 여백
            "overflow-hidden pb-[calc(var(--safe-area-bottom))]", // 필요 시 오버플로우 처리,
            className
          )}
        >
          {children}
        </Content>
        <div className={cn("absolute w-screen md:w-[768px] bottom-[-2rem] h-10 bg-background-01")}></div>
      </Motion>
    </Portal>
  );
};

/**
 * Properties for the SubmitForm component.
 *
 * This interface defines the props needed to handle form submission, including the children to be rendered within the form,
 * a submission handler, optional custom styling, and an error handler.
 */
export interface SubmitFormProps {
  /**
   * The children nodes to be rendered within the form. This can include any form elements such as inputs, labels,
   * and buttons, or other React nodes that form the content of the submission form.
   */
  children: ReactNode;

  /**
   * The event handler function that is called when the form is submitted.
   *
   * This function should be an asynchronous operation (returning a Promise) that handles the form submission logic,
   * such as validating the form data and sending it to a server. The function receives the form event, allowing
   * for custom handling like preventing the default form submission behavior.
   *
   * @param event - The form event triggered upon form submission.
   */
  onSubmit: (event: SyntheticEvent) => Promise<void>;

  onClose?: () => void;

  /**
   * An optional CSS class name to apply to the form for styling purposes. This allows for custom styling of the
   * form element, making it possible to adapt the appearance of the form to match the rest of the application's design.
   */
  className?: string;

  /**
   * An optional error handler function that is called if an error occurs during form submission. This provides a way
   * to handle submission errors, such as displaying error messages to the user or logging the error for debugging purposes.
   *
   * @param error - The error object or message encountered during the submission process.
   */
  onError?: (error: unknown) => void;
}

const SubmitForm = ({ className, children, onSubmit, onClose = noop, onError = noop }: SubmitFormProps) => {
  const { isDialogVisible, onChangeVisibleStatus } = useDialogContext();

  useEffect(() => {
    return () => {
      if (!isDialogVisible) {
        onClose();
      }
    };
  }, [isDialogVisible]);

  return <div className={className}>{children}</div>;
};

/**
 * Properties for the Dialog component.
 */
export interface DialogProps {
  /**
   * The children nodes to be rendered within the dialog. This can be any valid
   * React Node (e.g., elements, strings, fragments, or an array of these types).
   */
  children: ReactNode;

  /**
   * A boolean indicating whether the dialog is currently visible.
   * If not provided, the dialog visibility will be managed internally or by parent components.
   * Defaults to `false` if not specified.
   */
  isVisible?: boolean;

  /**
   * An optional callback function that is called when the visibility of the dialog needs to change.
   * This allows parent components to control the visibility state of the dialog.
   *
   * @param newVisibleStatus - The new visibility state (true for visible, false for hidden) that should be applied to the dialog.
   */
  onChangeVisible?: (newVisibleStatus: boolean) => void;

  className?: string;

  swipePercent?: number;
}

export const Dialog = ({ isVisible = undefined, onChangeVisible, children, swipePercent = 0.5 }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  const isDialogVisible = isVisible ?? open;
  const handleChangeVisibleStatus = (newVisibleStatus: boolean) => {
    if (onChangeVisible) {
      onChangeVisible(newVisibleStatus);

      return;
    }

    setOpen(newVisibleStatus);
  };

  return (
    <DialogProvider
      height={height}
      setHeight={setHeight}
      isDialogVisible={isDialogVisible}
      swipePercent={swipePercent}
      onChangeVisibleStatus={handleChangeVisibleStatus}
    >
      {children}
    </DialogProvider>
  );
};

Dialog.displayName = "Dialog";

Dialog.Root = DialogRoot;
Dialog.Trigger = DialogTrigger;
Dialog.SubmitForm = SubmitForm;
Dialog.Content = DialogContent;
Dialog.Close = DialogClose;

export { DialogProvider, useDialogContext };
