import "./input.scss";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/shared";

import { InputStyleVariants } from "./style";

const SpinInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    svgClassName?: string;
    increment: () => void;
    decrement: () => void;
  }
>((props, ref) => {
  const { className, increment, decrement, ...rest } = props;

  // Radix UI의 Primitive나 다른 컴포넌트와 결합 가능 (예: Label, Field 등)
  // 여기서는 기본 HTML input을 사용하되, Radix UI의 철학에 맞게 접근합니다.
  return (
    <div className="relative inline-flex text-white items-center">
      <input
        type="number"
        ref={ref}
        className={cn(InputStyleVariants({ variant: "default", size: "medium" }), "text-white", className)}
        {...rest}
      />
      {/* 스핀 컨트롤 버튼 그룹 */}
      <div className="absolute h-full right-1.5 flex flex-col">
        <button
          type="button"
          onClick={props.increment}
          className="h-[50%] text-sm focus:outline-none"
          aria-label="Increment value"
        >
          <ChevronUp className={props.svgClassName} size={20} />
        </button>
        <button
          type="button"
          onClick={props.decrement}
          className="h-[50%] text-sm focus:outline-none"
          aria-label="Decrement value"
        >
          <ChevronDown className={props.svgClassName} size={20} />
        </button>
      </div>
    </div>
  );
});

SpinInput.displayName = "SpinInput";

export default SpinInput;
