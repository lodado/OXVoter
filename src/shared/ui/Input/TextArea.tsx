"use client";

import React, { forwardRef, useEffect, useRef } from "react";

import { useForkRef } from "@/shared/hooks";
import { cn } from "@/shared/utils";

import { InputStyleVariants } from "./style";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Additional CSS class name */
  className?: string;

  /** Whether the textarea field should be read-only */
  readOnly?: boolean;

  /** Whether the textarea field should be disabled */
  disabled?: boolean;

  /** Placeholder text for the textarea field */
  placeholder?: string;

  /** Data attribute indicating whether the textarea is invalid */
  "data-invalid"?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props: TextAreaProps, ref) => {
  const { className, ...rest } = props;

  const dataInvalid = props["data-invalid"];
  const variant = dataInvalid ? "invalid" : "default";

  const defaultRef = useRef<HTMLTextAreaElement>(null);
  const textAreaRef = useForkRef(ref, defaultRef);

  return (
    <textarea
      ref={textAreaRef}
      className={cn(InputStyleVariants({ variant, size: "textArea" }), className)}
      {...rest}
    />
  );
});

export default TextArea;
