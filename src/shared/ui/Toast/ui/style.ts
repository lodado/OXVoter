import { cva } from "class-variance-authority";

export const toastVariants = cva(
  "flex flex-col h-20 w-full p-4 w-max-[340px] justify-evenly rounded-xl mb-2 cursor-pointer", // 공통 스타일
  {
    variants: {
      type: {
        success: "bg-success-bg",
        error: "bg-error-bg",
      },
    },
    defaultVariants: {
      type: "success",
    },
  }
);

export const toastHeadVariants = cva(
  "flex flex-col cursor-pointer head-3", // 공통 스타일
  {
    variants: {
      type: {
        success: "text-text-success",
        error: "text-text-error",
      },
    },
    defaultVariants: {
      type: "success",
    },
  }
);

export const toastDescriptionVariants = cva(
  "flex flex-col text-text-02 body-1 cursor-pointer", // 공통 스타일
  {
    variants: {
      type: {
        success: "",
        error: "",
      },
    },
    defaultVariants: {
      type: "success",
    },
  }
);
