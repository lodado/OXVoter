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

  const scrollToTop = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    defaultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const handleBlur = () => {
      scrollToTop();
    };

    const textareaElement = defaultRef.current; // defaultRef를 사용해 DOM 요소에 접근합니다.
    textareaElement?.addEventListener("blur", handleBlur);

    // Cleanup event listeners on component unmount
    return () => {
      textareaElement?.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <textarea
      ref={textAreaRef}
      className={cn(InputStyleVariants({ variant, size: "textArea" }), className)}
      {...rest}
    />
  );
});

export default TextArea;
