"use client";

import React, { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from "react";

import Clear from "/public/Clear.svg";
import { useForkRef } from "@/shared/hooks";
import { cn } from "@/shared/utils";

import { InputStyleVariants } from "./style";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;

  /** Additional CSS class name */
  className?: string;

  /** Whether the input field should be read-only */
  readOnly?: boolean;

  /** Whether the input field should be disabled */
  disabled?: boolean;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** Data attribute indicating whether the input is invalid */
  "data-invalid"?: boolean;

  /** Controlled value */
  value?: string;

  resetValue?: string;

  /** Setter function for the controlled value */
  setValue?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const {
    className,
    wrapperClassName,
    children,
    value: controlledValue,
    setValue: setControlledValue,
    resetValue = "",
    ...rest
  } = props;

  const dataInvalid = props["data-invalid"];
  const variant = dataInvalid ? "invalid" : "default";

  const [internalValue, setInternalValue] = useState(rest.defaultValue || "");
  const isControlled = controlledValue !== undefined;

  const defaultRef = useRef<HTMLInputElement>(null);
  const inputRef = useForkRef(ref, defaultRef);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (isControlled) {
      setControlledValue?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleClear = () => {
    if (isControlled) {
      setControlledValue?.(resetValue);
    } else {
      setInternalValue(resetValue);
    }
    if (defaultRef.current) {
      defaultRef.current.value = resetValue;
      defaultRef.current.focus();
    }
  };

  const scrollToTop = () => {
    defaultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const handleBlur = () => {
      scrollToTop();
    };

    const inputElement = defaultRef.current;
    inputElement?.addEventListener("blur", handleBlur);

    // Cleanup event listeners on component unmount
    return () => {
      inputElement?.removeEventListener("blur", handleBlur);
    };
  }, []);

  const currentValue = isControlled ? controlledValue : internalValue;

  return (
    <div className={cn("relative", wrapperClassName)}>
      <input
        ref={inputRef}
        className={cn(InputStyleVariants({ variant, size: "medium" }), className)}
        {...rest}
        value={currentValue}
        onChange={handleChange}
      />
      {currentValue && (
        <button type="button" onClick={handleClear} className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Clear />
        </button>
      )}
      {children}
    </div>
  );
});

export default Input;
