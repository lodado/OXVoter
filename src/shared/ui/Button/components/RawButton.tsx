"use client";

import { forwardRef } from "react";

import { Motion } from "../../animation/animation";
import { RawButtonProps } from "../type";

const RawButton = forwardRef<HTMLButtonElement, RawButtonProps>(
  ({ variant, componentType = "button", children, hoverAnimationDisabled, onClick, ...props }, ref) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // @ts-ignore
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

      if (navigator.vibrate) {
        navigator.vibrate([200]);
      }
      onClick?.(e);
    };

    return (
      <Motion
        componentType={componentType}
        whileHover={!hoverAnimationDisabled ? { scale: 1.01 } : {}}
        whileTap={!hoverAnimationDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", duration: 0.25 }}
        ref={ref}
        {...(props as any)}
        onClick={handleButtonClick}
      >
        {children}
      </Motion>
    );
  }
);
RawButton.displayName = "RawButton";

export default RawButton;
