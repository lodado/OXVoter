"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/shared/utils";

import { rawButtonVariants } from "../../Button/style";
import { useDropdownContext } from "./Provider";
import { SubTrigger, Trigger } from "./radix";

const dropdownTriggerVariants = cva(
  // 기본이 되는 공통 클래스
  "w-full pl-1 h-7 flex justify-between items-center rounded text-text-00 subhead-2",
  {
    variants: {
      variant: {
        // 지금은 'default'만 정의
        default: "bg-[var(--Secondary-OP)]",
        outline: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface DropdownTriggerProps extends ComponentProps<typeof Trigger>, VariantProps<typeof dropdownTriggerVariants> {
  doesArrowNeed?: boolean;
}

const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { children, className, asChild = false, doesArrowNeed = true, variant = "default", ...rest } = props;
  const { isVisible } = useDropdownContext();
  return (
    <Trigger
      className={
        !asChild
          ? cn(
              // cva로 만든 variant 스타일 + 전달받은 className
              dropdownTriggerVariants({ variant }),
              className
            )
          : ""
      }
      {...rest}
    >
      <>
        {children}

        {asChild ? null : doesArrowNeed && <ChevronDown strokeWidth={1.2} className={isVisible ? "rotate-180" : ""} />}
      </>
    </Trigger>
  );
};

export const DropdownSubTrigger = (
  props: ComponentProps<typeof SubTrigger> & ComponentProps<typeof rawButtonVariants>
) => {
  const { children, className, ...rest } = props;

  return (
    <SubTrigger
      className={!props.asChild ? cn("w-full items-center rounded bg-inherit text-text-01 subhead-2", className) : ""}
      {...rest}
    >
      {children}
    </SubTrigger>
  );
};

export default DropdownTrigger;
